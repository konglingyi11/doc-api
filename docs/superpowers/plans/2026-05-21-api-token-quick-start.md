# API Token Quick Start Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the token creation guide into quick start and rename it as the general API token setup flow for all tools.

**Architecture:** Use one moved Markdown page, update VitePress sidebar/homepage links, and update internal references from `/tools/claude-token` to `/start/api-token`.

**Tech Stack:** VitePress, Markdown, TypeScript config, npm build scripts.

---

### Task 1: Move And Rewrite The Token Page

**Files:**

- Move: `docs/tools/claude-token.md` -> `docs/start/api-token.md`

- [ ] Move the file with `git mv`.
- [ ] Rewrite the title to `# 创建 API 令牌`.
- [ ] Rewrite the intro as a general prerequisite for all tools.
- [ ] Keep the Claude/CC Switch multi-token guidance in a dedicated section.

### Task 2: Update Navigation And Homepage

**Files:**

- Modify: `docs/.vitepress/config.ts`
- Modify: `docs/index.md`

- [ ] Add `创建 API 令牌` to the `/start/` sidebar after `通用配置原则`.
- [ ] Remove `Claude 分组令牌` from the `/tools/` sidebar.
- [ ] Move the homepage card from `工具配置` to `快速开始`.
- [ ] Point the homepage card to `/start/api-token.html`.

### Task 3: Update Internal References

**Files:**

- Modify: `docs/tools/claude-code.md`
- Modify: `docs/tools/cc-switch.md`
- Check: all `docs/**/*.md`

- [ ] Replace `/tools/claude-token` with `/start/api-token`.
- [ ] Use visible text `创建 API 令牌` for general prerequisite links.
- [ ] Keep Claude-specific wording where the sentence discusses multiple Claude group tokens.
- [ ] Confirm no `/tools/claude-token` references remain.

### Task 4: Verify, Commit, And Push

**Files:**

- Verify: all changed files.

- [ ] Run `npm run docs:build`.
- [ ] Confirm no stale `/tools/claude-token` links with `rg -n "claude-token|Claude 分组令牌" docs`.
- [ ] Commit with `docs: move token setup to quick start`.
- [ ] Push to `origin master` and `github master`.

## Self-Review

- Spec coverage: page move, rename, navigation, homepage, links, and build verification are covered.
- Placeholder scan: no placeholders remain.
- Scope: this does not create redirects or unrelated account categories.
