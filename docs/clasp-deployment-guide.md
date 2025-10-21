# Clasp Deployment Guide

**Google Apps Script Command Line Interface (clasp) setup and deployment instructions**

---

## 📋 Overview

[clasp](https://github.com/google/clasp) is Google's official CLI tool for developing and deploying Apps Script projects locally. It enables version control, local development, and automated deployments.

### Benefits
- ✅ Deploy from command line (no manual copy-paste)
- ✅ Version control integration
- ✅ Local development with your preferred editor
- ✅ Automated deployments
- ✅ Multiple environment support (dev/staging/prod)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 12+ installed
- npm package manager
- Google Account with Apps Script access

### Installation (5 minutes)

#### Step 1: Install clasp globally
```bash
npm install -g @google/clasp
```

#### Step 2: Login to Google Account
```bash
clasp login
```
This opens a browser window for Google authentication. Grant permissions when prompted.

#### Step 3: Get Your Script ID

1. Open your Google Sheet: [PixelWerx Invoicing](https://docs.google.com/spreadsheets/d/1HyPJ3Iho4rN_R5eEAR1_0RYA-8OuGYZs5NiTSbJp4hc/edit)
2. Menu: **Extensions** → **Apps Script**
3. Click **Project Settings** (⚙️ gear icon, left sidebar)
4. Copy the **Script ID** (format: `1abc...xyz`)

#### Step 4: Configure Project

1. Copy the template:
   ```bash
   cp .clasp.json.template .clasp.json
   ```

2. Edit `.clasp.json`:
   ```json
   {
     "scriptId": "YOUR_SCRIPT_ID_HERE",
     "rootDir": "./src",
     "projectId": "YOUR_PROJECT_ID_HERE"
   }
   ```

3. Replace placeholders:
   - `YOUR_SCRIPT_ID_HERE` → Script ID from Step 3
   - `YOUR_PROJECT_ID_HERE` → (Optional) GCP Project ID if using

---

## 📤 Deploying Changes

### Method 1: Push Changes
```bash
# Deploy all changes to Apps Script
clasp push

# Push and watch for changes (auto-deploy on save)
clasp push --watch
```

### Method 2: Deploy with Version
```bash
# Create a versioned deployment
clasp deploy -d "v1.1.0 - Refactored structure"
```

---

## 📥 Pulling Changes

If you make changes in the web editor and want to sync locally:

```bash
clasp pull
```

**⚠️ Warning:** This overwrites local files. Commit local changes first!

---

## 🔍 Useful Commands

### Project Information
```bash
# Show project info
clasp info

# List all deployments
clasp deployments

# List all versions
clasp versions
```

### Opening Files
```bash
# Open Apps Script web editor
clasp open

# Open specific deployment
clasp open --deploymentId <id>
```

### Running Functions
```bash
# Run a function from command line
clasp run <functionName>
```

### Logs
```bash
# View execution logs
clasp logs

# Watch logs in real-time
clasp logs --watch
```

---

## 📂 What Gets Deployed

### Included (from `src/` directory):
- ✅ `CODE.GS` → Main script file
- ✅ `templates/Invoice.html` → PDF template

### Excluded (via `.claspignore`):
- ❌ `docs/` → Documentation
- ❌ `archive/` → Old files
- ❌ `scripts/` → Utility scripts
- ❌ `*.md` → Markdown files
- ❌ `.git/` → Git repository
- ❌ Planning documents

**See `.claspignore` for complete exclusion list**

---

## 🛡️ Best Practices

### 1. Never Commit `.clasp.json`
```bash
# Add to .gitignore (already done)
echo ".clasp.json" >> .gitignore
```

### 2. Use Versioned Deployments
```bash
# Bad: overwrites @HEAD deployment
clasp push

# Good: creates versioned deployment
clasp deploy -d "v1.1.0 - Description"
```

### 3. Test Before Deploying
```bash
# Push to test deployment first
clasp push

# Test in spreadsheet
# Then create production deployment
clasp deploy -d "Production v1.1.0"
```

### 4. Pull Before Making Changes
```bash
# Sync with remote first
clasp pull

# Then make local changes
code src/CODE.GS
```

---

## 🐛 Troubleshooting

### Error: "User has not enabled the Apps Script API"

**Solution:**
1. Go to https://script.google.com/home/usersettings
2. Enable **Google Apps Script API**
3. Try `clasp login` again

### Error: "Script with ID not found"

**Solution:**
1. Verify Script ID in `.clasp.json`
2. Ensure you have access to the script
3. Check you're logged in: `clasp login --status`

### Error: "Could not read .clasp.json"

**Solution:**
1. Ensure `.clasp.json` exists (copy from template)
2. Check JSON syntax is valid
3. Verify `rootDir` path exists

### Files Not Deploying

**Solution:**
1. Check `.claspignore` - may be excluding files
2. Ensure files are in `rootDir` (default: `./src`)
3. Run `clasp push --force` to override

---

## 📖 Additional Resources

- **Official Documentation:** https://developers.google.com/apps-script/guides/clasp
- **GitHub Repository:** https://github.com/google/clasp
- **Apps Script Reference:** https://developers.google.com/apps-script/reference

---

## ⚡ Quick Reference

```bash
# Setup
npm install -g @google/clasp
clasp login
cp .clasp.json.template .clasp.json
# Edit .clasp.json with your Script ID

# Deploy
clasp push                              # Push all changes
clasp push --watch                      # Auto-deploy on save
clasp deploy -d "v1.1.0"               # Versioned deployment

# Sync
clasp pull                              # Pull remote changes
clasp status                            # Show local changes

# Info
clasp info                              # Project details
clasp open                              # Open web editor
clasp logs                              # View logs

# Manage
clasp versions                          # List versions
clasp deployments                       # List deployments
clasp undeploy <deploymentId>          # Remove deployment
```

---

**Ready to deploy via clasp?** Follow the Quick Start above and deploy in minutes! 🚀
