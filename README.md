<div align="center">

# 🎵 Loopify - Your Personal Spotify Loop Master 🎵

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=32&pause=1000&color=1DB954&center=true&vCenter=true&random=false&width=800&lines=Loop+Your+Favorite+Song+Moments+%F0%9F%8E%A7;Create+Unlimited+Custom+Mixes+%E2%9C%A8;Perfect+Every+Beat+%F0%9F%94%A5;Spotify+Premium+Required+%F0%9F%8E%B5" alt="Typing SVG" />

<img src="https://user-images.githubusercontent.com/74038190/212748830-4c709398-a386-4761-84d7-9e10b98fbe6e.gif" width="700">

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/iayus-grow/Loopify)
[![Spotify](https://img.shields.io/badge/Spotify-Premium-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://spotify.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0-orange?style=for-the-badge)](https://github.com/iayus-grow/Loopify)

</div>

---

<div align="center">

## 🎯 What is Loopify?

<img align="right" width="400" src="https://user-images.githubusercontent.com/74038190/212749447-bfb7e725-6987-49d9-ae85-2015e3e7cc41.gif">

</div>

**Loopify** is a powerful Chrome extension that lets you loop specific sections of your favorite songs on Spotify! Whether it's that **epic guitar solo**, **catchy chorus**, or **perfect drop**, Loopify helps you create unlimited custom mixes from different songs and replay your favorite moments endlessly.

### ✨ Perfect For:
- 🎸 **Musicians** practicing specific sections
- 💃 **Dancers** perfecting choreography
- 🎤 **Singers** learning lyrics
- 🎧 **Music lovers** enjoying their favorite moments
- 🎹 **Producers** studying song structures

<br clear="right"/>

---

<div align="center">

## 🚀 Quick Start Guide

<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400">

### Get up and running in just 5 minutes!

</div>

---

## 📥 Step 1: Download Loopify (30 seconds)

<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="25"> **Option 1: Git Clone**

```bash
git clone https://github.com/iayus-grow/Loopify.git
cd Loopify
```

<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="25"> **Option 2: Download ZIP**

Download from [GitHub](https://github.com/iayus-grow/Loopify) and extract it to your desired location.

---

## 🎵 Step 2: Create Spotify App (2 minutes)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212749695-a6817c5a-a794-462b-afca-1b5ce31a9685.gif" width="300">
</div>

1. 🌐 Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. ➕ Click **"Create app"**
3. 📝 Fill in the details:
   - **App name:** `Loopify`
   - **App description:** `Loop extension for Spotify`
   - **Redirect URI:** (leave empty for now - we'll add it later)
   - **Web API:** ✅ Check this option
4. 💾 Click **"Save"**
5. 📋 Copy your **Client ID** (you'll need this in the next step!)

---

## ⚙️ Step 3: Configure Extension (1 minute)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212749171-b84692a8-2848-41a2-99c3-5ffb527abd26.gif" width="300">
</div>

1. 📂 Open `background.js` in any text editor (VS Code, Notepad++, etc.)
2. 🔍 Find **line 9**:

```javascript
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
```

3. ✏️ Replace `YOUR_SPOTIFY_CLIENT_ID` with your actual Client ID from Step 2
4. 💾 **Save the file**

**Example:**
```javascript
const CLIENT_ID = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
```

---

## 🔌 Step 4: Install in Chrome (1 minute)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284136-03988914-d899-44b4-b1d9-4eeccf656e44.gif" width="300">
</div>

1. 🌐 Open Chrome and go to: `chrome://extensions`
2. 🔧 Toggle **"Developer mode"** ON (top-right corner)
3. 📦 Click **"Load unpacked"**
4. 📁 Select the **Loopify folder**
5. ✅ Extension is now installed! Look for the Loopify icon in your toolbar

---

## 🔗 Step 5: Configure Spotify Redirect URI (1 minute)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212750147-854a394f-fee9-4080-9770-78a4b7ece53f.gif" width="300">
</div>

1. 📋 In `chrome://extensions`, find **Loopify**
2. 🆔 Copy the **Extension ID** (long string below the extension name)
   - Example: `abcdefghijklmnopqrstuvwxyz123456`
3. 🔗 Create your redirect URI using this format:

```
https://YOUR_EXTENSION_ID.chromiumapp.org/spotify_callback
```

**Example:**
```
https://abcdefghijklmnopqrstuvwxyz123456.chromiumapp.org/spotify_callback
```

4. 🌐 Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
5. 🎵 Click your **Loopify app** → Click **"Settings"**
6. 📝 Under **"Redirect URIs"**, paste your complete URI
7. ➕ Click **"Add"** then **"Save"**

---

<div align="center">

## 🎉 Step 6: Start Looping! (30 seconds)

<img src="https://user-images.githubusercontent.com/74038190/212750996-938b257b-266c-45a7-9af7-655341c0f58b.gif" width="400">

</div>

1. 🎵 Go to [open.spotify.com](https://open.spotify.com) and play any song
2. 🔌 Click the **Loopify icon** in your Chrome toolbar
3. 🔗 Click **"Connect Spotify"**
4. ✅ Authorize the app (you'll be redirected back)
5. 🔄 Click **"Refresh Current Track"**
6. 🤖 Click **"Auto-suggest loop"** for instant magic
7. ▶️ Click **"Start Loop"**
8. 🎊 **Enjoy your perfect loop!**

---

<div align="center">

## ⭐ Amazing Features

<img src="https://user-images.githubusercontent.com/74038190/212750672-2f3f2b50-c84f-4ed8-a60a-849ae69ff9df.gif" width="500">

</div>

### 🤖 Auto-Suggest Loop (AI-Powered)

<img align="right" width="350" src="https://user-images.githubusercontent.com/74038190/212749447-bfb7e725-6987-49d9-ae85-2015e3e7cc41.gif">

Our intelligent algorithm analyzes your track's structure and automatically finds the best looping points!

**Features:**
- 🎼 Analyzes track structure and rhythm
- 🎯 Finds the perfect 4-bar section
- 📊 Aligns to musical bars automatically
- ⚡ One-click perfection

**How to use:**
1. Play any track
2. Click "Auto-suggest loop"
3. Review the suggested section
4. Click "Start Loop" - That's it!

<br clear="right"/>

---

### 🎛️ Manual Loop Control (For Precision Masters)

<img align="left" width="350" src="https://user-images.githubusercontent.com/74038190/212749171-b84692a8-2848-41a2-99c3-5ffb527abd26.gif">

Want complete control? Set your own custom loop points with millisecond precision!

**How to use:**
1. ▶️ Play your track
2. ⏸️ Pause at the exact start point you want
3. 📍 Click **"Set Start"**
4. ▶️ Play until your desired end point
5. ⏸️ Pause again
6. 📍 Click **"Set End"**
7. 🔁 Click **"Start Loop"**
8. 🎯 Perfect precision every time!

<br clear="left"/>

---

### 💾 Save & Library Management

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212750155-3ceddfbd-19d3-40a3-87af-8d329c8323c4.gif" width="350">
</div>

Never lose your perfect loops! Save unlimited loops and organize them your way.

**Features:**
- 💾 **Save unlimited loops** from any song
- 📚 **Loop Library** - View all your saved loops
- 🔍 **Search & Filter** - Find loops instantly
- 🎵 **Create Custom Mixes** - Combine loops from different songs
- 📋 **Export to Playlists** - Save your mixes as Spotify playlists
- 🏷️ **Tag & Organize** - Keep everything neat

**How to use:**
1. Create your perfect loop
2. Click **"Save Loop"**
3. Add a name and tags (optional)
4. Access anytime via **"Open Loop Library"**
5. Build unlimited custom mixes!

---

<div align="center">

## 🎨 Use Cases & Examples

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

</div>

### 🎸 For Musicians
Loop that complex guitar solo or drum fill until you nail it perfectly!

### 💃 For Dancers
Repeat the exact 8 counts you're working on for your choreography.

### 🎤 For Singers
Practice difficult vocal runs and lyrics without manually rewinding.

### 🎧 For Music Lovers
Replay your favorite drop, chorus, or bridge endlessly!

### 🎹 For Producers
Study song arrangements, transitions, and production techniques.

### 📚 For Students
Learn music theory by analyzing repeating sections.

---

<div align="center">

## 🛠️ Troubleshooting

<img src="https://user-images.githubusercontent.com/74038190/212750680-2b4b3e56-091e-44f9-b2e1-0603156dad6a.gif" width="300">

</div>

### ❌ "Authentication Failed"

**Problem:** Can't connect to Spotify

**Solutions:**
- ✅ Verify Client ID is correct in `background.js`
- ✅ Check Redirect URI matches exactly in your Spotify app settings
- ✅ Make sure you saved both files after making changes
- ✅ Try reloading the extension in `chrome://extensions`

---

### ❌ "No Track Playing"

**Problem:** Extension can't detect your music

**Solutions:**
- ✅ Open [open.spotify.com](https://open.spotify.com) in Chrome
- ✅ Make sure a song is actually playing
- ✅ Click **"Refresh Current Track"** in the extension
- ✅ Check you're logged into Spotify

---

### ❌ "Loop Not Working"

**Problem:** Loop won't start or play

**Solutions:**
- ✅ **Spotify Premium is required** - Free accounts won't work
- ✅ Check your internet connection
- ✅ Try reloading the extension
- ✅ Make sure the loop points are set correctly
- ✅ Verify you've authorized the app in Spotify

---

### ❌ "Extension Not Loading"

**Problem:** Extension doesn't appear or won't load

**Solutions:**
- ✅ Make sure you extracted the entire folder
- ✅ Enable Developer Mode in `chrome://extensions`
- ✅ Try removing and re-adding the extension
- ✅ Check Chrome console for error messages

---

<div align="center">

## ⚠️ Important Requirements

<img src="https://user-images.githubusercontent.com/74038190/212750147-854a394f-fee9-4080-9770-78a4b7ece53f.gif" width="300">

</div>

### 🎵 Spotify Premium Account Required

This extension requires an active **Spotify Premium subscription** to function. The Spotify Web API playback controls only work with Premium accounts.

**Why Premium?**
- ✅ Spotify API requires Premium for playback control
- ✅ Enables precise seek positioning
- ✅ Allows programmatic track control
- ❌ Free accounts don't support these features

---

### 🌐 Browser Requirements

- ✅ **Google Chrome** (v88 or higher)
- ✅ **Chromium-based browsers** (Edge, Brave, Opera)
- ❌ Firefox not supported yet

---

<div align="center">

## 🤝 Contributing

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="600">

</div>

Want to help make Loopify even better? We welcome contributions!

### 🚀 How to Contribute

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/Loopify.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

### 💡 Ideas for Contributions
- 🎨 UI/UX improvements
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌍 Translations
- ⚡ Performance optimizations

---

<div align="center">

## 📞 Support & Community

<img src="https://user-images.githubusercontent.com/74038190/212750672-2f3f2b50-c84f-4ed8-a60a-849ae69ff9df.gif" width="400">

</div>

### Need Help?

🐛 **Report Issues:** [GitHub Issues](https://github.com/iayus-grow/Loopify/issues)

💬 **Questions:** Open a [Discussion](https://github.com/iayus-grow/Loopify/discussions)

📧 **Email:** iayushsharma.2008@gmail.com

⭐ **Star this repo** if you find it useful!

---

<div align="center">

## 📜 License

<img src="https://user-images.githubusercontent.com/74038190/212284136-03988914-d899-44b4-b1d9-4eeccf656e44.gif" width="300">

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎵 Made with ❤️ for Music Lovers

<img src="https://user-images.githubusercontent.com/74038190/212748830-4c709398-a386-4761-84d7-9e10b98fbe6e.gif" width="600">

### Happy Looping! 🎧✨

**Remember:** Practice makes perfect, and with Loopify, you can practice perfectly! 🎯

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

[![Star on GitHub](https://img.shields.io/github/stars/iayus-grow/Loopify?style=social)](https://github.com/iayus-grow/Loopify)
[![Fork on GitHub](https://img.shields.io/github/forks/iayus-grow/Loopify?style=social)](https://github.com/iayus-grow/Loopify/fork)
[![Follow](https://img.shields.io/github/followers/iayus-grow?style=social)](https://github.com/iayus-grow)

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=1DB954&height=120&section=footer&text=Rock%20On!%20🤘&fontSize=30&fontColor=fff&animation=twinkling" width="100%">

</div>
