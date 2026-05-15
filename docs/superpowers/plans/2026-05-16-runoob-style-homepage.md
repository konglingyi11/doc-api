# Runoob-Style Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the VitePress default homepage hero with a simple tutorial-directory homepage inspired by runoob.com.

**Architecture:** The homepage becomes normal Markdown with a few scoped HTML classes. The theme imports one CSS file for homepage-only layout styles. Existing routes, sidebars, docs content, API examples, and Vue component logic stay unchanged.

**Tech Stack:** VitePress, Markdown, plain CSS, existing VitePress default theme.

---

## File Map

- Modify: `docs/index.md` - homepage content and directory links.
- Modify: `docs/.vitepress/theme/index.js` - import homepage CSS.
- Create: `docs/.vitepress/theme/style.css` - homepage-only layout and card styles.
- Optional Modify: `docs/.vitepress/config.ts` - only if the site description needs a small wording update.

Do not modify:

- `docs/guide/*.md`
- `docs/tools/*.md`
- `docs/.vitepress/theme/components/Image2Playground.vue`
- Sidebar structure
- Existing route paths
- API examples

---

### Task 1: Replace Homepage Content

**Files:**
- Modify: `docs/index.md`

- [ ] **Step 1: Read current homepage**

Run:

```powershell
Get-Content -Raw docs\index.md
```

Expected: the current file uses `layout: home` and VitePress hero/frontmatter.

- [ ] **Step 2: Replace homepage with Markdown directory layout**

Edit `docs/index.md` so it no longer uses `layout: home`.

Use this content:

```md
# 途联通证配置教程

常见 AI 编程工具的 API Key、Base URL 和模型配置教程。

<div class="home-intro">
  <p>先选工具，再按教程填写。配不通时，先看通用教程和配置排查。</p>
</div>

## 工具配置

<div class="home-grid home-grid-tools">
  <a class="home-card" href="/tools/claude-code">
    <strong>Claude Code</strong>
    <span>Claude 接口和 CC Switch 配置</span>
  </a>
  <a class="home-card" href="/tools/codex">
    <strong>Codex</strong>
    <span>OpenAI Responses 接口和 /v1 配置</span>
  </a>
  <a class="home-card" href="/tools/open-code">
    <strong>OpenCode</strong>
    <span>/connect 流程和 provider 写法</span>
  </a>
  <a class="home-card" href="/tools/cline">
    <strong>Cline</strong>
    <span>Provider 类型和 Base URL</span>
  </a>
  <a class="home-card" href="/tools/cherry-studio">
    <strong>Cherry Studio</strong>
    <span>Provider、接口地址和模型名称</span>
  </a>
  <a class="home-card" href="/tools/continue">
    <strong>Continue</strong>
    <span>配置文件结构和 provider 类型</span>
  </a>
  <a class="home-card" href="/tools/roo-code">
    <strong>Roo Code</strong>
    <span>OpenAI Compatible Provider</span>
  </a>
  <a class="home-card" href="/tools/cursor">
    <strong>Cursor</strong>
    <span>BYOK 设置和自定义接口支持情况</span>
  </a>
  <a class="home-card" href="/tools/windsurf">
    <strong>Windsurf</strong>
    <span>API Key 入口和 BYOK 限制</span>
  </a>
</div>

## 通用教程

<div class="home-grid">
  <a class="home-card" href="/guide/api-key">
    <strong>什么是 API Key</strong>
    <span>密钥填写位置和 401 排查</span>
  </a>
  <a class="home-card" href="/guide/base-url">
    <strong>什么是 Base URL</strong>
    <span>接口地址和 /v1 规则</span>
  </a>
  <a class="home-card" href="/guide/common-principles">
    <strong>通用配置原则</strong>
    <span>接口格式、模型名称和填写顺序</span>
  </a>
  <a class="home-card" href="/guide/verify">
    <strong>如何验证配置</strong>
    <span>保存后发真实请求测试</span>
  </a>
  <a class="home-card" href="/guide/faq">
    <strong>常见问题</strong>
    <span>401、404、模型不存在和 Provider 错误</span>
  </a>
</div>

## 图片接口

<div class="home-grid home-grid-single">
  <a class="home-card" href="/guide/image2">
    <strong>image2 图片接口教程</strong>
    <span>生成图片、编辑图片和在线试用</span>
  </a>
</div>

## 配置排查

<div class="home-grid">
  <a class="home-card" href="/guide/api-key#常见错误">
    <strong>API Key 401</strong>
    <span>检查 Key 是否完整、有效、有权限</span>
  </a>
  <a class="home-card" href="/guide/base-url#常见错误">
    <strong>Base URL /v1</strong>
    <span>检查 /v1 是否多写或少写</span>
  </a>
  <a class="home-card" href="/guide/verify#失败后看报错">
    <strong>模型不存在</strong>
    <span>检查模型名、权限和服务商支持情况</span>
  </a>
  <a class="home-card" href="/guide/faq#provider-应该选哪个">
    <strong>Provider 选错</strong>
    <span>按工具页选择对应接口格式</span>
  </a>
</div>
```

