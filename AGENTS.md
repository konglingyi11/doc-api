# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress documentation site for API Key and Base URL configuration guides across various AI coding tools. The site is deployed to a self-hosted server via GitHub Actions CI/CD.

## Development Commands

### Local Development
```bash
npm run docs:dev      # Start development server with hot reload
npm run docs:build    # Build production site to docs/.vitepress/dist
npm run docs:preview  # Preview production build locally
```

### Dependencies
```bash
npm ci                # Clean install (use in CI/CD)
npm install           # Install dependencies
```

## Architecture

### VitePress Configuration
- **Config file**: `docs/.vitepress/config.ts`
- **Version injection**: Version number is read from `npm_package_version` environment variable during build
- **Footer**: Displays version number on every page

### Content Structure
- `docs/` - All markdown content files
- `docs/guide/` - General guides (API Key, Base URL, principles, FAQ)
- `docs/tools/` - Tool-specific configuration guides (Codex, Codex, Cline, etc.)
- `docs/public/` - Static assets (images, logos)

### Build Output
- `docs/.vitepress/dist/` - Production build output
- `docs/.vitepress/cache/` - Build cache (gitignored)

## CI/CD Pipeline

### Workflow File
`.github/workflows/deploy.yml` handles automated deployment:

1. **Version Management**: Auto-increments patch version (v1.0.0 → v1.0.1) from Git tags
2. **Build Process**: Updates package.json version, builds VitePress site
3. **Deployment**: SSH to server, backs up current version, deploys new build
4. **Backup Strategy**: Keeps last 10 backups in `/opt/1panel/www/sites/doc.api.1010101.asia/backups/`

### Deployment Target
- **Server**: 1010101.asia
- **User**: cicd (dedicated deployment user)
- **Deploy Directory**: `/opt/1panel/www/sites/doc.api.1010101.asia/index`
- **Trigger**: Push to master branch or manual workflow dispatch

### Required GitHub Secrets
- `SERVER_HOST` - Server domain/IP
- `SERVER_USER` - SSH username (cicd)
- `SERVER_SSH_KEY` - Private key for authentication
- `SERVER_PORT` - SSH port (default: 22)

## Version Number System

- **Format**: Semantic versioning (v1.0.0)
- **Auto-increment**: Patch version (third digit) increments on each deployment
- **Manual override**: Can specify custom version via workflow dispatch
- **Display**: Shown in page footer and stored in VERSION.txt on server

## Important Files

- `docs/.vitepress/config.ts` - VitePress configuration with version injection
- `.github/workflows/deploy.yml` - CI/CD pipeline configuration
- `scripts/setup-server.sh` - Server initialization script
- `scripts/rollback.sh` - Interactive rollback tool
- `scripts/push-all.sh` - Push to both Gitee and GitHub remotes

## Remote Repositories

This project uses dual remotes:
- `origin` → Gitee (https://gitee.com/kongling11/doc-api.git)
- `github` → GitHub (https://github.com/konglingyi11/doc-api.git)

Use `bash scripts/push-all.sh` to push to both remotes simultaneously.

## Codex Workflow

- After making repository changes, run the relevant verification command before completion. For docs changes, use `npm run docs:build`.
- If verification passes, commit the changes and push to both remotes automatically.
- Prefer `bash scripts/push-all.sh` for dual-remote pushes. If the script hangs or times out, push directly with `git push origin master` and `git push github master`.
- Do not leave verified changes uncommitted or unpushed unless the user explicitly asks to stop before commit or push.

## Deployment Workflow

1. Code pushed to GitHub master branch
2. GitHub Actions builds the site
3. SSH connection to server using cicd user
4. Current deployment backed up
5. New build deployed to `/opt/1panel/www/sites/doc.api.1010101.asia/index`
6. Version info saved to VERSION.txt
7. Git tag created (if manual version specified)

## Rollback Process

Run `scripts/rollback.sh` on the server to interactively select and restore a previous backup.
