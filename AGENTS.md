# 1984 Ventures Website - Architecture Guide for AI Agents

This document provides a comprehensive overview of the 1984 Ventures Hugo website build system, content management, and deployment pipeline.

## Table of Contents

1. [Build Process Flow](#build-process-flow)
2. [Notion Content Integration](#notion-content-integration)
3. [Static Templates](#static-templates)
4. [Architecture Overview](#architecture-overview)
5. [OpenGraph Metadata Generation](#opengraph-metadata-generation)
6. [Key Commands](#key-commands)
7. [Content Flow Examples](#content-flow-examples)

---

## Build Process Flow

The build pipeline consists of these main stages:

### 1. Content Synchronization
**Main Script**: `scripts/pull-latest.sh`

Execution order:
```bash
1. import-notion.sh    # Fetches content from Notion
2. content-copy.sh     # Merges template content into content directory
```

### 2. Notion Content Import
**Script**: `scripts/import-notion.sh`

```bash
# Exports Notion database to Hextra markdown format
pnpm run cli export hextra \
  --id 159829231d098087b96fd112a91c7430 \
  --output ../../content \
  --assets-path ../../static/notion_assets \
  --assets-path-base "/notion_assets" \
  --base-url "https://1984.vc"

# Exports portfolio data as JSON
pnpm run cli export json \
  --id 155829231d0980779375ed60cc94a9de \
  --output ../../data/portco.json
```

### 3. Founders Handbook Processing
**Script**: `scripts/update-founders-handbook.ts`

- Scans all markdown files in `/content` directory
- Extracts `Category`, `Icon`, `Sidebar Title`, and `weight` from YAML frontmatter
- Organizes items into sections based on category
- Merges with template items from `/template/foundersHandbook.template.yaml`
- Outputs to `/data/foundersHandbook.yaml`

### 4. Hugo Build
**Script**: `scripts/build.sh`

1. Builds startup-finance Next.js submodule
2. Runs Hugo to generate static site

### 5. Deployment
- Uses Cloudflare Pages via GitHub Actions
- Deployed to: `1984vc-production` project
- Hourly sync: `.github/workflows/pull-latest-push-and-deploy.yaml`
- Push trigger: `.github/workflows/deploy.yaml`

---

## Notion Content Integration

### Notion Integration Package
**Location**: `scripts/notion/`
**Package**: `@1984vc/notion-tools` (custom CLI wrapper)

**Dependencies**:
- `@notionhq/client` - Official Notion API client
- `notion-to-md` (v4.0.0-alpha.5) - Converts Notion blocks to Markdown
- `commander` - CLI argument parsing

### Export Pipeline Classes

#### NotionMarkdownExporter (`markdown.ts`)
Converts Notion database pages to markdown files.

**Key Methods**:
- `exportDatabase()` - Async generator that exports all pages with progress updates
- `processPage()` - Extracts page content and metadata
- `convertPageToMarkdown()` - Uses notion-to-md converter
- `getOutputPath()` - Determines file location based on `path` property or title

#### NotionJSONExporter (`json.ts`)
Exports raw Notion API responses as JSON. Used for portfolio data (`portco.json`).

#### CustomRenderer (`custom-renderer.ts`)
Extends `MDXRenderer` from notion-to-md.

**Transformations Applied**:
1. **URL Transformation**: Converts absolute URLs to relative
2. **Hextra Callouts**: Transforms Notion callouts to Hugo shortcodes
3. **Image Downloading**: Downloads images and saves with SHA1 hash filenames

#### Property Transformers (`transformers.ts`)
`flattenProperties()` simplifies complex Notion property types:
- Title → plain text
- Rich text → concatenated plain text
- Select/Multi-select → names
- Date → ISO string
- Checkbox → boolean
- Numbers, URLs, etc. → primitive values

### Frontmatter Generation
**Source**: Notion page properties

**Generated Fields**:
- `title` - From Title property
- `notionId` - Notion page ID
- `createdAt` - Notion creation timestamp
- `lastEditedAt` - Notion last edit timestamp
- `weight` - For sorting (Number property)
- `authors` - Maps author IDs to metadata from `scripts/notion/authors.json`
- All other properties from Notion database schema

**Code Location**: `scripts/notion/src/markdown.ts:318-377`

---

## Static Templates

### Template Directory Structure
```
template/
├── content/
│   ├── blog/
│   │   └── quit-by-christmas-2025.md    # Hand-crafted blog post
│   ├── docs/
│   │   ├── _index.md
│   │   ├── cap-table-worksheet/_index.md
│   │   └── founders-handbook/_index.md
│   ├── engineering-excellence-seed-stage.md
│   ├── 2024-in-review.md
│   └── _index.md
└── foundersHandbook.template.yaml       # Sidebar template with static items
```

### Template Merging Process
**Script**: `scripts/content-copy.sh`

Uses `rsync` to copy template content to final content directory:
```bash
rsync -r template/content/. content/.
```

This ensures static content isn't overwritten by Notion imports.

### Example: Quit by Christmas Template
**File**: `template/content/blog/quit-by-christmas-2025.md`

```yaml
---
title: "Quit by Christmas Program"
description: "Fast-track financing for aspiring founders..."
createdAt: 2024-10-06T00:00:00.000Z
draft: false
authors: []
---
```

**Key Points**:
- Has `description` field (important for og:description)
- Better formatted than Notion version
- Uses proper HTML for video embeds
- `draft: false` (vs Notion draft versions)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT SOURCES                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Notion Database              Static Templates              │
│  (Founders Handbook)          (Blog Posts, Pages)           │
│  159829231d098087b96fd...     /template/content/           │
│           │                           │                    │
│           └─────────────┬─────────────┘                    │
│                        │                                   │
│           ┌────────────▼───────────────┐                  │
│           │  Scripts/Notion Import    │                  │
│           │  (notion-to-md + Custom   │                  │
│           │   Renderer)               │                  │
│           └────────────┬───────────────┘                  │
│                        │                                   │
│           ┌────────────▼───────────────┐                  │
│           │  Content Generation       │                  │
│           │  /content/ directory      │                  │
│           │  (Markdown with YAML FM)  │                  │
│           └────────────┬───────────────┘                  │
│                        │                                   │
│           ┌────────────▼───────────────┐                  │
│           │  Founders Handbook Gen    │                  │
│           │  (update-founders-        │                  │
│           │   handbook.ts)            │                  │
│           │  → /data/foundersHandbook │                  │
│           │  .yaml                    │                  │
│           └────────────┬───────────────┘                  │
│                        │                                   │
│           ┌────────────▼───────────────┐                  │
│           │  Hugo Build               │                  │
│           │  (Hextra Theme)           │                  │
│           │  → /public/ static site   │                  │
│           └────────────┬───────────────┘                  │
│                        │                                   │
│           ┌────────────▼───────────────┐                  │
│           │  Cloudflare Pages Deploy  │                  │
│           │  (GitHub Actions)         │                  │
│           └───────────────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Files by Function

| Function | File | Type |
|----------|------|------|
| Package scripts | `package.json` | NPM config |
| Build orchestration | `scripts/build.sh` | Shell script |
| Notion import | `scripts/import-notion.sh` | Shell script |
| Template merge | `scripts/content-copy.sh` | Shell script |
| Notion CLI | `scripts/notion/src/index.ts` | TypeScript |
| Markdown export | `scripts/notion/src/markdown.ts` | TypeScript |
| Custom rendering | `scripts/notion/src/custom-renderer.ts` | TypeScript |
| Sidebar generation | `scripts/update-founders-handbook.ts` | TypeScript |
| Hugo config | `hugo.yaml` | YAML |
| Blog layout | `themes/hextra/layouts/blog/single.html` | Hugo template |
| Docs layout | `themes/hextra/layouts/docs/single.html` | Hugo template |
| OG metadata | `themes/hextra/layouts/partials/opengraph.html` | Hugo template |

---

## OpenGraph Metadata Generation

### Metadata Rendering Pipeline

1. **Hugo Head Partial** (`themes/hextra/layouts/partials/head.html:26`):
   ```html
   {{ partialCached "opengraph.html" . }}
   ```

2. **OpenGraph Template** (`themes/hextra/layouts/partials/opengraph.html`):
   ```html
   <!-- Line 3 -->
   <meta property="og:title" content="{{ .Title }}" />

   <!-- Line 4 - Description fallback chain -->
   <meta property="og:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}" />

   <!-- Other OG tags -->
   <meta property="og:type" content="{{ if .IsPage }}article{{ else }}website{{ end }}" />
   <meta property="og:url" content="{{ .Permalink }}" />
   ```

### Metadata Sources (Priority Order)

| Field | Primary Source | Fallback |
|-------|----------------|----------|
| `og:title` | `.Title` (frontmatter `title`) | None - empty if missing |
| `og:description` | `.Description` (frontmatter `description`) | `.Summary` or Site params |
| `og:type` | Page vs Section detection | `website` |
| `og:image` | Frontmatter `images` array | Site-wide default `/images/meta-image.png` |

### Hugo Page Variables

- `.Title` - From frontmatter `title` field
- `.Description` - From frontmatter `description` field
- `.Summary` - First 70 words of content (or up to `<!--more-->` tag)
- `.Site.Params.description` - From `hugo.yaml` (site-wide default)

### Where to Fix OG Metadata Issues

**For Notion-generated content**:
- File: `scripts/notion/src/markdown.ts:316-377`
- Add extraction logic for `description` property from Notion
- Ensure all pages have a `title` property in Notion

**For static template content**:
- File: `template/content/blog/[post-name].md`
- Ensure frontmatter includes:
  ```yaml
  title: "Your Post Title"
  description: "A concise description for social sharing"
  ```

**For Hugo theme customization**:
- File: `themes/hextra/layouts/partials/opengraph.html`
- Override in `layouts/partials/opengraph.html` (create custom version)
- Modify title/description fallback logic

---

## Key Commands

### NPM Scripts (from `package.json`)

```bash
# Development
pnpm run dev              # Start Hugo + Tailwind dev servers
pnpm run dev:hugo         # Hugo serve only
pnpm run dev:tailwind     # Tailwind watch only

# Content Management
pnpm run import:notion    # Fetch content from Notion
pnpm run update:founders-handbook  # Regenerate sidebar config

# Building
cd startup-finance && pnpm run build  # Build Next.js submodule
hugo                      # Build Hugo site
```

### Shell Scripts

```bash
# Full content update
./scripts/pull-latest.sh

# Individual steps
./scripts/import-notion.sh
./scripts/content-copy.sh
./scripts/build.sh
```

### Manual Build Commands

```bash
# Build everything
pnpm run import:notion
./scripts/content-copy.sh
pnpm run update:founders-handbook
hugo

# Or use the build script
./scripts/build.sh
```

---

## Content Flow Examples

### Static Template (Blog Post)

```
/template/content/blog/quit-by-christmas-2025.md
  ↓ (rsync via content-copy.sh)
/content/blog/quit-by-christmas-2025.md
  ↓ (Hugo build)
/public/blog/quit-by-christmas-2025/index.html
  ↓ (og:title comes from frontmatter.title)
<meta property="og:title" content="Quit by Christmas Program" />
```

### Notion Content (Handbook Page)

```
Notion Database (159829231d098087b96fd112a91c7430)
  ↓ (import-notion.sh: notion-to-md + custom renderer)
/content/docs/founders-handbook/[page-slug].md
  with auto-generated frontmatter:
    title: [from Notion Title property]
    notionId: [Notion page ID]
    Category: [from Notion Select property]
    weight: [from Notion Number property]
    authors: [mapped from Notion Person property]
  ↓ (update-founders-handbook.ts)
/data/foundersHandbook.yaml (sidebar config)
  ↓ (Hugo + Hextra theme)
/public/docs/founders-handbook/[page-slug]/index.html
  ↓ (og:title from .Title)
<meta property="og:title" content="[Page Title]" />
```

---

## Important Notes for AI Agents

### Content Modification Guidelines

1. **DO NOT directly edit files in `/content/`** - They are auto-generated
   - Exception: Files that exist in `/template/content/` can be edited there

2. **To modify Notion content**:
   - Change it in the Notion database
   - Run `pnpm run import:notion` to sync
   - Or edit the extraction logic in `scripts/notion/src/markdown.ts`

3. **To modify static content**:
   - Edit files in `/template/content/`
   - Run `./scripts/content-copy.sh` to copy to `/content/`

4. **To add new frontmatter fields from Notion**:
   - Add the property in Notion database
   - The exporter will automatically include it in frontmatter
   - Or add custom extraction logic in `markdown.ts` if needed

### Debugging OG Metadata Issues

1. **Check generated HTML**:
   ```bash
   hugo
   grep 'og:title' public/blog/[post-name]/index.html
   ```

2. **Verify frontmatter**:
   ```bash
   head -20 content/blog/[post-name].md
   ```

3. **Test with social media debuggers**:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

4. **Clear caches**:
   - Social platforms cache OG data aggressively
   - Use "Scrape Again" or "Fetch new scrape information" buttons
   - May take 24-48 hours for changes to propagate

### Deployment

Production deployments happen via:
1. **Hourly cron** (`.github/workflows/pull-latest-push-and-deploy.yaml`):
   - Syncs Notion content
   - Commits changes if any
   - Triggers Cloudflare Pages deploy

2. **Push to main** (`.github/workflows/deploy.yaml`):
   - Runs build
   - Deploys to Cloudflare Pages

Local changes pushed to main will be deployed automatically.

---

## System Characteristics

This is a **hybrid static + dynamic content system**:
- **Notion serves as a CMS** for structured content (Founders Handbook, Portfolio data)
- **Static templates** in `/template/` override or supplement Notion content
- **Custom Notion tooling** (`notion-to-md` + CustomRenderer) transforms content intelligently
- **Hugo/Hextra theme** provides the presentation layer
- **Automatic deployment** via GitHub Actions every hour or on push
- **Cloudflare Pages** hosts the final static site

The system is designed for **low maintenance** with automatic Notion syncing while preserving the ability to hand-craft special content like blog posts and landing pages.
