# 🚀 GitHub Copilot Cheat Sheet

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://tdblackston0.github.io/GHCP-CLI-Cheat-sheet/)

> A one stop shop for upskilling on GitHub Copilot - an interactive, one-page website that blends practical **VS Code workflows** with the **Copilot CLI** command reference.

## 🌐 Live Website

**Visit the cheat sheet:** [GitHub Copilot Cheat Sheet](https://tdblackston0.github.io/GHCP-CLI-Cheat-sheet/)

## ✨ Features

- **🔍 Instant Search** - Find any command, shortcut, or topic instantly
- **📱 Mobile Responsive** - Works perfectly on all devices
- **📋 One-Click Copy** - Click any command to copy it to your clipboard
- **🎯 Collapsible Sections** - Expand/collapse sections for easy navigation
- **⌨️ Keyboard Shortcuts** - Use `Cmd/Ctrl + K` to focus search, `Escape` to clear
- **🌙 Dark Theme** - Easy on the eyes with GitHub-inspired dark theme
- **🖨️ Print Friendly** - Optimized for printing
- **🏷️ Scope Badges** - Every item is marked *VS Code only*, *CLI only*, or left unmarked when it works in both

## 📚 Content Sections

The page is split into two parts. Items without a scope badge apply to both VS Code and the CLI.

### Part 1 - VS Code & Workflows

| Section | Description |
|---------|-------------|
| 🎯 What You'll Learn | Goals of the upskill guide |
| 💻 Copilot in VS Code | Ways to interact, chat participants, slash commands, context variables |
| 🛠️ Troubleshooting Workflows | Explaining commands, fixing diagnostics, stack traces, commit messages |
| 🧠 Prompt Patterns | Patterns that consistently produce better results |
| ✅ Discovery Cheat Sheet | A checklist of things to try today |
| 🤝 Tips, Gotchas, and Etiquette | Context, iteration, and safe usage habits |

### Part 2 - Copilot CLI

| Section | Description |
|---------|-------------|
| ⌨️ CLI Overview | `copilot`, `gh copilot suggest`, and `gh copilot explain` |
| 📦 Installation | Platform-specific installation commands |
| 🔐 Authentication | Login and credential management |
| 🎮 Modes of Operation | Interactive, Programmatic, Autopilot, and Agent modes |
| ⌨️ Keyboard Shortcuts | Essential keyboard controls |
| 🔧 Command-Line Flags | All CLI flags and options |
| 📝 Slash Commands | Session, code review, and configuration commands |
| 🔤 Special Prefixes | File inclusion, shell commands, and delegation |
| 🤖 Custom Agents | Working with specialized AI personas |
| 🔌 MCP | Model Context Protocol integration |
| 🧩 Plugins | Plugin management commands |
| 📁 Custom Instructions | Setting up instruction files |
| 🎯 Quick Recipes | Common workflow examples |
| ⚡ Power Tips | Pro tips for advanced users |
| 🪙 Token Optimization | Keeping prompts focused and context efficient |
| 🆘 Troubleshooting | Common issues and solutions |
| 📚 Resources | Official documentation links |

The VS Code and workflow content is also maintained in [`GitHub-Copilot-Upskill.md`](GitHub-Copilot-Upskill.md).

## 🛠️ Local Development

To run the cheat sheet locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Tdblackston0/GHCP-CLI-Cheat-sheet-.git
   cd GHCP-CLI-Cheat-sheet-
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## 📝 Contributing

Contributions are welcome! Feel free to:

- Report bugs or suggest features via [Issues](https://github.com/Tdblackston0/GHCP-CLI-Cheat-sheet-/issues)
- Submit Pull Requests with improvements
- Share feedback to help improve the cheat sheet

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

CLI content sourced from the [GitHub Copilot CLI Cheat Sheet](https://github.com/ms-mfg-community/ghcp-taskforge/blob/copilot/create-github-copilot-cli-cheat-sheet/copilot-cli-cheatsheet.md) by [ms-mfg-community](https://github.com/ms-mfg-community). VS Code and workflow content adapted from [`GitHub-Copilot-Upskill.md`](GitHub-Copilot-Upskill.md).

---

💡 **Pro tip:** Type `/help` inside any Copilot CLI session to see the complete list of available commands!
