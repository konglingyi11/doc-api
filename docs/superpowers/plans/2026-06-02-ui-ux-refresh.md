# UI/UX Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the VitePress documentation UI so the site reads as a clean, credible configuration manual with precise Chinese copy and consistent tooling-oriented components.

**Architecture:** Keep the existing VitePress default theme and extend it through `docs/.vitepress/theme/style.css`. Update the homepage markup in `docs/index.md` for task-based entry points, and restyle `Image2Playground.vue` without changing its API behavior or localStorage behavior.

**Tech Stack:** VitePress 1.6, Vue 3 single-file component, CSS, Markdown, npm build verification.

---

## File Structure

- Modify `docs/index.md`: replace the current flat card homepage with a structured landing document: hero, configuration checklist, quick start steps, grouped tool index, image2 capability entry, and troubleshooting entries.
- Modify `docs/.vitepress/theme/style.css`: define shared design tokens, homepage layout styles, VitePress content refinements, focus states, responsive behavior, and card patterns.
- Modify `docs/.vitepress/theme/components/Image2Playground.vue`: keep all script logic, update user-facing copy where needed, and replace scoped styles with the same clean tool-oriented visual language.
- Create `docs/superpowers/plans/2026-06-02-ui-ux-refresh.md`: implementation plan for traceability.

## Task 1: Homepage Content Structure

**Files:**
- Modify: `docs/index.md`
- Verify: `npm run docs:build`

- [ ] **Step 1: Replace the homepage markup**

Replace the body of `docs/index.md` after the frontmatter with this structure:

```markdown
# 常见 AI 编程工具接入指南

<div class="home-hero">
  <div class="home-hero-copy">
    <p class="home-eyebrow">API Key / Base URL / 模型名称 / Provider</p>
    <p class="home-summary">按创建令牌、填写 Base URL、选择模型和验证请求的顺序，完成工具配置并定位常见错误。</p>
    <div class="home-actions">
      <a class="home-button home-button-primary" href="/start/api-token.html">开始配置</a>
      <a class="home-button home-button-secondary" href="/troubleshooting/faq.html">查看故障排查</a>
    </div>
  </div>

  <section class="home-checklist" aria-labelledby="home-checklist-title">
    <h2 id="home-checklist-title">配置前检查</h2>
    <ol>
      <li><span>1</span><p>确认 API 令牌已经创建，并完整复制。</p></li>
      <li><span>2</span><p>确认 Base URL 使用服务根地址，不重复填写 <code>/v1</code>。</p></li>
      <li><span>3</span><p>确认 Provider 与工具要求的接口格式一致。</p></li>
      <li><span>4</span><p>保存配置后发起真实请求，用返回错误定位问题。</p></li>
    </ol>
  </section>
</div>
```

Then add the quick start, grouped tool configuration, image2, and troubleshooting sections using the exact card classes already planned:

```markdown
## 快速开始

<div class="home-grid home-grid-steps">
  <a class="home-card home-step-card" href="/start/api-token.html">
    <span class="home-card-label">STEP 01</span>
    <strong>创建 API 令牌</strong>
    <span>在控制台创建用于工具接入的 API Key。</span>
  </a>
  <a class="home-card home-step-card" href="/start/base-url.html">
    <span class="home-card-label">STEP 02</span>
    <strong>确认 Base URL</strong>
    <span>检查接口地址和 <code>/v1</code> 的填写规则。</span>
  </a>
  <a class="home-card home-step-card" href="/start/common-principles.html">
    <span class="home-card-label">STEP 03</span>
    <strong>选择模型和 Provider</strong>
    <span>按工具要求填写模型名称和服务商类型。</span>
  </a>
  <a class="home-card home-step-card" href="/start/verify.html">
    <span class="home-card-label">STEP 04</span>
    <strong>验证配置结果</strong>
    <span>保存后发起请求，确认配置已经生效。</span>
  </a>
</div>
```

- [ ] **Step 2: Preserve all existing navigation targets**

Check that every existing homepage target still exists or remains reachable:

```text
/start/common-principles.html
/start/api-token.html
/start/api-key.html
/start/base-url.html
/start/verify.html
/tools/claude-code.html
/tools/cc-switch.html
/tools/codex.html
/tools/open-code.html
/tools/openclaw.html
/tools/hermes.html
/tools/cline.html
/tools/continue.html
/tools/roo-code.html
/tools/cursor.html
/tools/windsurf.html
/tools/cherry-studio.html
/capabilities/image2.html
/troubleshooting/faq.html
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run docs:build
```

Expected: VitePress build completes successfully.

## Task 2: Shared Theme Styling

**Files:**
- Modify: `docs/.vitepress/theme/style.css`
- Verify: `npm run docs:build`

- [ ] **Step 1: Replace the current homepage CSS with shared design tokens**

Add root-level variables at the top of `style.css`:

```css
:root {
  --doc-brand: #155eef;
  --doc-brand-soft: #edf4ff;
  --doc-success: #0f766e;
  --doc-success-soft: #e7f7f2;
  --doc-text-strong: #0f172a;
  --doc-text-muted: #64748b;
  --doc-border: #dce3ee;
  --doc-border-soft: #e8edf5;
  --doc-surface: #ffffff;
  --doc-surface-soft: #f6f8fb;
  --doc-radius: 8px;
  --doc-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}
```

