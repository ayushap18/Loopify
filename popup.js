/*
  popup.js
  - UI glue
  - Uses background message API to get valid token
  - Controls playback via Spotify Web API + the injected player
  - Stores saved loops in chrome.storage.local under 'loopify_loops'
*/

const $ = sel => document.querySelector(sel);
const logEl = $('#log');
const btnConnect = $('#btnConnect');
const btnSuggest = $('#btnSuggest');
const btnSetStart = $('#btnSetStart');
const btnSetEnd = $('#btnSetEnd');
const btnStartLoop = $('#btnStartLoop');
const btnStopLoop = $('#btnStopLoop');
const btnSaveLoop = $('#btnSaveLoop');
const btnCreatePlaylist = $('#btnCreatePlaylist');
const btnRefreshTrack = $('#btnRefreshTrack');
const btnOpenLibrary = $('#btnOpenLibrary');
const btnClearLibrary = $('#btnClearLibrary');
const loopListEl = $('#loopList');

let token = null;
let currentTrack = null;
let suggestedStart = null, suggestedEnd = null;
let loopIntervalHandle = null;
let isLooping = false;
let savedLoops = [];

function log(s){ logEl.textContent = `[${new Date().toLocaleTimeString()}] ${s}\n` + logEl.textContent; }

async function getToken() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({type:'GET_TOKEN'}, (resp) => {
      if (!resp?.ok) { resolve(null); } else resolve(resp.tokens.access_token);
    });
  });
}

async function startAuth() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({type:'START_AUTH'}, (resp) => {
      resolve(resp);
    });
  });
}

async function init() {
  token = await getToken();
  if (token) {
    $('#accountStatus').textContent = 'Connected';
    $('#playerArea').hidden = false;
    injectPlayerScript(token);
    await refreshCurrentTrack();
    loadLibrary();
  } else {
    $('#accountStatus').textContent = 'Not connected';
  }
}

btnConnect.addEventListener('click', async () => {
  const resp = await startAuth();
  if (resp?.ok) {
    token = resp.tokens.access_token;
    $('#accountStatus').textContent = 'Connected';
    $('#playerArea').hidden = false;
    injectPlayerScript(token);
    await refreshCurrentTrack();
    loadLibrary();
  } else {
    log('Auth failed: ' + (resp?.error || 'unknown'));
  }
});

btnRefreshTrack.addEventListener('click', refreshCurrentTrack);

async function refreshCurrentTrack() {
  token = await getToken();
  if (!token) return log('No token');
  const r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers: { Authorization: 'Bearer '+token }});
  if (r.status === 204) { $('#trackInfo').textContent = 'No track playing'; return; }
  if (!r.ok) { $('#trackInfo').textContent = 'Unable to read current track'; return; }
  const data = await r.json();
  currentTrack = data?.item;
  $('#trackInfo').textContent = currentTrack ? `${currentTrack.name} — ${currentTrack.artists.map(a=>a.name).join(', ')}` : 'No track';
  log('Current track refreshed');
}

btnSuggest.addEventListener('click', async () => {
  if (!currentTrack) await refreshCurrentTrack();
  if (!currentTrack) return log('No track to suggest for');
  token = await getToken();
  const r = await fetch(`https://api.spotify.com/v1/audio-analysis/${currentTrack.id}`, { headers: { Authorization: 'Bearer '+token }});
  if (!r.ok) return log('Failed to fetch audio analysis');
  const analysis = await r.json();
  if (!analysis.sections || !analysis.sections.length) return log('No sections found in analysis');
  // pick the longest section and propose a 4-bar window or whole section if short
  const longest = analysis.sections.reduce((a,b)=> a.duration > b.duration ? a : b);
  let start = Math.max(0, longest.start);
  // if the section has bars info, align to bars for musicality
  if (analysis.bars && analysis.bars.length) {
    const bars = analysis.bars.filter(b => b.start >= longest.start && b.start < longest.start + longest.duration);
    if (bars.length >= 4) {
      start = bars[0].start;
      const end = bars[Math.min(3, bars.length-1)].start + bars[Math.min(3,bars.length-1)].duration;
      suggestedStart = start;
      suggestedEnd = end;
    } else {
      suggestedStart = start;
      suggestedEnd = Math.min(currentTrack.duration_ms/1000, longest.start + Math.min(8, Math.floor(longest.duration)));
    }
  } else {
    suggestedStart = start;
    suggestedEnd = Math.min(currentTrack.duration_ms/1000, longest.start + Math.min(8, Math.floor(longest.duration)));
  }
  updateStartEndUI();
  log(`Suggested loop ${suggestedStart.toFixed(2)}s -> ${suggestedEnd.toFixed(2)}s`);
});

btnSetStart.addEventListener('click', async () => {
  token = await getToken();
  if (!token) return log('No token');
  const r = await fetch('https://api.spotify.com/v1/me/player', { headers: { Authorization: 'Bearer '+token }});
  if (!r.ok) return log('Cannot read player position (start)');
  const st = await r.json();
  const pos = (st.progress_ms || 0) / 1000;
  suggestedStart = pos;
  updateStartEndUI();
  log('Set start at '+pos.toFixed(2)+'s');
});

btnSetEnd.addEventListener('click', async () => {
  token = await getToken();
  if (!token) return log('No token');
  const r = await fetch('https://api.spotify.com/v1/me/player', { headers: { Authorization: 'Bearer '+token }});
  if (!r.ok) return log('Cannot read player position (end)');
  const st = await r.json();
  const pos = (st.progress_ms || 0) / 1000;
  suggestedEnd = pos;
  updateStartEndUI();
  log('Set end at '+pos.toFixed(2)+'s');
});

