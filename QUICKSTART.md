# 🚀 Loopify - Quick Start Guide

Get up and running with Loopify in 5 minutes!

## Step 1: Download Loopify

```bash
git clone https://github.com/iayus-grow/Loopify.git
cd Loopify
```

Or download ZIP from GitHub and extract it.

---

## Step 2: Create Spotify App (2 minutes)

1. Go to https://developer.spotify.com/dashboard
2. Click **"Create app"**
3. Fill in:
   - Name: `Loopify`
   - Description: `Loop extension`
   - Redirect URI: *(leave empty for now)*
4. Click **"Save"**
5. **Copy your Client ID** (you'll need it next)

---

## Step 3: Configure Extension (1 minute)

1. Open `background.js` in any text editor
2. Find line 9:
   ```javascript
   const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
   ```
3. Replace `YOUR_SPOTIFY_CLIENT_ID` with your actual Client ID
4. Save the file

---

## Step 4: Install in Chrome (1 minute)

1. Open Chrome and go to: `chrome://extensions`
2. Toggle **"Developer mode"** ON (top-right corner)
3. Click **"Load unpacked"**
4. Select the Loopify folder
5. ✅ Extension is now installed!

---

## Step 5: Configure Spotify Redirect URI (1 minute)

1. In `chrome://extensions`, find Loopify
2. Copy the **Extension ID** (long string below the name)
   - Example: `abcdefghijklmnopqrstuvwxyz123456`
3. Create redirect URI:
   ```
   https://YOUR_EXTENSION_ID.chromiumapp.org/spotify_callback
   ```
4. Go back to https://developer.spotify.com/dashboard
5. Click your app → **"Settings"**
6. Under "Redirect URIs", paste your URI
7. Click **"Add"** then **"Save"**

---

## Step 6: Start Using! (30 seconds)

1. Go to https://open.spotify.com and play a song
2. Click the Loopify icon in Chrome toolbar
3. Click **"Connect Spotify"**
4. Authorize the app
5. Click **"Refresh Current Track"**
6. Click **"Auto-suggest loop"**
7. Click **"Start Loop"**
8. 🎉 Enjoy your loop!

---

## Quick Feature Tour

### Auto-Suggest Loop
- Analyzes track structure
- Finds best 4-bar section
- Aligns to musical bars

### Manual Loop
1. Play track, pause at start
2. Click **"Set Start"**
3. Play to end, pause
4. Click **"Set End"**
5. Click **"Start Loop"**

### Save & Manage
- Click **"Save Loop"** to store
- Click **"Open Loop Library"** to view
- Create playlists from saved loops

---

## Troubleshooting

**"Auth failed"**
- Check Client ID is correct in `background.js`
- Verify Redirect URI matches in Spotify app

**"No track playing"**
- Open https://open.spotify.com
- Play a song first
- Click "Refresh Current Track"

**Loop not working**
- Requires Spotify Premium account
- Check internet connection
- Try reloading extension

---

## Need More Help?

📖 Full guide: [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
🔱 Development: [FORKING_GUIDE.md](FORKING_GUIDE.md)
🐛 Issues: [GitHub Issues](https://github.com/iayus-grow/Loopify/issues)

---

**Happy Looping! 🎵✨**
