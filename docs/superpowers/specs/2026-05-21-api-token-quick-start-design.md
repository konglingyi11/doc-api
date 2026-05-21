# API Token Quick Start Design

## Purpose

The current `Claude 分组令牌` page is placed under tool configuration and reads like a Claude-only setup step. That is misleading because every tool that connects to this system needs the same basic token creation flow before it can fill an API Key.

This change makes token creation a quick-start prerequisite instead of a Claude-specific tool page.

## Scope

This spec covers:

- Moving the token setup page from `docs/tools/` to `docs/start/`.
- Renaming the page from `创建 Claude 分组令牌` to `创建 API 令牌`.
- Updating navigation, homepage cards, and internal links.
- Preserving Claude Code and CC Switch as special multi-token examples.

This spec does not cover:

- Creating a new account or console category.
- Changing the control panel URL.
- Rewriting unrelated tool pages.
- Adding redirects for the old `/tools/claude-token` path.

## Content Model

Move:

```text
docs/tools/claude-token.md -> docs/start/api-token.md
```

New page title:

```text
# 创建 API 令牌
```

The page should explain this general flow:

1. Open the token management page.
2. Choose the target group or model provider group.
3. Create a token.
4. Use that token as the API Key in tool configuration.
5. For tools with import flows, use the matching import entry when available.

Claude-specific guidance should move into a subsection:

```text
## Claude Code 和 CC Switch 的多分组用法
```

That section should explain that Claude Code with CC Switch can benefit from 2 to 3 Claude group tokens for failover, but this is not required for every tool.

## Navigation

Add the page under the quick-start sidebar:

```text
快速开始
- 通用配置原则
- 创建 API 令牌
- 什么是 API Key
- 什么是 Base URL
- 如何验证配置是否生效
```

Remove `Claude 分组令牌` from the `/tools/` sidebar.

## Homepage

Move the card from `工具配置` to `快速开始`.

Use:

```text
创建 API 令牌
在控制台创建用于工具接入的 API Key
```

Link:

```text
/start/api-token.html
```

## Internal Links

Replace:

```text
/tools/claude-token -> /start/api-token
```

Update visible link text from `Claude 分组令牌` to `创建 API 令牌` where the link is used as a general prerequisite.

Keep Claude-specific wording in CC Switch contexts where it describes multiple Claude group tokens.

## Verification

Run:

```bash
npm run docs:build
```

The build must pass with no dead links.

## Acceptance Criteria

- The token page lives at `docs/start/api-token.md`.
- The page title is `创建 API 令牌`.
- Quick-start navigation includes `创建 API 令牌`.
- Tool navigation no longer includes `Claude 分组令牌`.
- Homepage quick-start cards include `创建 API 令牌`.
- There are no links to `/tools/claude-token`.
- `npm run docs:build` passes.
