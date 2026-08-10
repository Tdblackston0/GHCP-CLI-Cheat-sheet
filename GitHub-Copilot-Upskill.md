# GitHub Copilot Upskill: VS Code + Copilot CLI

A practical guide to unlock the full power of GitHub Copilot (GHCP) for **building**, **troubleshooting**, and **discovering** across your daily workflow — inside VS Code and in the terminal.

---

## 🎯 What You'll Learn

- How to move beyond autocomplete and use Copilot as a **collaborator**.
- The **chat participants**, **slash commands**, and **context variables** that unlock power-user workflows.
- How to use **Copilot CLI** in the terminal for shell, git, and troubleshooting help.
- Real-world patterns for **building**, **debugging**, and **explaining** code and errors.

---

## 1. GitHub Copilot in VS Code

### 1.1 The Three Ways to Interact

| Mode | Trigger | Best For |
|------|---------|----------|
| **Inline suggestions** | Just start typing | Fast code completion |
| **Inline Chat** | `Ctrl+I` (Win) / `Cmd+I` (Mac) | Quick edits & refactors in place |
| **Chat view** | `Ctrl+Alt+I` / `Cmd+Ctrl+I` | Multi-turn conversations, planning, explaining |
| **Copilot Edits** | `Ctrl+Shift+I` | Multi-file coordinated changes |
| **Agent mode** | Chat view → Agent | Autonomous multi-step tasks |

### 1.2 Chat Participants (`@`)

Chat participants are **domain experts** you can call in Copilot Chat.

| Participant | What it does | Example |
|-------------|--------------|---------|
| `@workspace` | Knows about your entire project | `@workspace where is auth handled?` |
| `@vscode` | Knows VS Code features/settings | `@vscode how do I change my theme?` |
| `@terminal` | Knows your terminal & shell | `@terminal /explain` (explains last command) |
| `@github` | Queries GitHub (issues, PRs, repos) | `@github show me my open PRs` |

> 💡 **The gem your team missed:** `@terminal /explain` — highlight or just run a command in the VS Code terminal, then ask `@terminal /explain` in chat. Copilot will explain **exactly what that command does**, including flags, side effects, and safer alternatives.

### 1.3 Slash Commands (`/`)

Slash commands scope what you want Copilot to do.

| Command | Purpose |
|---------|---------|
| `/explain` | Explain the selected code or command |
| `/fix` | Propose a fix for the selection or diagnostic |
| `/tests` | Generate unit tests for the selection |
| `/doc` | Generate documentation/comments |
| `/new` | Scaffold a new project or file |
| `/newNotebook` | Create a new Jupyter notebook |
| `/clear` | Reset the chat context |

**Combine them with participants:**
```
@workspace /explain how does the login flow work end to end?
@terminal /explain
@workspace /tests for src/services/pipeline.py
```

### 1.4 Context Variables (`#`)

Attach precise context to a prompt:

| Variable | Purpose |
|----------|---------|
| `#file` | Reference a specific file |
| `#selection` | Current editor selection |
| `#editor` | Currently active editor |
| `#terminalLastCommand` | The last command you ran |
| `#terminalSelection` | Highlighted terminal output |
| `#codebase` | Broader codebase search |
| `#problems` | Current diagnostics/problems panel |
| `#changes` | Uncommitted git changes |

**Example prompts:**
```
/fix #problems
Explain #terminalLastCommand and why it failed
Refactor #selection to use async/await
Summarize #changes for a commit message
```

### 1.5 Copilot Edits & Agent Mode

- **Copilot Edits** — Add multiple files as context and have Copilot make **coordinated changes across them** with an inline diff review.
- **Agent mode** — Give Copilot a goal ("add a health check endpoint with tests") and it will plan, edit files, run terminal commands, and iterate until done. Great for scaffolding, migrations, and repetitive multi-step work.

---

## 2. Troubleshooting Workflows (The "Cool Stuff")

These are the moments where Copilot shines and most users don't realize it.

### 2.1 Explain a Failing Terminal Command
1. Run the command in the VS Code integrated terminal.
2. Open Copilot Chat.
3. Type: `@terminal /explain`
4. Copilot reads the last command **and its output** and explains what happened.

### 2.2 Fix an Error from the Problems Panel
```
/fix #problems
```
Copilot proposes a targeted fix for the current diagnostic.

### 2.3 Understand a Stack Trace
1. Select the stack trace in the terminal.
2. In chat: `@workspace explain #terminalSelection and point me to the file most likely responsible`.

### 2.4 Debug with the Debugger
- Set a breakpoint, then in inline chat while paused: `why is variable X null here?`
- Copilot inspects local scope and reasons about the state.

### 2.5 Turn Changes into a Commit Message
```
Write a conventional commit message for #changes
```

