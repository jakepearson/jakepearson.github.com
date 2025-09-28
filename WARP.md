# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal website/recipe blog called "Existential Bologna" hosted on GitHub Pages at joapy.com. The site contains primarily recipe posts with some personal content, using Jekyll 4.2.1 with the Minima theme.

## Common Development Commands

### Local Development
```bash
# Install dependencies (Ruby gems)
bundle install

# Serve the site locally with live reload
bundle exec jekyll serve

# Serve with drafts included
bundle exec jekyll serve --drafts

# Build the site (generates _site/ directory)
bundle exec jekyll build

# Clean generated files
bundle exec jekyll clean
```

### Content Management
```bash
# Create a new recipe post (follow the naming convention)
touch _posts/$(date +%Y-%m-%d)-recipe-name.md

# Check all posts by date
ls -la _posts/

# Preview posts in development (drafts)
bundle exec jekyll serve --drafts --livereload
```

## Architecture and Structure

### Jekyll Site Structure
- `_config.yml` - Main Jekyll configuration file with site settings
- `_layouts/` - HTML templates for different page types
  - `default.html` - Base layout with header/footer
  - `post.html` - Template for blog posts/recipes
  - `home.html` - Homepage template showing post list
  - `page.html` - Static page template
- `_includes/` - Reusable HTML components (head, header, footer, icons)
- `_posts/` - Blog posts/recipes in Markdown format
- `Gemfile` - Ruby gem dependencies

### Content Organization
- All recipes are stored as Markdown files in `_posts/` with YAML frontmatter
- Posts follow naming convention: `YYYY-MM-DD-title.md`
- Posts use `layout: post` or `layout: page` in frontmatter
- Tags are used for categorization (dessert, cake, entree, etc.)
- Custom collections configured for recipes in `_config.yml`

### Key Configuration Details
- Site title: "Existential Bologna"
- Domain: joapy.com (configured in CNAME)
- Uses Minima theme with custom layouts
- Jekyll Feed plugin for RSS
- Google Analytics tracking included in head.html
- Dependabot configured for Ruby/Bundler updates

### Styling and Assets
- Uses Minima theme as base with potential custom overrides
- Custom CSS can be added to `/assets/main.css`
- Icons for GitHub and Twitter are included as SVG components

## Content Creation Guidelines

### Recipe Post Format
```markdown
---
layout: post
title: Recipe Name
tags:
  - category (dessert, entree, etc.)
  - type (cake, bread, etc.)
---

### Ingredients
* List ingredients here

### Directions
1. Step-by-step instructions
2. With numbered list

### Additional Notes
Optional notes section
```

### File Organization
- Recipe posts should use descriptive filenames
- Follow existing tag conventions for consistency
- Include prep time, cooking time when available
- Use consistent markdown formatting (### for sections)

## Development Environment

### Prerequisites
- Ruby (for Jekyll)
- Bundler gem
- Git (for version control and GitHub Pages deployment)

### Local Setup
1. Clone repository
2. Run `bundle install` to install dependencies
3. Run `bundle exec jekyll serve` to start local development server
4. Site will be available at `http://localhost:4000`

### Deployment
- Automatic deployment via GitHub Pages
- Pushes to main branch trigger site rebuild
- Site is served at joapy.com via CNAME configuration

## File Patterns to Know

- `_site/` - Generated site files (gitignored)
- `.sass-cache/`, `.jekyll-cache/` - Jekyll cache directories (gitignored)
- `vendor/` - Bundler vendor directory (gitignored)
- Posts must be in `_posts/` directory with date prefix to appear on site
- Drafts can be stored without date prefix and served with `--drafts` flag