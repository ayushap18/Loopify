# Contributing to Loopify 🎵

Thank you for your interest in contributing to Loopify! We welcome contributions from everyone.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Loopify.git
   cd Loopify
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/iayus-grow/Loopify.git
   ```

### Setup Development Environment

1. Install Chrome/Chromium browser
2. Get Spotify Developer credentials (see SETUP_INSTRUCTIONS.md)
3. Configure `background.js` with your Client ID
4. Load extension in `chrome://extensions` (Developer mode)

---

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports
- Use GitHub Issues
- Include detailed description
- Provide steps to reproduce
- Include browser version, OS
- Add screenshots if applicable

#### ✨ Feature Requests
- Check existing issues first
- Describe the feature clearly
- Explain why it would be useful
- Consider implementation complexity

#### 📝 Documentation
- Improve README, guides
- Fix typos and clarifications
- Add code comments
- Create tutorials or examples

#### 💻 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Refactoring
- Tests (coming soon)

---

## Development Process

### 1. Find or Create an Issue

- Browse [existing issues](https://github.com/iayus-grow/Loopify/issues)
- Comment on an issue you'd like to work on
- Wait for assignment/approval
- Create new issue if needed

### 2. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test thoroughly

### 4. Test Your Changes

**Manual Testing Checklist:**
- [ ] Extension loads without errors
- [ ] Authentication works
- [ ] Core features work (loop, save, etc.)
- [ ] No console errors
- [ ] UI is responsive
- [ ] Works on different screen sizes

**Test Scenarios:**
- First-time user flow
- Existing user returning
- Edge cases (no track playing, etc.)
- Error handling

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add loop fade feature"
```

See [Commit Guidelines](#commit-guidelines) below.

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create Pull Request on GitHub.

---

## Coding Standards

### JavaScript Style

```javascript
// Use const/let, not var
const CLIENT_ID = 'abc123';
let currentTrack = null;

// Use arrow functions for callbacks
btnClick.addEventListener('click', () => {
  // handler code
});

// Async/await for promises
async function fetchData() {
  const response = await fetch(url);
  return response.json();
}

// Clear naming
function calculateLoopDuration(start, end) {
  return end - start;
}

// Error handling
try {
  const result = await apiCall();
} catch (error) {
  console.error('API call failed:', error);
  showUserError('Failed to load data');
}
```

### HTML/CSS

```html
<!-- Semantic HTML -->
<section id="controls">
  <button id="btnStart">Start</button>
</section>

<!-- Clear class names -->
<div class="loop-item">
  <span class="loop-title">Track Name</span>
</div>
```

```css
/* BEM-style naming */
.loop-item { }
.loop-item__title { }
.loop-item--active { }

/* Mobile-first responsive */
.container {
  width: 100%;
}
@media (min-width: 768px) {
  .container { width: 750px; }
}
```

### Code Organization

```javascript
// Group related functionality
// 1. Constants
const API_URL = 'https://api.spotify.com';

// 2. Variables
let currentTrack = null;

// 3. Helper functions
function formatTime(seconds) { }

// 4. Event handlers
btnStart.addEventListener('click', handleStart);

// 5. Main logic
async function init() { }
```

### Comments

```javascript
// Good comments explain WHY
// Calculate optimal loop point based on bar boundaries
// This ensures musical alignment and smooth transitions
const loopStart = alignToBar(suggestedStart);

// Bad comments explain WHAT (code already shows this)
// Set loop start to aligned value
const loopStart = alignToBar(suggestedStart);
```

---

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Add/update tests
- **chore**: Maintenance tasks
- **build**: Build system changes
- **ci**: CI/CD changes

### Examples

```bash
# Good commits
git commit -m "feat: add loop fade in/out feature"
git commit -m "fix: prevent loop timer from running after stop"
git commit -m "docs: update setup instructions for M1 Macs"
git commit -m "refactor: extract auth logic to separate module"

# Bad commits (too vague)
git commit -m "update code"
git commit -m "fix bug"
git commit -m "changes"
```

### Detailed Commit Example

```
feat: add keyboard shortcuts for loop control

- Add Space to toggle loop playback
- Add 'S' to set start point
- Add 'E' to set end point
- Add 'A' to trigger auto-suggest
- Update popup.html with keyboard hints

Closes #42
```

---

## Pull Request Process

### Before Creating PR

1. ✅ Test thoroughly
2. ✅ Update documentation if needed
3. ✅ Ensure no console errors
4. ✅ Check code style
5. ✅ Commit with clear messages
6. ✅ Rebase on latest main

```bash
git fetch upstream
git rebase upstream/main
git push origin feature/your-feature --force
```

### PR Template

Use this template when creating PR:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes:
- [ ] Manual testing in Chrome
- [ ] Tested authentication flow
- [ ] Tested loop creation
- [ ] Tested saved loops
- [ ] Tested playlist creation

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged

## Screenshots (if applicable)
Add screenshots to demonstrate changes

## Additional Notes
Any additional information or context
```

### Review Process

1. **Automated checks** (if configured)
2. **Code review** by maintainers
3. **Feedback** and requested changes
4. **Approval** and merge

### After PR is Merged

```bash
# Update your local main
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## Areas Where We Need Help

### High Priority
- [ ] Unit testing framework
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] Accessibility features

### Features
- [ ] Keyboard shortcuts
- [ ] Loop fade in/out
- [ ] Crossfade between loops
- [ ] Visual waveform display
- [ ] BPM detection
- [ ] Export loop metadata

### Documentation
- [ ] Video tutorials
- [ ] API documentation
- [ ] Translation to other languages
- [ ] More examples and use cases

---

## Getting Help

### Resources

- 📖 [Setup Instructions](SETUP_INSTRUCTIONS.md)
- 🔱 [Forking Guide](FORKING_GUIDE.md)
- 💬 [GitHub Discussions](https://github.com/iayus-grow/Loopify/discussions)
- 🐛 [GitHub Issues](https://github.com/iayus-grow/Loopify/issues)

### Questions?

- Check existing documentation first
- Search closed issues
- Ask in GitHub Discussions
- Tag relevant maintainers

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Invited to contributor discussions

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Loopify! 🎵✨**

Every contribution, no matter how small, helps make Loopify better for everyone.
