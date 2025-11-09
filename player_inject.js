/*
  player_inject.js
  - Injected into the active tab to load Spotify Web Playback SDK
  - Creates a player and forwards 'player_state_changed' events to the extension via postMessage
  - Also exposes a simple window.__loopify_playerReady flag
*/

if (!window.__loopify_loopifyInjected) {
  window.__loopify_loopifyInjected = true;
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  document.head.appendChild(script);
}

let initAttempted = false;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SET_TOKEN') {
    // wait for Spotify SDK to be ready
    waitForSpotify(msg.token);
  }
});

function waitForSpotify(token) {
  if (initAttempted) return;
  initAttempted = true;
  const interval = setInterval(() => {
    if (window.Spotify) {
      clearInterval(interval);
      startPlayer(token);
    }
  }, 200);
}

function startPlayer(token) {
  if (window.__loopify_player) return;
  window.__loopify_player = new Spotify.Player({
    name: 'Loopify Web Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.8
  });

  window.__loopify_player.addListener('ready', ({ device_id }) => {
    window.__loopify_player_ready = true;
    window.__loopify_device_id = device_id;
    window.postMessage({ type: 'LOOPIFY_PLAYER_READY', device_id }, '*');
  });

  window.__loopify_player.addListener('player_state_changed', state => {
    // forward minimal state to extension popup via window.postMessage
    if (!state) return;
    const s = {
      paused: state.paused,
      position: state.position,
      duration: state.duration,
      track_window: state.track_window
    };
    window.postMessage({ type: 'LOOPIFY_PLAYER_STATE', state: s }, '*');
  });

  window.__loopify_player.connect();
}