- [ ] **Step 2: Implement homepage layout classes**

Define styles for:

```text
.home-page
.home-page .VPDoc.has-aside .content-container
.home-page .VPDoc:not(.has-aside) .content-container
.home-page .vp-doc > h1:first-child
.home-hero
.home-hero-copy
.home-eyebrow
.home-summary
.home-actions
.home-button
.home-button-primary
.home-button-secondary
.home-checklist
.home-checklist ol
.home-checklist li
.home-checklist li > span
.home-grid
.home-grid-steps
.home-grid-tools
.home-grid-single
.home-card
.home-card-label
.home-section-note
```

Use the spec constraints: 8px radius for cards and controls, restrained shadows, blue for primary actions, teal for checklist status, and stable responsive dimensions.

- [ ] **Step 3: Improve shared document elements**

Add non-invasive styles for VitePress content:

```text
.vp-doc div[class*='language-']
.vp-doc table
.vp-doc th
.vp-doc td
.vp-doc .custom-block
```

Keep these styles modest so tool pages remain readable and VitePress behavior is unchanged.

- [ ] **Step 4: Add responsive rules**

Add media rules for:

```css
@media (max-width: 900px) { ... }
@media (max-width: 640px) { ... }
```

Ensure homepage grids collapse to one column on small screens and hero actions do not overflow.

- [ ] **Step 5: Run build**

Run:

```bash
npm run docs:build
```

Expected: VitePress build completes successfully.

## Task 3: image2 Workbench Styling

**Files:**
- Modify: `docs/.vitepress/theme/components/Image2Playground.vue`
- Verify: `npm run docs:build`

- [ ] **Step 1: Keep script logic unchanged**

Do not change imports, refs, computed values, or request functions unless a build error requires a syntax-only fix.

- [ ] **Step 2: Refine visible copy**

Use precise text:

```text
在线试用
生成或编辑 image2 图片
填写 API Key 后，可以直接生成图片，也可以上传图片进行编辑。API Key 只保存在当前浏览器。
保存到当前浏览器
删除已保存的 Key
请求失败。请检查 API Key、Base URL、模型权限和接口路径后重试。
```

- [ ] **Step 3: Replace scoped styles**

Restyle these selectors with the same visual system:

```text
.image2-workbench
.workbench-heading
.workbench-layout
.control-panel
.result-panel
.mode-switch
.control-panel label
.control-panel input
.control-panel textarea
.control-panel select
.key-actions
.storage-note
.settings-grid
.primary-action
.secondary
.ghost
.source-preview
.message
.result-frame
.empty-result
.result-actions
.history-panel
.history-heading
.history-list
.history-item
.history-actions
```

Use a two-column desktop grid and a single-column mobile layout.

- [ ] **Step 4: Run build**

Run:

```bash
npm run docs:build
```

Expected: VitePress build completes successfully.

## Task 4: Browser Visual Verification

**Files:**
- Verify rendered pages only.

- [ ] **Step 1: Start the local dev server**

Run:

```bash
npm run docs:dev -- --host 127.0.0.1
```

Expected: VitePress prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Open homepage in browser**

Open:

```text
http://127.0.0.1:5173/
```

Check desktop viewport:

```text
1440 x 1000
```

Expected:

- Title, subtitle, primary actions, and checklist are visible without overlap.
- Quick start cards are aligned.
- Tool cards are compact and readable.
- Troubleshooting entries are clear.

- [ ] **Step 3: Check mobile homepage**

Use viewport:

```text
390 x 844
```

Expected:

- Hero actions wrap cleanly.
- Checklist is readable.
- Cards collapse to one column.
- No button or heading text overflows its container.

- [ ] **Step 4: Check image2 page**

Open:

```text
http://127.0.0.1:5173/capabilities/image2.html
```

Expected:

- Desktop layout clearly separates controls, result preview, and history.
- Mobile layout is single column.
- Form fields and buttons remain at readable sizes.
- Error and success messages have clear visual distinction.

## Task 5: Final Verification, Commit, and Push

**Files:**
- Commit all modified implementation and plan files.

- [ ] **Step 1: Run final build**

Run:

```bash
npm run docs:build
```

Expected: VitePress build completes successfully.

- [ ] **Step 2: Review git diff**

Run:

```bash
git diff --stat
git diff -- docs/index.md docs/.vitepress/theme/style.css docs/.vitepress/theme/components/Image2Playground.vue
```

Expected:

- Changes match the approved design.
- No unrelated files are modified.
- `.superpowers/` remains ignored.

- [ ] **Step 3: Commit**

Run:

```bash
git add docs/index.md docs/.vitepress/theme/style.css docs/.vitepress/theme/components/Image2Playground.vue
git add -f docs/superpowers/plans/2026-06-02-ui-ux-refresh.md
git commit -m "docs: refresh documentation ui"
```

- [ ] **Step 4: Push both remotes**

Prefer:

```bash
bash scripts/push-all.sh
```

If the script hangs, run:

```bash
git push origin master
git push github master
```

Expected: both remotes update to the new commit.
