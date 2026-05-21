# Task-Based Classification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the VitePress documentation site around user tasks: quick start, tool configuration, capabilities, and troubleshooting.

**Architecture:** Move general guide pages into task-based directories, keep tool guides in `docs/tools/`, and update VitePress navigation, sidebars, homepage cards, and internal links to the new paths. Do not create redirect pages for old URLs.

**Tech Stack:** VitePress 1.6.4, TypeScript config in `docs/.vitepress/config.ts`, Markdown content under `docs/`, npm scripts from `package.json`.

---

## File Structure

Create these directories if they do not already exist:

- `docs/start/`
- `docs/capabilities/`
- `docs/troubleshooting/`

Move these files:

- `docs/guide/api-key.md` -> `docs/start/api-key.md`
- `docs/guide/base-url.md` -> `docs/start/base-url.md`
- `docs/guide/common-principles.md` -> `docs/start/common-principles.md`
- `docs/guide/verify.md` -> `docs/start/verify.md`
- `docs/guide/image2.md` -> `docs/capabilities/image2.md`
- `docs/guide/faq.md` -> `docs/troubleshooting/faq.md`

Modify these files:

- `docs/.vitepress/config.ts` for top navigation and sidebars.
- `docs/index.md` for homepage sections and links.
- Any moved or existing Markdown file that still links to `/guide/`.

Remove this directory after the move if empty:

- `docs/guide/`

---

### Task 1: Move Content Files Into Task-Based Directories

**Files:**

- Move: `docs/guide/api-key.md` -> `docs/start/api-key.md`
- Move: `docs/guide/base-url.md` -> `docs/start/base-url.md`
- Move: `docs/guide/common-principles.md` -> `docs/start/common-principles.md`
- Move: `docs/guide/verify.md` -> `docs/start/verify.md`
- Move: `docs/guide/image2.md` -> `docs/capabilities/image2.md`
- Move: `docs/guide/faq.md` -> `docs/troubleshooting/faq.md`
- Remove if empty: `docs/guide/`

- [ ] **Step 1: Confirm the source files exist**

Run:

```powershell
Test-Path -LiteralPath 'docs\guide\api-key.md'
Test-Path -LiteralPath 'docs\guide\base-url.md'
Test-Path -LiteralPath 'docs\guide\common-principles.md'
Test-Path -LiteralPath 'docs\guide\verify.md'
Test-Path -LiteralPath 'docs\guide\image2.md'
Test-Path -LiteralPath 'docs\guide\faq.md'
```

Expected: each command prints `True`.

- [ ] **Step 2: Create destination directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'docs\start','docs\capabilities','docs\troubleshooting'
```

Expected: PowerShell prints directory objects for the created or existing directories.

- [ ] **Step 3: Move files with Git history**

Run:

```powershell
git mv 'docs/guide/api-key.md' 'docs/start/api-key.md'
git mv 'docs/guide/base-url.md' 'docs/start/base-url.md'
git mv 'docs/guide/common-principles.md' 'docs/start/common-principles.md'
git mv 'docs/guide/verify.md' 'docs/start/verify.md'
git mv 'docs/guide/image2.md' 'docs/capabilities/image2.md'
git mv 'docs/guide/faq.md' 'docs/troubleshooting/faq.md'
```

Expected: no output and exit code `0`.

- [ ] **Step 4: Remove the empty old directory**

Run:

```powershell
if ((Test-Path -LiteralPath 'docs\guide') -and -not (Get-ChildItem -LiteralPath 'docs\guide' -Force)) {
  Remove-Item -LiteralPath 'docs\guide'
}
```

Expected: no output if `docs/guide/` is empty and removed.

- [ ] **Step 5: Check moved file status**

Run:

```powershell
git status --short
```

Expected output includes rename entries for the six moved files.

---

### Task 2: Update VitePress Navigation And Sidebars

**Files:**

- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: Replace the `nav` array**

In `docs/.vitepress/config.ts`, replace the existing `nav` array with:

```ts
nav: [
  { text: '首页', link: '/' },
  { text: '快速开始', link: '/start/common-principles' },
  { text: '工具配置', link: '/tools/claude-code' },
  { text: '能力接口', link: '/capabilities/image2' },
  { text: '故障排查', link: '/troubleshooting/faq' },
  { text: '控制台', link: 'https://api.1010101.asia' }
],
```

Expected: the top navigation contains the external `控制台` link.

- [ ] **Step 2: Replace the `sidebar` object**

In `docs/.vitepress/config.ts`, replace the existing `sidebar` object with:

```ts
sidebar: {
  '/start/': [
    {
      text: '快速开始',
      items: [
        { text: '通用配置原则', link: '/start/common-principles' },
        { text: '什么是 API Key', link: '/start/api-key' },
        { text: '什么是 Base URL', link: '/start/base-url' },
        { text: '如何验证配置是否生效', link: '/start/verify' }
      ]
    }
  ],
  '/tools/': [
    {
      text: '推荐路径',
      items: [
        { text: 'Claude Code', link: '/tools/claude-code' },
        { text: 'Claude 分组令牌', link: '/tools/claude-token' },
        { text: 'CC Switch', link: '/tools/cc-switch' }
      ]
    },
    {
      text: '命令行工具',
      items: [
        { text: 'Codex', link: '/tools/codex' },
        { text: 'OpenCode', link: '/tools/open-code' },
        { text: 'OpenClaw', link: '/tools/openclaw' },
        { text: 'Hermes', link: '/tools/hermes' }
      ]
    },
    {
      text: 'IDE 与编辑器插件',
      items: [
        { text: 'Cline', link: '/tools/cline' },
        { text: 'Continue', link: '/tools/continue' },
        { text: 'Roo Code', link: '/tools/roo-code' },
        { text: 'Cursor', link: '/tools/cursor' },
        { text: 'Windsurf', link: '/tools/windsurf' }
      ]
    },
    {
      text: '桌面客户端',
      items: [
        { text: 'Cherry Studio', link: '/tools/cherry-studio' }
      ]
    }
  ],
  '/capabilities/': [
    {
      text: '能力接口',
      items: [
        { text: 'image2 图片接口', link: '/capabilities/image2' }
      ]
    }
  ],
  '/troubleshooting/': [
    {
      text: '故障排查',
      items: [
        { text: '常见问题', link: '/troubleshooting/faq' }
      ]
    }
  ]
},
```

Expected: no `/guide/` links remain in VitePress navigation or sidebar config.

- [ ] **Step 3: Check config for old guide links**

Run:

```powershell
rg -n "/guide/" docs\.vitepress\config.ts
```

Expected: no matches and exit code `1`.

---

### Task 3: Update The Homepage To Match The New Task Flow

**Files:**

- Modify: `docs/index.md`

- [ ] **Step 1: Replace the homepage body below the frontmatter**

Keep the frontmatter:

```markdown
---
pageClass: home-page
---
```

Replace the remaining body in `docs/index.md` with:

```markdown
# 途联通证配置教程

