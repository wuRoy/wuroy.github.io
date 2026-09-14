# Personal Website

A Jekyll-based personal website with an "Asymmetric Minimal" design.

## Quick Start

### Prerequisites

- Ruby 3.0+ (install via Homebrew: `brew install ruby`)
- Bundler (`gem install bundler`)

### Local Development

```bash
# Add Homebrew Ruby to PATH (if using Homebrew Ruby)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Making Changes

### Update Your Info

Edit `_config.yml`:

```yaml
title: Your Name
description: Your tagline

author:
  name: Your Name
  email: your@email.com
  bio: "Your short bio"

social:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername
  email: your@email.com
```

### Add News

Edit `_data/news.yml`. Add new items at the **top** of the file (newest first):

```yaml
- title: "Your News Title"
  date: "Month Year"
  description: "Brief description of the news."
```

The 5 most recent items show on the main section; older items appear in the Archive.

### Add People

Create a new file in `_people/` for each person (e.g. `_people/jane-doe.md`). People are grouped on the People page by their `group` value:

```markdown
---
name: "Jane Doe"
group: "PhD Students"      # One of: Principal Investigator, Postdocs, PhD Students
role: "PhD Student"
photo: /assets/images/people/jane.jpg
email: "jane@email.com"    # Optional
order: 2                   # Lower numbers appear first within the group
---

A short bio in Markdown.
```

### Add Publications

Edit `_data/publications.yml`. Publications are automatically grouped by year:

```yaml
- title: "Paper Title"
  authors: "Author 1, Author 2, Your Name"
  venue: "Conference or Journal Name"
  year: 2025
  doi: "https://doi.org/..."      # Clicking the card links to this
  pdf: "https://link-to-pdf.com"  # Optional
  code: "https://github.com/repo" # Optional
  tag: "ML"                       # Optional: single tag displays as #ML
  tags:                           # Optional: multiple tags
    - ML
    - RHP
    - HTS
```

To add your Google Scholar profile link, edit `_config.yml`:

```yaml
social:
  google_scholar: https://scholar.google.com/citations?user=YOUR_ID
```

### Add Projects

Edit `_data/repos.yml`:

```yaml
- name: "project-name"
  description: "What the project does."
  url: "https://github.com/you/project"
  language: "Python"
  stars: 100
```

### Edit the Join Us Page

Edit `_data/join.yml`. The intro text is Markdown; `positions` is an optional list that only shows when it has entries:

```yaml
intro: |
  We are currently looking for passionate PhD students and postdocs...

positions:
  - title: "PhD Students"
    description: |
      What the project involves and how to apply. Markdown works.
```

The "get in touch" link uses `email` from this file, falling back to the site-wide email in `_config.yml`.

### Change Styles

Edit `assets/css/main.scss`. Key variables at the top:

```scss
$color-accent: #ff3366;     // Accent color (links, highlights)
$color-bg: #fafafa;         // Background color
$color-text: #1a1a1a;       // Main text color
$content-offset: 15%;       // Asymmetric left offset
```

## File Structure

```
├── _config.yml          # Site configuration
├── _data/
│   ├── news.yml         # News items
│   ├── publications.yml # Publications
│   └── repos.yml        # Projects/repos
├── _people/             # People profiles
├── _layouts/            # Page templates
├── _includes/           # Reusable components
├── assets/
│   ├── css/main.scss    # Styles
│   └── js/main.js       # JavaScript
├── index.html           # Home page
├── news.html            # News page
├── publications.html    # Publications page
├── people.html          # People page
├── join.html            # Join Us page
├── packages.html        # Packages page
└── resources.html       # Resources page
```

## Deploy to GitHub Pages

### First Time Setup

1. Create a GitHub repository named `yourusername.github.io`

2. Initialize git and push:

```bash
cd personal_website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

3. Go to repository Settings → Pages → Source: Deploy from branch `main`

4. Your site will be live at `https://yourusername.github.io`

### Push Updates

After making changes:

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "Describe your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild your site.

### Custom Domain (Optional)

1. Add a `CNAME` file with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`

3. Enable HTTPS in repository Settings → Pages

## Common Tasks

| Task | Command |
|------|---------|
| Start local server | `bundle exec jekyll serve` |
| Build site | `bundle exec jekyll build` |
| Check status | `git status` |
| Push changes | `git add . && git commit -m "message" && git push` |

## Troubleshooting

**"Could not find 'bundler'" error?**

macOS includes an old system Ruby (2.6) that won't work. You need to use Homebrew Ruby:

```bash
# Install Ruby via Homebrew (if not already installed)
brew install ruby

# Add Homebrew Ruby to PATH permanently
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify you're using the right Ruby (should show 3.0+ or 4.0+)
ruby --version
```

**Bundle install fails?**
```bash
gem install bundler
bundle install
```

**Site not updating on GitHub?**
- Check Actions tab for build errors
- Ensure `_config.yml` has no syntax errors
- Wait a few minutes for deploy to complete
