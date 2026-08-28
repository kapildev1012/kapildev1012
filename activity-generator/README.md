# 🚀 Automated GitHub Contribution Generator

A Node.js utility based on `moment`, `simple-git`, `jsonfile`, and `random` to generate realistic, backdated commit histories on GitHub.

> **Disclaimer:** Intended for educational and demonstration purposes.

---

## 📦 Prerequisites & Installation

```bash
cd activity-generator
npm install
```

---

## 🛠️ Usage

### 1. Generate Commits (Default 50 commits):
```bash
node index.js
```

### 2. Generate Custom Number of Commits:
```bash
# Windows PowerShell:
$env:COMMITS=200; node index.js

# Bash / Linux / macOS:
COMMITS=200 node index.js
```

### 3. Generate and Automatically Push to GitHub:
```bash
node index.js --push
```

---

## ⚙️ How It Works
1. Calculates a randomized point on the 54-week x 7-day contribution grid across the past year.
2. Formats a real ISO timestamp matching GitHub's git date format.
3. Updates `data.json` with the new timestamp.
4. Stages and creates a git commit with `--date` set to the generated timestamp.
5. Recursively loops until all commits are created, then optionally batches the `git push` into a single network call.

---

## 👁️ Make Private Commits Visible on Your Profile
1. Go to your **GitHub Profile** (`https://github.com/<username>`).
2. Above your contribution graph on the right, click **Contribution settings**.
3. Check the box **"Private contributions"**.
