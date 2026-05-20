# Task-Based Documentation Classification Design

## Purpose

The documentation site should help users complete one task: configure an AI coding tool with the correct API Key, Base URL, model, and provider settings. The current structure separates general guides and tool guides, but users still need to infer the order of reading and where to go when a configuration fails.

This redesign organizes the site by user task:

1. Learn the required concepts.
2. Configure a specific tool.
3. Use an additional API capability.
4. Troubleshoot failures.

The redesign intentionally changes page paths and does not preserve old URLs.

## Scope

This spec covers:

- Top-level documentation categories.
- File path migration.
- VitePress top navigation.
- Sidebar structure.
- Homepage grouping.
- Required internal link updates.
- Verification requirements.

This spec does not cover:

- Rewriting the body content of each guide.
- Adding new product features.
- Creating redirect pages for old paths.
- Changing CI/CD or deployment behavior.

## Information Architecture

Use four top-level content areas under `docs/`.

```text
docs/
  start/
  tools/
  capabilities/
  troubleshooting/
```

### Quick Start

Directory: `docs/start/`

Purpose: Explain the concepts and minimal process users need before opening a tool-specific guide.

Pages:

- `api-key.md`
- `base-url.md`
- `common-principles.md`
- `verify.md`

Recommended reading order:

1. `common-principles.md`
2. `api-key.md`
3. `base-url.md`
4. `verify.md`

### Tool Configuration

Directory: `docs/tools/`

Purpose: Keep all tool-specific setup guides in one stable location.

Pages remain in place:

- `claude-code.md`
- `claude-token.md`
- `cc-switch.md`
- `codex.md`
- `open-code.md`
- `openclaw.md`
- `hermes.md`
- `cline.md`
- `cherry-studio.md`
- `continue.md`
- `roo-code.md`
- `cursor.md`
- `windsurf.md`

The files stay under `docs/tools/` because these pages share one purpose and one content pattern. Subdirectories are unnecessary for the current site size; grouping is handled in the sidebar.

### Capabilities

Directory: `docs/capabilities/`

Purpose: Hold API capability guides that are not tied to one coding tool.

Pages:

- `image2.md`

This category can later hold other independent API capabilities, such as embeddings, audio, or model listing, if the site expands.

### Troubleshooting

Directory: `docs/troubleshooting/`

Purpose: Give users one obvious place to go after a saved configuration fails.

Pages:

- `faq.md`

The first implementation keeps troubleshooting as one FAQ page. If it grows, future pages can split by error class, for example `401.md`, `404.md`, `model-not-found.md`, and `provider.md`.

## File Migration

Move these files:

```text
docs/guide/api-key.md             -> docs/start/api-key.md
docs/guide/base-url.md            -> docs/start/base-url.md
docs/guide/common-principles.md   -> docs/start/common-principles.md
docs/guide/verify.md              -> docs/start/verify.md
docs/guide/image2.md              -> docs/capabilities/image2.md
docs/guide/faq.md                 -> docs/troubleshooting/faq.md
```

Keep these files in place:

```text
docs/tools/*.md
```

Remove `docs/guide/` after migration if it is empty.

## Top Navigation

Update `docs/.vitepress/config.ts` navigation to:

```text
首页       -> /
快速开始   -> /start/common-principles
工具配置   -> /tools/claude-code
能力接口   -> /capabilities/image2
故障排查   -> /troubleshooting/faq
控制台     -> https://api.1010101.asia
```

Use `控制台` for the external service entry. It should appear as a normal top-level navigation item and open the external URL directly.

## Sidebar Design

### `/start/`

Group title: `快速开始`

Items:

- `通用配置原则` -> `/start/common-principles`
- `什么是 API Key` -> `/start/api-key`
- `什么是 Base URL` -> `/start/base-url`
- `如何验证配置是否生效` -> `/start/verify`

### `/tools/`

Group title: `推荐路径`

- `Claude Code` -> `/tools/claude-code`
- `Claude 分组令牌` -> `/tools/claude-token`
- `CC Switch` -> `/tools/cc-switch`

