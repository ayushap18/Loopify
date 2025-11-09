# 🔱 Loopify - Complete Forking & Development Guide

This guide covers everything you need to know to fork, modify, and develop Loopify.

## Table of Contents
1. [Quick Fork Setup](#quick-fork-setup)
2. [Project Structure](#project-structure)
3. [Development Environment](#development-environment)
4. [Code Architecture](#code-architecture)
5. [Customization Guide](#customization-guide)
6. [Building & Testing](#building--testing)
7. [Publishing](#publishing)
8. [Contributing](#contributing)

---

## Quick Fork Setup

### 1. Fork the Repository

```bash
# On GitHub, click "Fork" button
# Then clone YOUR fork:
git clone https://github.com/YOUR_USERNAME/Loopify.git
cd Loopify
```

### 2. Set Up Spotify Developer App

1. Go to https://developer.spotify.com/dashboard
2. Create new app
3. Get your Client ID
4. Add redirect URI (explained in SETUP_INSTRUCTIONS.md)

### 3. Configure Your Fork

```bash
# Edit background.js
# Replace 'YOUR_SPOTIFY_CLIENT_ID' with your actual Client ID
```

### 4. Test Locally

```bash
# Load in Chrome:
# 1. Go to chrome://extensions
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select Loopify folder
```

### 5. Make It Yours

```bash
# Update manifest.json
# Change name, description, version
# Update icons in /icons folder
# Modify README.md
```

---

## Project Structure

```
Loopify/
├── manifest.json          # Extension manifest (Chrome MV3)
├── background.js          # Service worker - OAuth & token management
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic & API calls
├── styles.css            # Popup styling
├── content.js            # Content script for message passing
├── player_inject.js      # Spotify Web Playback SDK integration
├── icons/                # Extension icons
│   ├── icon16.png       # 16x16 toolbar icon
│   ├── icon48.png       # 48x48 extension manager
│   └── icon128.png      # 128x128 Chrome Web Store
├── README.md             # Project overview
├── SETUP_INSTRUCTIONS.md # Complete setup guide
├── FORKING_GUIDE.md      # This file
└── CONTRIBUTING.md       # Contribution guidelines (create this)
```

### File Responsibilities

#### `manifest.json`
- Extension metadata and configuration
- Permissions declaration
- Content script registration
- Background service worker setup

#### `background.js`
- OAuth 2.0 PKCE authentication flow
- Token refresh logic
- Secure token storage
- Message handling for popup/content scripts

#### `popup.html` / `popup.js`
- User interface
- Track info display
- Loop controls
- Library management
- Spotify API interactions

#### `player_inject.js`
- Injects Spotify Web Playback SDK
- Creates controllable player device
- Forwards playback state events

#### `content.js`
- Minimal messenger between page and extension
- Forwards window.postMessage events

---

## Development Environment

### Prerequisites

- Node.js (optional, for future tooling)
- Git
- Chrome or Chromium-based browser
- Text editor (VS Code recommended)

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "firefox-devtools.vscode-firefox-debug",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Setting Up Dev Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Loopify.git
cd Loopify

# Create development branch
git checkout -b dev

# Optional: Initialize npm for future tooling
npm init -y

# Install development dependencies (optional)
npm install --save-dev eslint prettier
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.validate.enable": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true
  }
}
```

---

## Code Architecture

### Authentication Flow

```
┌─────────┐      ┌──────────────┐      ┌─────────────┐
│ Popup   │─────▶│ Background   │─────▶│ Spotify     │
│         │      │ Service      │      │ OAuth       │
│         │◀─────│ Worker       │◀─────│             │
└─────────┘      └──────────────┘      └─────────────┘
     │                   │
     │                   │ (stores tokens)
     │                   ▼
     │           ┌──────────────┐
     └──────────▶│ chrome.      │
                 │ storage      │
                 └──────────────┘
```

### Loop Playback Flow

```
┌─────────┐      ┌──────────────┐      ┌─────────────┐
│ Popup   │      │ Spotify      │      │ Web         │
│ UI      │─────▶│ Web API      │─────▶│ Playback    │
│         │      │              │      │ SDK         │
└─────────┘      └──────────────┘      └─────────────┘
     │                                         │
     │ (loop timing)                          │
     │                                         │
     └────────────────────────────────────────┘
              (seek commands via API)
```

### Message Passing

```javascript
// Popup → Background
chrome.runtime.sendMessage({type: 'GET_TOKEN'}, response => {
  // Handle token
});

// Background → Storage
await chrome.storage.local.set({key: value});

// Content Script → Window
window.postMessage({type: 'EVENT'}, '*');
```

---

## Customization Guide

### 1. Change Extension Name & Branding

**manifest.json:**
```json
{
  "name": "Your Custom Name",
  "description": "Your custom description",
  "version": "1.0.0"
}
```

**Update icons:**
- Replace files in `/icons` folder
- Keep filenames: `icon16.png`, `icon48.png`, `icon128.png`
- Maintain dimensions

### 2. Customize UI Styling

**styles.css:**
```css
/* Change color scheme */
body {
  background: #your-color;
  color: #your-text-color;
}

/* Customize buttons */
button {
  background: linear-gradient(45deg, #color1, #color2);
  border-radius: 12px;
}

/* Add animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 3. Modify Loop Detection Algorithm

**popup.js - btnSuggest click handler:**
```javascript
// Current: 4-bar default
// Customize to different length:
if (bars.length >= 8) {  // Change to 8 bars
  start = bars[0].start;
  const end = bars[7].start + bars[7].duration;  // Adjust index
  // ...
}

// Or use energy-based detection:
const highEnergyBars = bars.filter(b => b.loudness > -10);
```

### 4. Add New Features

#### Example: Add Fade In/Out

**popup.js:**
```javascript
// Add new button to popup.html first
const btnFadeLoop = $('#btnFadeLoop');

btnFadeLoop.addEventListener('click', async () => {
  // Implement fade logic
  for (let vol = 0; vol <= 100; vol += 5) {
    await fetch('https://api.spotify.com/v1/me/player/volume?volume_percent=' + vol, {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + token }
    });
    await sleep(100);
  }
});
```

#### Example: Export Loop Metadata

**popup.js:**
```javascript
const btnExport = $('#btnExport');

btnExport.addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['loopify_loops']);
  const json = JSON.stringify(data.loopify_loops, null, 2);
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  
  // Create download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'loopify_export.json';
  a.click();
});
```

### 5. Enhance Authentication

**background.js - Add token validation:**
```javascript
async function validateToken(token) {
  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + token }
  });
  return resp.ok;
}

// Use before returning token
if (msg?.type === 'GET_TOKEN') {
  const data = await chrome.storage.local.get(['spotify_tokens']);
  const isValid = await validateToken(data.spotify_tokens.access_token);
  if (!isValid) {
    // Force refresh
    const t = await refreshAccessToken();
    return sendResponse({ok:true, tokens: t});
  }
  // ...
}
```

---

## Building & Testing

### Development Testing

```bash
# 1. Make changes to code

# 2. Reload extension in Chrome
# Go to chrome://extensions
# Click reload icon on Loopify card

# 3. Test in browser
# - Open popup
# - Check console (F12)
# - Test all features
```

### Debug Console Access

**Background Service Worker:**
```bash
# chrome://extensions
# Click "service worker" link under Loopify
# Opens DevTools for background.js
```

**Popup:**
```bash
# Right-click extension icon
# Select "Inspect popup"
# Opens DevTools for popup.html/popup.js
```

**Content Script:**
```bash
# Open Spotify tab (open.spotify.com)
# Press F12
# Console shows content.js logs
```

### Testing Checklist

- [ ] Authentication flow works
- [ ] Token refresh works
- [ ] Track info loads correctly
- [ ] Auto-suggest finds loops
- [ ] Manual start/end setting works
- [ ] Loop playback works smoothly
- [ ] Save loop stores correctly
- [ ] Loop library displays properly
- [ ] Delete loops works
- [ ] Create playlist works
- [ ] UI is responsive
- [ ] No console errors

### Unit Testing (Future Enhancement)

```javascript
// Example test structure
// Create tests/popup.test.js

describe('Loopify Popup', () => {
  test('should format track info correctly', () => {
    const track = {
      name: 'Test Song',
      artists: [{name: 'Artist 1'}, {name: 'Artist 2'}]
    };
    const result = formatTrackInfo(track);
    expect(result).toBe('Test Song — Artist 1, Artist 2');
  });
});
```

---

## Publishing

### Publishing to Chrome Web Store

#### 1. Prepare for Publication

```bash
# Update version in manifest.json
# Test thoroughly
# Create promotional images:
# - Icon: 128x128
# - Small tile: 440x280
# - Marquee: 1400x560
# - Screenshots: 1280x800 or 640x400
```

#### 2. Create ZIP Package

```bash
# Remove development files
rm -rf .git node_modules .vscode

# Create package
zip -r loopify-v1.0.0.zip . -x "*.git*" -x "*node_modules*" -x "*.DS_Store"
```

#### 3. Developer Dashboard

1. Go to: https://chrome.google.com/webstore/devconsole
2. Pay one-time $5 developer fee (if first time)
3. Click "New Item"
4. Upload ZIP file
5. Fill in store listing:
   - Description
   - Screenshots
   - Category: Productivity
   - Language: English
   - Privacy policy (if collecting data)

#### 4. Review & Publish

- Submit for review
- Review typically takes 1-3 days
- Address any feedback from Google
- Once approved, extension goes live

### Versioning

Follow Semantic Versioning (semver):

```
Major.Minor.Patch
1.0.0 → 1.0.1 (bug fix)
1.0.1 → 1.1.0 (new feature)
1.1.0 → 2.0.0 (breaking change)
```

### Update manifest.json for each release:
```json
{
  "version": "1.1.0",
  "version_name": "1.1.0 - Loop Export Feature"
}
```

---

## Contributing

### Setting Up for Contribution

```bash
# Fork on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Loopify.git

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/Loopify.git

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

```bash
# Make your changes
# Test thoroughly

# Commit with clear messages
git add .
git commit -m "feat: add loop fade in/out feature"

# Push to your fork
git push origin feature/your-feature-name
```

### Pull Request Process

1. **Create PR on GitHub**
   - Go to original repository
   - Click "New Pull Request"
   - Select your fork and branch

2. **PR Description Template:**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - How you tested changes
   - [ ] Tested in Chrome
   - [ ] Tested authentication
   - [ ] Tested loop playback
   
   ## Screenshots
   (if applicable)
   ```

3. **Code Review**
   - Address reviewer feedback
   - Update PR as needed
   - Be responsive to questions

### Commit Message Convention

```bash
# Format: <type>: <description>

feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes (formatting)
refactor: code refactoring
test: add/update tests
chore: maintenance tasks
```

### Code Style Guidelines

```javascript
// Use const/let, not var
const CLIENT_ID = 'abc123';
let currentTrack = null;

// Clear function names
async function refreshAccessToken() { }

// Add comments for complex logic
// Calculate loop duration in seconds
const duration = (suggestedEnd - suggestedStart).toFixed(2);

// Handle errors properly
try {
  const result = await apiCall();
} catch (error) {
  console.error('API call failed:', error);
  showUserError('Failed to load track');
}
```

---

## Advanced Topics

### Adding Analytics

```javascript
// Example using Google Analytics 4
// Add to popup.js

function trackEvent(eventName, params) {
  // Send to your analytics endpoint
  fetch('https://your-analytics-api.com/event', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      event: eventName,
      ...params,
      timestamp: Date.now()
    })
  });
}

// Track loop creation
btnSaveLoop.addEventListener('click', () => {
  trackEvent('loop_saved', {
    track_id: currentTrack.id,
    duration: suggestedEnd - suggestedStart
  });
  // ... rest of code
});
```

### Adding Backend Support

```javascript
// Example: Sync loops to server
// backend.js

const BACKEND_URL = 'https://your-backend.com/api';

async function syncLoops() {
  const data = await chrome.storage.local.get(['loopify_loops']);
  const response = await fetch(`${BACKEND_URL}/loops`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    },
    body: JSON.stringify(data.loopify_loops)
  });
  return response.json();
}
```

### Performance Optimization

```javascript
// Debounce frequent operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Use for track refresh
const debouncedRefresh = debounce(refreshCurrentTrack, 500);
```

---

## Resources

### Spotify Developer Resources
- [Web API Reference](https://developer.spotify.com/documentation/web-api)
- [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- [Audio Analysis](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis)

### Chrome Extension Resources
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Chrome Identity API](https://developer.chrome.com/docs/extensions/reference/identity/)

### Community
- [GitHub Discussions](https://github.com/YOUR_USERNAME/Loopify/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/chrome-extension+spotify)

---

## License

MIT License - Feel free to fork, modify, and distribute

---

**Happy Coding! 🚀🎵**

Questions? Open an issue or discussion on GitHub!