- [ ] **Step 3: Build after Markdown change**

Run:

```powershell
npm run docs:build
```

Expected: VitePress build completes successfully.

- [ ] **Step 4: Commit homepage content**

Run:

```powershell
git add docs\index.md
git commit -m "docs: rebuild homepage as tutorial directory"
```

Expected: commit succeeds.

---

### Task 2: Add Homepage Styles

**Files:**
- Modify: `docs/.vitepress/theme/index.js`
- Create: `docs/.vitepress/theme/style.css`

- [ ] **Step 1: Read current theme entry**

Run:

```powershell
Get-Content -Raw docs\.vitepress\theme\index.js
```

Expected:

```js
import DefaultTheme from 'vitepress/theme'

export default DefaultTheme
```

- [ ] **Step 2: Import the new stylesheet**

Update `docs/.vitepress/theme/index.js` to:

```js
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default DefaultTheme
```

- [ ] **Step 3: Create homepage CSS**

Create `docs/.vitepress/theme/style.css` with:

```css
:root {
  --home-card-border: #e5e7eb;
  --home-card-bg: #ffffff;
  --home-card-muted: #5f6b7a;
  --home-card-hover: #f6f8fa;
}

.VPDoc.has-aside .content-container,
.VPDoc:not(.has-aside) .content-container {
  max-width: 1080px;
}

.vp-doc > h1:first-child {
  margin-top: 0;
  font-size: 32px;
  line-height: 1.25;
}

.home-intro {
  margin: 12px 0 28px;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

.home-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 16px 0 32px;
}

.home-grid-tools {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-grid-single {
  grid-template-columns: minmax(0, 1fr);
}

.home-card {
  display: block;
  min-height: 92px;
  padding: 16px;
  border: 1px solid var(--home-card-border);
  border-radius: 6px;
  background: var(--home-card-bg);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
}

.home-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--home-card-hover);
  transform: translateY(-1px);
  text-decoration: none;
}

.home-card strong {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.4;
}

.home-card span {
  display: block;
  margin-top: 8px;
  color: var(--home-card-muted);
  font-size: 14px;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .home-grid,
  .home-grid-tools {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .vp-doc > h1:first-child {
    font-size: 28px;
  }

  .home-grid,
  .home-grid-tools,
  .home-grid-single {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-card {
    min-height: 0;
  }
}
```

- [ ] **Step 4: Build after style change**

Run:

```powershell
npm run docs:build
```

Expected: VitePress build completes successfully.

- [ ] **Step 5: Commit style change**

Run:

```powershell
git add docs\.vitepress\theme\index.js docs\.vitepress\theme\style.css
git commit -m "docs: style homepage directory"
```

Expected: commit succeeds.

---

### Task 3: Final Homepage Audit

**Files:**
- Check: `docs/index.md`
- Check: `docs/.vitepress/theme/index.js`
- Check: `docs/.vitepress/theme/style.css`

- [ ] **Step 1: Check homepage links**

Run:

```powershell
@(
  'docs/tools/claude-code.md',
  'docs/tools/codex.md',
  'docs/tools/open-code.md',
  'docs/tools/cline.md',
  'docs/tools/cherry-studio.md',
  'docs/tools/continue.md',
  'docs/tools/roo-code.md',
  'docs/tools/cursor.md',
  'docs/tools/windsurf.md',
  'docs/guide/api-key.md',
  'docs/guide/base-url.md',
  'docs/guide/common-principles.md',
  'docs/guide/verify.md',
  'docs/guide/faq.md',
  'docs/guide/image2.md'
) | ForEach-Object {
  if (-not (Test-Path $_)) { throw "Missing route target: $_" }
}
```

Expected: no error.

- [ ] **Step 2: Search banned homepage wording**

Run:

```powershell
rg -n "赋能|闭环|方案|体系|场景化|营销|大标题" docs\index.md docs\.vitepress\theme\style.css
```

Expected: no hits.

- [ ] **Step 3: Run final build**

Run:

```powershell
npm run docs:build
```

Expected: VitePress build completes successfully.

- [ ] **Step 4: Check git status**

Run:

```powershell
git status --short
```

Expected: clean.

- [ ] **Step 5: Push to both remotes**

Run:

```powershell
git push origin master
git push github master
```

Expected: both pushes succeed.
