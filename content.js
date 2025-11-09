// content.js - minimal present to allow messaging; could be extended to show overlays on open.spotify.com
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // placeholder - the main interaction is via injected player and postMessage
});

// forward window.postMessage events from page to extension
window.addEventListener('message', (ev) => {
  if (!ev.data || typeof ev.data !== 'object') return;
  const msg = ev.data;
  if (msg.type === 'LOOPIFY_PLAYER_READY' || msg.type === 'LOOPIFY_PLAYER_STATE') {
    chrome.runtime.sendMessage({ type: msg.type, payload: msg });
  }
});
