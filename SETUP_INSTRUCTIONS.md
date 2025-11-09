# 🎵 Loopify - Complete Setup Instructions

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Spotify App Setup](#spotify-app-setup)
4. [Extension Installation](#extension-installation)
5. [Configuration](#configuration)
6. [Usage Guide](#usage-guide)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Features](#advanced-features)

---

## Overview

**Loopify** is a Chrome extension that allows you to:
- ✨ Loop specific sections of Spotify tracks
- 🎼 Create mashup playlists from short musical segments
- 🎯 Auto-suggest optimal loop points using Spotify's audio analysis
- 💾 Save your favorite loops for later use
- 🎨 Build custom playlists from your saved loops

**Requirements:** Spotify Premium account (required for Web Playback SDK)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ **Google Chrome** browser (or Chromium-based browser like Edge, Brave, etc.)
- ✅ **Spotify Premium account** (Free accounts won't work with Web Playback)
- ✅ **Spotify Developer account** (free to create)
- ✅ Internet connection

---

## Spotify App Setup

### Step 1: Create a Spotify Application

1. **Go to Spotify Developer Dashboard**
   - Visit: https://developer.spotify.com/dashboard
   - Log in with your Spotify account

2. **Create New App**
   - Click "Create app" button
   - Fill in the details:
     - **App name:** `Loopify` (or any name you prefer)
     - **App description:** `Chrome extension for looping Spotify tracks`
     - **Website:** Leave blank or add your GitHub repo
     - **Redirect URI:** We'll add this in the next step
   - Check the boxes to agree to Spotify's terms
   - Click "Save"

3. **Get Your Client ID**
   - After creating the app, you'll see your **Client ID** on the dashboard
   - **IMPORTANT:** Copy this Client ID - you'll need it soon
   - Keep the **Settings** tab open for the next step

### Step 2: Configure Redirect URI

1. **Get Chrome Extension ID**
   - First, load the extension (see [Extension Installation](#extension-installation) below)
   - Go to `chrome://extensions` in Chrome
   - Find Loopify extension and copy its **ID** (long string like `abcdefghijklmnopqrstuvwxyz123456`)

2. **Calculate Redirect URI**
   - The redirect URI format is: `https://<EXTENSION_ID>.chromiumapp.org/spotify_callback`
   - Example: `https://abcdefghijklmnopqrstuvwxyz123456.chromiumapp.org/spotify_callback`

3. **Add to Spotify App Settings**
   - Go back to your Spotify app dashboard
   - Click "Settings" (or "Edit Settings")
   - In the "Redirect URIs" section, add your full redirect URI
   - Click "Add"
   - Click "Save" at the bottom

---

## Extension Installation

### Method 1: Install from Source (Recommended)

1. **Download the Extension**
   ```bash
   # Clone the repository
   git clone https://github.com/YOUR_USERNAME/Loopify.git
   
   # Or download ZIP and extract it
   ```

2. **Configure Client ID**
   - Open `background.js` in a text editor
   - Find line 9: `const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';`
   - Replace `YOUR_SPOTIFY_CLIENT_ID` with your actual Client ID from Spotify
   - Save the file

3. **Load Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **"Load unpacked"** button
   - Select the Loopify folder
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle icon in Chrome toolbar
   - Find Loopify and click the pin icon
   - Extension icon will now show in your toolbar

### Method 2: Install from .crx (If Available)

1. Download the `.crx` file
2. Drag and drop it into `chrome://extensions`
3. Click "Add Extension" when prompted

---

## Configuration

### Complete the Setup

1. **Verify Installation**
   - Click the Loopify icon in Chrome toolbar
   - You should see the popup with "Connect Spotify" button

2. **Configure Redirect URI (If you haven't)**
   - Get your extension ID from `chrome://extensions`
   - Add the redirect URI to Spotify app (see [Step 2](#step-2-configure-redirect-uri) above)

3. **Test the Connection**
   - Click "Connect Spotify" in the popup
   - You should be redirected to Spotify's authorization page
   - Grant the requested permissions
   - You should be redirected back and see "Connected" status

### Troubleshooting Setup Issues

If connection fails:
- ✅ Verify Client ID is correctly entered in `background.js`
- ✅ Ensure Redirect URI exactly matches in Spotify app settings
- ✅ Check that you're using a Spotify Premium account
- ✅ Try reloading the extension (`chrome://extensions` → click reload icon)

---

## Usage Guide

### Basic Workflow

1. **Start Playback**
   - Open Spotify Web Player: https://open.spotify.com
   - Play any track you want to loop

2. **Open Loopify**
   - Click the Loopify icon in Chrome toolbar
   - If not connected, click "Connect Spotify"

3. **Refresh Track Info**
   - Click "Refresh Current Track" to load the current song

### Creating Loops

#### Method 1: Auto-Suggest (Recommended)

1. Click **"Auto-suggest loop"**
   - Extension uses Spotify's audio analysis
   - Automatically finds the best loop point (usually 4 bars)
   - Shows suggested start, end, and duration

2. Review the suggestion
   - Check the start/end times displayed
   - You can manually adjust if needed

#### Method 2: Manual Selection

1. **Set Start Point**
   - Play the track in Spotify
   - Pause at your desired start point
   - Click **"Set Start (current pos)"**

2. **Set End Point**
   - Continue playing to your desired end point
   - Pause
   - Click **"Set End (current pos)"**

3. **Review**
   - Check the displayed start, end, and duration

### Playing Loops

1. **Start Loop**
   - Click **"Start Loop"** button
   - The track will play your selected segment repeatedly
   - The loop scheduler automatically seeks back to start

2. **Stop Loop**
   - Click **"Stop Loop"** when finished
   - Track continues normal playback

### Saving and Managing Loops

1. **Save a Loop**
   - After creating a loop, click **"Save Loop"**
   - Loop is stored locally in extension storage
   - Includes track info, start/end times

2. **View Loop Library**
   - Click **"Open Loop Library"**
   - See all your saved loops
   - Each entry shows: Track name, artist, and time range

3. **Delete Loops**
   - In the library, click "Delete" next to any loop
   - Or click "Clear Library" to remove all loops

### Creating Playlists

1. **Generate Spotify Playlist**
   - Save multiple loops first
   - Click **"Create Spotify Playlist from Saved Loops"**
   - A new private playlist is created in your Spotify account
   - Named "Loopify Playlist"

2. **Important Note**
   - Playlist contains full track URIs (not segments)
   - Loop offsets are stored locally in the extension
   - To play loops, use Loopify extension (not Spotify app directly)

---

## Advanced Features

### Audio Analysis

Loopify uses Spotify's Audio Analysis API to:
- Detect musical sections
- Identify bar boundaries
- Calculate optimal loop points
- Align to musical bars for smooth loops

### Loop Complexity

The algorithm considers:
- Section duration and energy
- Bar alignment for musicality
- 4-bar default (adjustable)
- Fallback to 8-second segments if bars unavailable

### Storage

- **Local Storage:** All loops stored in Chrome's `chrome.storage.local`
- **Capacity:** Unlimited loops (within browser storage limits)
- **Privacy:** Data never leaves your browser
- **Backup:** Export/import features (coming soon)

---

## Troubleshooting

### Connection Issues

**Problem:** "Auth failed" error
- ✅ Check Client ID in `background.js`
- ✅ Verify Redirect URI in Spotify app
- ✅ Ensure using Spotify Premium account
- ✅ Clear browser cache and reload extension

**Problem:** "No token" error
- ✅ Click "Connect Spotify" again
- ✅ Check network connection
- ✅ Verify Spotify services are online

### Playback Issues

**Problem:** Loop not starting
- ✅ Ensure Spotify Web Player is open and active
- ✅ Check track is playing in Spotify
- ✅ Click "Refresh Current Track"
- ✅ Verify you have Spotify Premium

**Problem:** Loop timing is off
- ✅ Internet latency can affect precision
- ✅ Try shorter loops (< 8 seconds works best)
- ✅ Close other tabs for better performance

### Audio Analysis Issues

**Problem:** "No sections found" error
- ✅ Some tracks lack detailed analysis
- ✅ Use manual selection instead
- ✅ Try a different track

**Problem:** Suggested loop sounds bad
- ✅ Auto-suggest is AI-based, not perfect
- ✅ Manually adjust start/end points
- ✅ Try different sections of the track

### Extension Issues

**Problem:** Extension not appearing
- ✅ Refresh `chrome://extensions`
- ✅ Check for console errors
- ✅ Reload unpacked extension

**Problem:** Popup is blank
- ✅ Right-click extension icon → Inspect popup
- ✅ Check console for JavaScript errors
- ✅ Verify all files are present

---

## Keyboard Shortcuts (Coming Soon)

Future updates will include:
- `Space` - Start/Stop loop
- `S` - Set start point
- `E` - Set end point
- `A` - Auto-suggest loop

---

## Privacy & Permissions

### Required Permissions

- **storage:** Save your loop preferences
- **identity:** Authenticate with Spotify
- **scripting:** Inject playback controls
- **activeTab:** Read current Spotify tab

### Data Usage

- ✅ All data stored locally
- ✅ No external servers
- ✅ Only communicates with Spotify APIs
- ✅ No tracking or analytics

---

## API Rate Limits

Spotify API has rate limits:
- ~180 requests per minute
- Loopify makes ~1-2 requests per action
- Heavy usage may trigger temporary throttling
- Extension automatically handles retry logic

---

## Known Limitations

1. **Premium Required:** Web Playback SDK only works with Premium
2. **Loop Precision:** ±150ms variance due to seek timing
3. **Browser Only:** Extension works in Chrome-based browsers only
4. **Local Loops:** Loop data not synced across devices
5. **Playlist Playback:** Created playlists play full tracks (not loops) in Spotify app

---

## Getting Help

### Support Channels

- 🐛 Report bugs: [GitHub Issues](https://github.com/YOUR_USERNAME/Loopify/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/YOUR_USERNAME/Loopify/discussions)
- 📧 Email: your-email@example.com

### Before Asking

1. Check this guide thoroughly
2. Review [Troubleshooting](#troubleshooting) section
3. Check existing GitHub issues
4. Verify all setup steps completed

---

## Credits

- Built with Spotify Web API & Web Playback SDK
- Uses Chrome Extension Manifest V3
- PKCE OAuth flow for security

---

**Enjoy creating musical loops! 🎵✨**
