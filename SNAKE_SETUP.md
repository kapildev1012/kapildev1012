# 🐍 Contribution Snake Workflow Setup

This repository uses [Platane/snk](https://github.com/Platane/snk) to generate an interactive contribution snake animation from Kapil Dev's GitHub commit graph.

---

## ⚡ How It Works

1. **GitHub Action Trigger**: A GitHub Action (`.github/workflows/snake.yml`) runs automatically every midnight via cron (`0 0 * * *`) and can also be triggered manually anytime via `workflow_dispatch`.
2. **Animation Generation**: The action extracts Kapil Dev's public contribution graph and renders it into:
   - `github-contribution-grid-snake.svg`
   - `github-contribution-grid-snake-dark.svg`
   - `ocean.gif`
3. **Automated Branch Deployment**: The generated files are automatically committed and pushed to the `output` branch of this repository using `crazy-max/ghaction-github-pages`.
4. **Display**: The main `README.md` references the output asset directly:
   ```markdown
   <img src="https://raw.githubusercontent.com/kapildev1012/kapildev1012/output/github-contribution-grid-snake.svg" alt="Contribution Snake" width="100%">
   ```

---

## 🛠️ Workflow Configuration

The workflow file is located at `.github/workflows/snake.yml`:

```yaml
name: Generate Contribution Snake

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate-snake:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate Snake Animation
        uses: Platane/snk@v3
        with:
          github_user_name: kapildev1012
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
            dist/ocean.gif?color_snake=orange&color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9
            dist/github-contribution-grid-snake.svg?color_snake=orange&color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9

      - name: Push Snake Animation
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🚀 Triggering Manually

1. Go to `https://github.com/kapildev1012/kapildev1012/actions`
2. Select **Generate Contribution Snake** from the left sidebar
3. Click the **Run workflow** dropdown button and click **Run workflow**
4. Wait ~1 minute for the workflow to complete.
5. Verify that the `output` branch exists and has the generated SVG files.

---

## ⚠️ Troubleshooting

- **Permission Denied / 403 on push**:
  Ensure GitHub Actions has Read and Write permissions:
  1. Go to repository **Settings** > **Actions** > **General**.
  2. Under **Workflow permissions**, choose **Read and write permissions**.
  3. Click **Save**.
