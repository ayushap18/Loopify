# 🎵 Loopify - Loop & Mashup Spotify Tracks

<div align="center">

![Loopify Logo](icons/icon128.png)

**Create perfect loops and mashups from your favorite Spotify tracks**

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spotify API](https://img.shields.io/badge/Spotify-API-1DB954?logo=spotify)](https://developer.spotify.com/)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🌟 Features

- **🎯 Smart Loop Detection** - AI-powered suggestions using Spotify's audio analysis
- **✂️ Precise Control** - Set loop points with millisecond accuracy
- **🎼 Musical Intelligence** - Automatically aligns to bar boundaries for smooth loops
- **💾 Loop Library** - Save and organize your favorite loops
- **📝 Playlist Creation** - Generate Spotify playlists from your saved loops
- **🎨 Clean Interface** - Intuitive popup UI with real-time feedback
- **🔒 Secure Authentication** - PKCE OAuth 2.0 flow for maximum security
- **⚡ Real-time Playback** - Uses Spotify Web Playback SDK for instant response

---

## 📋 Prerequisites

- **Spotify Premium Account** (required for Web Playback SDK)
- **Chrome Browser** (or Chromium-based: Edge, Brave, etc.)
- **Spotify Developer App** (free to create)

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/iayus-grow/Loopify.git
cd Loopify
```

### 2. Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy your **Client ID**
4. Add redirect URI: `https://[EXTENSION_ID].chromiumapp.org/spotify_callback`

### 3. Configure Extension

Edit `background.js` line 9:
```javascript
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your Client ID
```

### 4. Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the Loopify folder

### 5. Connect & Use

1. Click the Loopify icon in Chrome toolbar
2. Click "Connect Spotify"
3. Authorize the app
4. Start creating loops!

---

## 📖 Usage

### Creating Your First Loop

1. **Play a track** on [Spotify Web Player](https://open.spotify.com)
2. **Open Loopify** popup
3. Click **"Refresh Current Track"**
4. Click **"Auto-suggest loop"** for AI-powered selection
   - Or manually set start/end points
5. Click **"Start Loop"** to play
6. Click **"Save Loop"** to add to library

### Managing Loops

- **View Library**: Click "Open Loop Library"
- **Delete Loop**: Click delete button next to any loop
- **Create Playlist**: Click "Create Spotify Playlist from Saved Loops"

---

## 📚 Documentation

Comprehensive guides available:

- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Complete setup & troubleshooting guide
- **[FORKING_GUIDE.md](FORKING_GUIDE.md)** - Development & customization guide
- **[API Documentation](#)** - Coming soon

### Key Topics Covered

- ✅ Detailed setup instructions
- ✅ Spotify app configuration
- ✅ OAuth & authentication flow
- ✅ Loop detection algorithms
- ✅ Code architecture
- ✅ Customization options
- ✅ Publishing to Chrome Web Store
- ✅ Contributing guidelines

---

## 🏗️ Project Structure

```
Loopify/
├── manifest.json              # Extension configuration
├── background.js              # OAuth & token management
├── popup.html                 # User interface
├── popup.js                   # Main application logic
├── styles.css                 # UI styling
├── content.js                 # Message passing
├── player_inject.js           # Spotify SDK integration
├── icons/                     # Extension icons
├── SETUP_INSTRUCTIONS.md      # Complete setup guide
├── FORKING_GUIDE.md          # Development guide
└── README.md                  # This file
```

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **APIs**: Spotify Web API, Web Playback SDK
- **Authentication**: OAuth 2.0 with PKCE
- **Storage**: Chrome Storage API
- **Architecture**: Chrome Extension Manifest V3

---

## 🎯 How It Works

### Loop Detection Algorithm

```javascript
// Analyzes track using Spotify's Audio Analysis API
1. Fetches sections, bars, and beats data
2. Identifies longest musical section
3. Aligns to bar boundaries (typically 4 bars)
4. Calculates optimal start/end points
5. Returns suggested loop range
```

### Playback Flow

```javascript
1. User sets loop points
2. Extension plays track at start position (Spotify API)
3. Interval timer monitors playback
4. Seeks back to start before reaching end
5. Creates seamless loop experience
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

See [FORKING_GUIDE.md](FORKING_GUIDE.md) for detailed development instructions.

### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/Loopify.git
cd Loopify
git checkout -b dev
# Make changes and test in chrome://extensions
```

---

## 🐛 Known Issues & Limitations

- Loop timing precision: ±150ms variance due to network latency
- Requires Spotify Premium for Web Playback SDK
- Saved loops are local to browser (no cloud sync)
- Created playlists play full tracks (not segments) in Spotify app

---

## 📝 Changelog

### Version 1.0.1 (Current)
- ✨ Auto-suggest loop feature
- ✨ Manual loop point selection
- ✨ Loop library with save/delete
- ✨ Playlist generation
- ✨ Real-time track info
- 🔒 PKCE OAuth authentication
- 🎨 Modern UI design

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 Loopify Contributors
```

---

## 🙏 Acknowledgments

- Built with [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- Uses [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- Chrome Extension [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- Audio analysis algorithms inspired by music information retrieval research

---

## 📞 Support

- 🐛 **Report bugs**: [GitHub Issues](https://github.com/iayus-grow/Loopify/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/iayus-grow/Loopify/discussions)
- 📧 **Email**: support@example.com
- 📖 **Documentation**: See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 🌟 Star History

If you find Loopify useful, please consider giving it a star! ⭐

---

## 🚧 Roadmap

### Upcoming Features
- [ ] Keyboard shortcuts
- [ ] Crossfade between loops
- [ ] Loop fade in/out
- [ ] Export loop metadata
- [ ] Cloud sync for saved loops
- [ ] Multi-track mashup mode
- [ ] BPM detection & matching
- [ ] Visual waveform display

### Long-term Goals
- [ ] Mobile app integration
- [ ] Collaborative playlists
- [ ] Social sharing features
- [ ] Advanced audio effects
- [ ] Machine learning recommendations

---

<div align="center">

**Made with ❤️ by music lovers, for music lovers**

[⬆ Back to Top](#-loopify---loop--mashup-spotify-tracks)

</div>