Group title: `命令行工具`

- `Codex` -> `/tools/codex`
- `OpenCode` -> `/tools/open-code`
- `OpenClaw` -> `/tools/openclaw`
- `Hermes` -> `/tools/hermes`

Group title: `IDE 与编辑器插件`

- `Cline` -> `/tools/cline`
- `Continue` -> `/tools/continue`
- `Roo Code` -> `/tools/roo-code`
- `Cursor` -> `/tools/cursor`
- `Windsurf` -> `/tools/windsurf`

Group title: `桌面客户端`

- `Cherry Studio` -> `/tools/cherry-studio`

### `/capabilities/`

Group title: `能力接口`

- `image2 图片接口` -> `/capabilities/image2`

### `/troubleshooting/`

Group title: `故障排查`

- `常见问题` -> `/troubleshooting/faq`

## Homepage Design

Update `docs/index.md` to match the task-based structure.

Recommended section order:

1. `快速开始`
2. `工具配置`
3. `能力接口`
4. `故障排查`

### Quick Start Cards

- `通用配置原则` -> `/start/common-principles.html`
- `什么是 API Key` -> `/start/api-key.html`
- `什么是 Base URL` -> `/start/base-url.html`
- `如何验证配置` -> `/start/verify.html`

### Tool Configuration Cards

Keep all existing tool cards, but preserve the sidebar grouping order:

1. Claude Code
2. Claude 分组令牌
3. CC Switch
4. Codex
5. OpenCode
6. OpenClaw
7. Hermes
8. Cline
9. Continue
10. Roo Code
11. Cursor
12. Windsurf
13. Cherry Studio

### Capabilities Cards

- `image2 图片接口教程` -> `/capabilities/image2.html`

### Troubleshooting Cards

- `常见问题` -> `/troubleshooting/faq.html`
- `API Key 401` -> `/start/api-key.html#常见错误`
- `Base URL /v1` -> `/start/base-url.html#常见错误`
- `模型不存在` -> `/start/verify.html#失败后看报错`
- `Provider 选错` -> `/troubleshooting/faq.html#provider-应该选哪个`

## Internal Link Updates

All internal links must be updated from old `guide` paths to the new paths.

Required replacements:

```text
/guide/api-key              -> /start/api-key
/guide/base-url             -> /start/base-url
/guide/common-principles    -> /start/common-principles
/guide/verify               -> /start/verify
/guide/image2               -> /capabilities/image2
/guide/faq                  -> /troubleshooting/faq
```

Apply the same replacement to `.html` links and hash links.

Examples:

```text
/guide/api-key.html#常见错误
-> /start/api-key.html#常见错误

/guide/faq.html#provider-应该选哪个
-> /troubleshooting/faq.html#provider-应该选哪个
```

## Implementation Notes

- Prefer `git mv` or equivalent file moves so history remains readable.
- Update only site structure and links in the first implementation pass.
- Do not rewrite page body copy unless a link or category label becomes inaccurate.
- Do not add redirects, because the selected migration strategy is direct movement without preserving old paths.
- After moving files, search for `guide/` and `/guide/` to catch stale links and config entries.

## Verification

Run:

```bash
npm run docs:build
```

The build must pass without broken VitePress imports, missing page links in config, or markdown syntax errors.

Manual review checklist:

- Top navigation contains `控制台` linking to `https://api.1010101.asia`.
- Homepage cards link to the new paths.
- Sidebar appears for all four new sections.
- No visible navigation links point to `/guide/`.
- Tool pages still render under `/tools/`.

## Acceptance Criteria

- The old `docs/guide/` content has been moved into `start/`, `capabilities/`, and `troubleshooting/`.
- `docs/.vitepress/config.ts` uses the new navigation and sidebars.
- `docs/index.md` follows the task-based homepage order.
- All site-owned links point to the new locations.
- No redirect or compatibility pages are added for old guide URLs.
- `npm run docs:build` passes.
