/*
  background.js
  - PKCE Authorization Code flow (using chrome.identity.launchWebAuthFlow)
  - Token refresh handling
  - Exposes simple message API:
    - START_AUTH -> triggers auth, returns tokens
    - GET_TOKEN -> returns valid access token (refreshes if needed)
*/
const CLIENT_ID = 'aeb3c4f6d0894c7b8b2870a5e4385c1f'; // Your Spotify Client ID
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPES = [
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-modify-private',
  'playlist-modify-public'
].join(' ');

function randString(length=64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let out = '';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (let i=0;i<length;i++) out += chars[arr[i] % chars.length];
  return out;
}

async function sha256Base64Url(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  let binary = '';
  for (let i=0;i<bytes.byteLength;i++) binary += String.fromCharCode(bytes[i]);
  let base64 = btoa(binary);
  return base64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

async function startAuthInteractive() {
  const state = randString(16);
  const codeVerifier = randString(128);
  const codeChallenge = await sha256Base64Url(codeVerifier);

  await chrome.storage.local.set({pkce_verifier: codeVerifier, oauth_state: state});

  const redirectUri = chrome.identity.getRedirectURL('spotify_callback');
  const authUrl = `${AUTH_ENDPOINT}?response_type=code&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&code_challenge_method=S256&code_challenge=${encodeURIComponent(codeChallenge)}`;

  try {
    const result = await chrome.identity.launchWebAuthFlow({interactive:true, url: authUrl});
    const url = new URL(result);
    const code = url.searchParams.get('code');
    const returnedState = url.searchParams.get('state');

    const stored = await chrome.storage.local.get(['oauth_state','pkce_verifier']);
    if (returnedState !== stored.oauth_state) throw new Error('Invalid state returned');

    const body = new URLSearchParams();
    body.set('grant_type','authorization_code');
    body.set('code', code);
    body.set('redirect_uri', redirectUri);
    body.set('client_id', CLIENT_ID);
    body.set('code_verifier', stored.pkce_verifier);

    const resp = await fetch(TOKEN_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: body.toString()});
    if (!resp.ok) throw new Error('Token exchange failed: ' + await resp.text());
    const tokens = await resp.json();
    const expires_at = Date.now() + (tokens.expires_in * 1000);
    await chrome.storage.local.set({spotify_tokens: tokens, spotify_expires_at: expires_at});
    // cleanup
    await chrome.storage.local.remove(['pkce_verifier','oauth_state']);
    return tokens;
  } catch (err) {
    console.error('Auth error', err);
    throw err;
  }
}

async function refreshAccessToken() {
  const data = await chrome.storage.local.get(['spotify_tokens']);
  if (!data.spotify_tokens || !data.spotify_tokens.refresh_token) throw new Error('No refresh token available');
  const body = new URLSearchParams();
  body.set('grant_type','refresh_token');
  body.set('refresh_token', data.spotify_tokens.refresh_token);
  body.set('client_id', CLIENT_ID);

  const resp = await fetch(TOKEN_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: body.toString()});
  if (!resp.ok) throw new Error('Refresh failed: ' + await resp.text());
  const tokens = await resp.json();
  // merge tokens: Spotify may return a new access_token + expires_in, sometimes a new refresh_token
  const merged = {...data.spotify_tokens, ...tokens};
  const expires_at = Date.now() + (tokens.expires_in * 1000);
  await chrome.storage.local.set({spotify_tokens: merged, spotify_expires_at: expires_at});
  return merged;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      if (msg?.type === 'START_AUTH') {
        const t = await startAuthInteractive();
        sendResponse({ok:true, tokens: t});
        return;
      }
      if (msg?.type === 'GET_TOKEN') {
        const data = await chrome.storage.local.get(['spotify_tokens','spotify_expires_at']);
        if (!data.spotify_tokens) return sendResponse({ok:false, error:'No tokens'});
        if (Date.now() > (data.spotify_expires_at - 60000)) {
          // refresh
          const t = await refreshAccessToken();
          return sendResponse({ok:true, tokens: t});
        } else {
          return sendResponse({ok:true, tokens: data.spotify_tokens});
        }
      }
      if (msg?.type === 'CLEAR_TOKENS') {
        await chrome.storage.local.remove(['spotify_tokens','spotify_expires_at']);
        return sendResponse({ok:true});
      }
      sendResponse({ok:false, error:'unknown message'});
    } catch (err) {
      console.error(err);
      sendResponse({ok:false, error: err.message});
    }
  })();
  return true;
});
