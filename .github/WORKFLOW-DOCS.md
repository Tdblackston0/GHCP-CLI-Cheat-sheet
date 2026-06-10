# GitHub Agentic Workflow Documentation

This document explains the automated workflow for keeping the GitHub Copilot CLI Cheat Sheet up-to-date.

## Overview

The workflow uses GitHub Actions and GitHub Copilot coding agent to automatically:
1. **Detect updates** to GitHub Copilot CLI from the official changelog
2. **Create issues** for each detected update
3. **Process approved updates** using Copilot agent
4. **Update the cheat sheet** with new information

## Workflow Components

### 1. Weekly Update Check (`check-updates.yml`)

**Schedule:** Every Monday at 9:00 AM UTC

**What it does:**
- Fetches the GitHub Blog Changelog RSS feed
- Searches for Copilot CLI-related updates from the past week
- Creates GitHub issues for each detected update

**Keywords monitored:**
- `copilot cli`
- `copilot-cli`
- `github copilot cli`
- `@github/copilot`
- `copilot command line`
- `copilot terminal`

### 2. Update Onepager (`update-onepager.yml`)

**Trigger:** When `approved` label is added to an issue

**What it does:**
- Creates a branch for the update
- Adds comments tracking progress
- Dispatches a request to the Copilot agent workflow

### 3. Copilot Agent Update (`copilot-agent-update.yml`)

**Trigger:** Repository dispatch event or manual trigger

**What it does:**
- Fetches issue details
- Prepares the branch and context
- Sets up for Copilot agent to make changes
- Provides instructions for triggering Copilot

### 4. Setup Labels (`setup-labels.yml`)

**Trigger:** Manual (run once)

**What it does:**
- Creates required labels for the workflow:
  - `copilot-cli-update` (purple) - Update detected
  - `needs-review` (yellow) - Needs human review
  - `approved` (green) - Ready for processing
  - `copilot-processing` (blue) - Being processed
  - `update-complete` (purple) - Completed

## How to Use

### Initial Setup

1. **Run the Setup Labels workflow:**
   - Go to Actions → Setup Labels → Run workflow
   - This creates the required labels

2. **Configure Copilot coding agent:**
   - Ensure Copilot coding agent is enabled for the repository
   - The agent will use `.github/agents/copilot-cli-updater.md` for instructions

### Automatic Process

1. **Weekly Check:** Every Monday, the workflow checks for updates
2. **Issue Created:** If updates are found, issues are created with details
3. **Review:** Maintainers review the issue and verify the update
4. **Approve:** Add the `approved` label to trigger processing
5. **Copilot Updates:** Assign Copilot to make the changes
6. **PR Review:** Review and merge the resulting pull request

### Manual Updates

You can also manually report updates using the issue template:
1. Go to Issues → New Issue
2. Select "📦 Copilot CLI Update" template
3. Fill in the details
4. Submit and follow the approval process

## File Structure

```
.github/
├── agents/
│   └── copilot-cli-updater.md    # Copilot agent instructions
├── copilot-setup-steps.yml       # Copilot coding agent setup
├── ISSUE_TEMPLATE/
│   └── copilot-cli-update.yml    # Issue template for updates
└── workflows/
    ├── check-updates.yml         # Weekly update checker
    ├── copilot-agent-update.yml  # Copilot agent handler
    ├── deploy.yml                # GitHub Pages deployment
    ├── setup-labels.yml          # Label setup (run once)
    └── update-onepager.yml       # Approval handler
```

## Troubleshooting

### No updates being detected
- Check the workflow runs in Actions tab
- Verify the RSS feed is accessible
- Ensure keywords match official naming

### Issues not being created
- Check the GITHUB_TOKEN permissions
- Verify issues are enabled for the repository

### Copilot not making changes
- Ensure Copilot coding agent is enabled
- Verify the issue is assigned to @copilot
- Check for any error comments on the issue

### Labels not working
- Run the Setup Labels workflow
- Verify label names match exactly

## Contributing

To improve the workflow:
1. Test changes in a fork first
2. Update this documentation for any changes
3. Submit a PR with your improvements