常见 AI 编程工具的 API Key、Base URL、模型和能力接口配置教程。

<div class="home-intro">
  <p>先看快速开始，再选工具配置。配不通时，进入故障排查定位 API Key、Base URL、模型或 Provider 问题。</p>
</div>

## 快速开始

<div class="home-grid">
  <a class="home-card" href="/start/common-principles.html">
    <strong>通用配置原则</strong>
    <span>接口格式、模型名称和填写顺序</span>
  </a>
  <a class="home-card" href="/start/api-key.html">
    <strong>什么是 API Key</strong>
    <span>密钥填写位置和 401 排查</span>
  </a>
  <a class="home-card" href="/start/base-url.html">
    <strong>什么是 Base URL</strong>
    <span>接口地址和 /v1 规则</span>
  </a>
  <a class="home-card" href="/start/verify.html">
    <strong>如何验证配置</strong>
    <span>保存后发真实请求测试</span>
  </a>
</div>

## 工具配置

<div class="home-grid home-grid-tools">
  <a class="home-card" href="/tools/claude-code.html">
    <strong>Claude Code</strong>
    <span>Claude Code 安装和配置入口</span>
  </a>
  <a class="home-card" href="/tools/claude-token.html">
    <strong>Claude 分组令牌</strong>
    <span>创建多个 Claude 令牌分组</span>
  </a>
  <a class="home-card" href="/tools/cc-switch.html">
    <strong>CC Switch</strong>
    <span>本地路由、导入和故障转移</span>
  </a>
  <a class="home-card" href="/tools/codex.html">
    <strong>Codex</strong>
    <span>OpenAI Responses 接口和 /v1 配置</span>
  </a>
  <a class="home-card" href="/tools/open-code.html">
    <strong>OpenCode</strong>
    <span>/connect 流程和 provider 写法</span>
  </a>
  <a class="home-card" href="/tools/openclaw.html">
    <strong>OpenClaw</strong>
    <span>openclaw.json 和 OpenAI 兼容接口</span>
  </a>
  <a class="home-card" href="/tools/hermes.html">
    <strong>Hermes</strong>
    <span>hermes model 和自定义端点</span>
  </a>
  <a class="home-card" href="/tools/cline.html">
    <strong>Cline</strong>
    <span>Provider 类型和 Base URL</span>
  </a>
  <a class="home-card" href="/tools/continue.html">
    <strong>Continue</strong>
    <span>配置文件结构和 provider 类型</span>
  </a>
  <a class="home-card" href="/tools/roo-code.html">
    <strong>Roo Code</strong>
    <span>OpenAI Compatible Provider</span>
  </a>
  <a class="home-card" href="/tools/cursor.html">
    <strong>Cursor</strong>
    <span>BYOK 设置和自定义接口支持情况</span>
  </a>
  <a class="home-card" href="/tools/windsurf.html">
    <strong>Windsurf</strong>
    <span>API Key 入口和 BYOK 限制</span>
  </a>
  <a class="home-card" href="/tools/cherry-studio.html">
    <strong>Cherry Studio</strong>
    <span>Provider、接口地址和模型名称</span>
  </a>