function updateStartEndUI() {
  $('#startVal').textContent = suggestedStart != null ? suggestedStart.toFixed(2)+'s' : '-';
  $('#endVal').textContent = suggestedEnd != null ? suggestedEnd.toFixed(2)+'s' : '-';
  $('#durVal').textContent = (suggestedStart != null && suggestedEnd != null) ? (suggestedEnd - suggestedStart).toFixed(2)+'s' : '-';
}

btnStartLoop.addEventListener('click', async () => {
  if (!currentTrack || suggestedStart == null || suggestedEnd == null) return log('Missing data to start loop');
  if (isLooping) return log('Already looping');
  token = await getToken();
  const startMs = Math.floor(suggestedStart * 1000);
  // Play track at desired start
  await fetch('https://api.spotify.com/v1/me/player/play', { method: 'PUT', headers: { Authorization: 'Bearer '+token, 'Content-Type':'application/json' }, body: JSON.stringify({ uris: [currentTrack.uri], position_ms: startMs })});
  // Start scheduler using player_state_changed via injected player if available; fallback to polling seek
  const segMs = Math.max(100, Math.floor((suggestedEnd - suggestedStart) * 1000));
  isLooping = true;
  btnStopLoop.disabled = false;
  btnStartLoop.disabled = true;
  // schedule periodic seeks slightly before end
  loopIntervalHandle = setInterval(async () => {
    try {
      // seek back to start
      await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${startMs}`, { method: 'PUT', headers: { Authorization: 'Bearer '+token }});
    } catch (e) {
      console.error('seek error', e);
    }
  }, Math.max(200, segMs - 150));
  log('Loop started');
});

btnStopLoop.addEventListener('click', () => {
  if (loopIntervalHandle) clearInterval(loopIntervalHandle);
  loopIntervalHandle = null;
  isLooping = false;
  btnStopLoop.disabled = true;
  btnStartLoop.disabled = false;
  log('Loop stopped');
});

btnSaveLoop.addEventListener('click', async () => {
  if (!currentTrack || suggestedStart == null || suggestedEnd == null) return log('Missing loop to save');
  const rec = {
    id: cryptoRandomId(),
    trackId: currentTrack.id,
    uri: currentTrack.uri,
    name: currentTrack.name,
    artists: currentTrack.artists.map(a=>a.name),
    start: suggestedStart,
    end: suggestedEnd,
    createdAt: Date.now()
  };
  savedLoops.push(rec);
  await chrome.storage.local.set({loopify_loops: savedLoops});
  renderLibrary();
  log('Saved loop: ' + rec.name);
});

btnOpenLibrary.addEventListener('click', () => {
  const isHidden = $('#libraryArea').hidden;
  $('#libraryArea').hidden = !isHidden;
  if (!isHidden) {
    $('#libraryArea').hidden = true;
  } else {
    renderLibrary();
  }
});

btnCreatePlaylist.addEventListener('click', async () => {
  token = await getToken();
  if (!token) return log('No token');
  const data = await chrome.storage.local.get(['loopify_loops']);
  const loops = data.loopify_loops || [];
  if (!loops.length) return log('No saved loops');
  const me = await fetch('https://api.spotify.com/v1/me', { headers: { Authorization: 'Bearer '+token } }).then(r=>r.json());
  const pl = await fetch(`https://api.spotify.com/v1/users/${me.id}/playlists`, { method: 'POST', headers: { Authorization: 'Bearer '+token, 'Content-Type':'application/json' }, body: JSON.stringify({ name: 'Loopify Playlist', public: false, description: 'Created with Loopify — offsets stored locally.' }) }).then(r=>r.json());
  const uris = loops.map(l=>l.uri);
  // add in batches of 100
  for (let i=0;i<uris.length;i+=100) {
    const batch = uris.slice(i,i+100);
    await fetch(`https://api.spotify.com/v1/playlists/${pl.id}/tracks`, { method:'POST', headers:{ Authorization: 'Bearer '+token, 'Content-Type':'application/json' }, body: JSON.stringify({ uris: batch })});
  }
  log('Playlist created. Note: per-track offsets are stored locally in extension.');
});

btnClearLibrary.addEventListener('click', async () => {
  savedLoops = [];
  await chrome.storage.local.set({loopify_loops: savedLoops});
  renderLibrary();
  log('Cleared saved loops');
});

async function loadLibrary() {
  const data = await chrome.storage.local.get(['loopify_loops']);
  savedLoops = data.loopify_loops || [];
  renderLibrary();
}

function renderLibrary() {
  loopListEl.innerHTML = '';
  savedLoops.forEach(l => {
    const li = document.createElement('li');
    li.textContent = `${l.name} — ${l.artists.join(', ')} [${l.start.toFixed(2)}s -> ${l.end.toFixed(2)}s]`;
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';
    btnDel.addEventListener('click', async () => {
      savedLoops = savedLoops.filter(x => x.id !== l.id);
      await chrome.storage.local.set({loopify_loops: savedLoops});
      renderLibrary();
      log('Deleted loop');
    });
    li.appendChild(btnDel);
    loopListEl.appendChild(li);
  });
}

function cryptoRandomId() {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
}

// Inject player script into active tab to create a controllable device and listen for events
function injectPlayerScript(token) {
  chrome.tabs.query({active:true,currentWindow:true}, (tabs) => {
    if (!tabs[0]) return;
    chrome.scripting.executeScript({ target:{tabId: tabs[0].id}, files:['player_inject.js'] }, () => {
      // send token to content script so injected player can use it
      chrome.tabs.sendMessage(tabs[0].id, { type:'SET_TOKEN', token });
    });
  });
}

// init on popup open
init();