### 2.6 Understand an Unfamiliar Codebase Quickly
```
@workspace give me a tour of this repo — entry points, main modules, and how data flows
@workspace where is <feature> implemented?
```

---

## 3. GitHub Copilot CLI

`gh copilot` brings Copilot to the terminal — no editor required. Perfect for scripting, ops work, and quick "what does this command do?" moments away from VS Code.

### 3.1 Install
```bash
# Requires the GitHub CLI
gh extension install github/gh-copilot
gh extension upgrade gh-copilot
```

### 3.2 The Two Core Commands

| Command | Purpose |
|---------|---------|
| `gh copilot suggest` | Ask Copilot to suggest a command |
| `gh copilot explain` | Ask Copilot to explain a command |

### 3.3 `gh copilot suggest`
Pick a target: **shell**, **gh**, or **git**.
```bash
gh copilot suggest "find all files larger than 100MB modified in the last 7 days"
gh copilot suggest -t git "undo my last commit but keep the changes staged"
gh copilot suggest -t gh  "list all open PRs assigned to me across the org"
```
Interactive flow lets you **Execute**, **Revise**, **Copy to clipboard**, or **Explain** before running.

### 3.4 `gh copilot explain`
```bash
gh copilot explain "tar -xzvf archive.tar.gz -C /opt/app"
gh copilot explain "kubectl rollout undo deployment/api --to-revision=3"
gh copilot explain "git rebase -i --autosquash HEAD~5"
```

### 3.5 Handy Aliases
Wire Copilot straight into your shell.
```bash
# In your shell rc file
gh copilot alias -- bash   >> ~/.bashrc     # adds ghcs / ghce
gh copilot alias -- zsh    >> ~/.zshrc
gh copilot alias -- pwsh   | Out-String | Invoke-Expression   # PowerShell
```
After sourcing:
```bash
ghcs "compress this folder excluding node_modules"   # suggest
ghce "rsync -avh --delete src/ backup/"              # explain
```
`ghcs` can execute the suggested command directly after you confirm — huge time saver.

---

## 4. Building Faster: Prompt Patterns That Work

### 4.1 The "Role + Goal + Constraints" Pattern
> You are a senior Python engineer. Refactor `#selection` to use dataclasses. Keep the public API unchanged and add type hints. Do not add new dependencies.

### 4.2 Ask for a Plan Before Code
> `@workspace` outline the steps to add JWT auth to this API. Don't write code yet — just the plan and files that will change.

Then follow up with:
> Great — implement step 1.

### 4.3 Generate Tests First (TDD with Copilot)
> `/tests` for `#file:src/services/pipeline.py` covering happy path, empty input, and network failure.

### 4.4 Explain Then Modify
> `/explain #selection`  
> Now rewrite it to stream results instead of buffering.

### 4.5 Use `#codebase` for Cross-File Reasoning
> `#codebase` where do we validate customer IDs, and is the logic consistent everywhere?

---

## 5. Discovery Cheat Sheet

Things worth trying **today**:

- [ ] `@terminal /explain` after any command you don't fully understand.
- [ ] `/fix #problems` on the next red squiggle you see.
- [ ] `@workspace` a tour of the repo you joined most recently.
- [ ] Ask Copilot to **write your next commit message** from `#changes`.
- [ ] Install `gh copilot` and alias `ghcs` / `ghce`.
- [ ] Try **Agent mode** on a small task (e.g., "add a README badge for the CI status").
- [ ] Use `/tests` on a function that has no tests.
- [ ] Ask `@vscode` how to configure something in the editor instead of Googling.

---

## 6. Tips, Gotchas, and Etiquette

- **Context is king.** The more relevant files/selections you add (`#file`, `#selection`, `#codebase`), the better the answers.
- **Iterate — don't restart.** Follow-up prompts are cheaper and better than starting fresh.
- **Verify before you run.** Especially with `gh copilot suggest` — read the command, or use `explain` first.
- **Don't paste secrets.** Copilot sees what you send. Redact tokens, connection strings, and PII.
- **Use `/clear`** when switching topics so old context doesn't pollute new answers.
- **Keyboard shortcuts pay off.** `Ctrl+I` (inline chat) and `Ctrl+Alt+I` (chat view) are the two to memorize first.

---

## 7. Further Reading

- GitHub Copilot docs: <https://docs.github.com/copilot>
- Copilot in VS Code: <https://code.visualstudio.com/docs/copilot/overview>
- Copilot CLI: <https://docs.github.com/copilot/using-github-copilot/using-github-copilot-in-the-command-line>
- Prompt engineering for Copilot Chat: <https://docs.github.com/copilot/using-github-copilot/prompt-engineering-for-github-copilot>

---

*Prepared as an upskill for the Micron EarlyWatch AI team — feedback and additions welcome.*