</div>

## 能力接口

<div class="home-grid home-grid-single">
  <a class="home-card" href="/capabilities/image2.html">
    <strong>image2 图片接口教程</strong>
    <span>生成图片、编辑图片和在线试用</span>
  </a>
</div>

## 故障排查

<div class="home-grid">
  <a class="home-card" href="/troubleshooting/faq.html">
    <strong>常见问题</strong>
    <span>401、404、模型不存在和 Provider 错误</span>
  </a>
  <a class="home-card" href="/start/api-key.html#常见错误">
    <strong>API Key 401</strong>
    <span>检查 Key 是否完整、有效、有权限</span>
  </a>
  <a class="home-card" href="/start/base-url.html#常见错误">
    <strong>Base URL /v1</strong>
    <span>检查 /v1 是否多写或少写</span>
  </a>
  <a class="home-card" href="/start/verify.html#失败后看报错">
    <strong>模型不存在</strong>
    <span>检查模型名、权限和服务商支持情况</span>
  </a>
  <a class="home-card" href="/troubleshooting/faq.html#provider-应该选哪个">
    <strong>Provider 选错</strong>
    <span>按工具页选择对应接口格式</span>
  </a>
</div>
```

Expected: homepage sections appear in this order: `快速开始`, `工具配置`, `能力接口`, `故障排查`.

- [ ] **Step 2: Check homepage for old guide links**

Run:

```powershell
rg -n "/guide/" docs\index.md
```

Expected: no matches and exit code `1`.

---

### Task 4: Update Internal Markdown Links

**Files:**

- Modify: `docs/start/*.md`
- Modify: `docs/capabilities/*.md`
- Modify: `docs/troubleshooting/*.md`
- Modify: `docs/tools/*.md`

- [ ] **Step 1: Find all old guide references**

Run:

```powershell
rg -n "(/guide/|guide/)" docs
```

Expected before replacement: matches may appear in moved Markdown files or generated plan/spec docs.

- [ ] **Step 2: Replace site-owned old links in Markdown files**

For content files under `docs/start/`, `docs/capabilities/`, `docs/troubleshooting/`, and `docs/tools/`, apply these exact replacements:

```text
/guide/api-key -> /start/api-key
/guide/base-url -> /start/base-url
/guide/common-principles -> /start/common-principles
/guide/verify -> /start/verify
/guide/image2 -> /capabilities/image2
/guide/faq -> /troubleshooting/faq
```

The same replacements apply when the link includes `.html` or a hash.

Examples:

```text
/guide/api-key.html#常见错误 -> /start/api-key.html#常见错误
/guide/faq.html#provider-应该选哪个 -> /troubleshooting/faq.html#provider-应该选哪个
```

Expected: user-facing content no longer points to `/guide/`.

- [ ] **Step 3: Check content files for stale old links**

Run:

```powershell
rg -n "/guide/" docs\start docs\capabilities docs\troubleshooting docs\tools docs\index.md docs\.vitepress\config.ts
```

Expected: no matches and exit code `1`.

- [ ] **Step 4: Check remaining references in planning documents only**

Run:

```powershell
rg -n "/guide/" docs
```

Expected: any remaining matches are only in `docs/superpowers/specs/` or `docs/superpowers/plans/`, where old paths are documented as migration history.

---

### Task 5: Build, Review, Commit, And Push

**Files:**

- Verify: all changed site files.
- Commit: all migration changes.
- Push: `origin master` and `github master`.

- [ ] **Step 1: Run the production build**

Run:

```powershell
npm run docs:build
```

Expected:

```text
build complete
```

The command must exit with code `0`.

- [ ] **Step 2: Confirm the changed file list**

Run:

```powershell
git status --short
```

Expected: moved files, `docs/.vitepress/config.ts`, `docs/index.md`, and any Markdown files with updated links are listed.

- [ ] **Step 3: Inspect the final diff**

Run:

```powershell
git diff -- docs
```

Expected:

- File moves match the planned migration.
- `docs/.vitepress/config.ts` has the new task-based nav and sidebars.
- `docs/index.md` uses the task-based homepage order.
- User-facing links do not point to `/guide/`.

- [ ] **Step 4: Commit the implementation**

Run:

```powershell
git add docs
git commit -m "docs: reorganize content by user task"
```

Expected: a new commit is created on `master`.

- [ ] **Step 5: Push to both remotes**

Run:

```powershell
bash scripts/push-all.sh
```

Expected: both `origin/master` and `github/master` receive the new commit.

If the script times out or one remote fails, run:

```powershell
git push origin master
git push github master
```

Expected: both push commands exit with code `0`.

---

## Self-Review

- Spec coverage: tasks cover directory migration, top navigation, sidebars, homepage grouping, internal link updates, build verification, commit, and dual-remote push.
- Placeholder scan: the plan contains no deferred requirements or ambiguous fill-in steps.
- Type consistency: the route names are consistent across migration, config, homepage, and link replacement steps.
