# Chinese Docs Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all user-facing Chinese copy in the VitePress docs so it reads like a direct tutorial: short titles, short sentences, clear steps, nearby examples, and practical troubleshooting.

**Architecture:** This is a content-only rewrite. Keep VitePress structure, routes, links, code blocks, API fields, image paths, and Vue component logic intact. Rewrite the visible Chinese in Markdown pages and the `Image2Playground.vue` UI strings.

**Tech Stack:** VitePress, Markdown, Vue single-file component, npm build scripts.

---

## File Map

- Modify: `docs/index.md` - homepage copy, tool table, quick routing.
- Modify: `docs/guide/api-key.md` - API Key concept tutorial.
- Modify: `docs/guide/base-url.md` - Base URL concept tutorial.
- Modify: `docs/guide/common-principles.md` - shared configuration rules.
- Modify: `docs/guide/faq.md` - common troubleshooting.
- Modify: `docs/guide/verify.md` - verification workflow.
- Modify: `docs/guide/image2.md` - image2 API tutorial and examples.
- Modify: `docs/tools/cherry-studio.md` - Cherry Studio configuration tutorial.
- Modify: `docs/tools/claude-code.md` - Claude Code and CC Switch tutorial.
- Modify: `docs/tools/cline.md` - Cline configuration tutorial.
- Modify: `docs/tools/codex.md` - Codex configuration tutorial.
- Modify: `docs/tools/continue.md` - Continue configuration tutorial.
- Modify: `docs/tools/cursor.md` - Cursor configuration tutorial.
- Modify: `docs/tools/open-code.md` - OpenCode configuration tutorial.
- Modify: `docs/tools/roo-code.md` - Roo Code configuration tutorial.
- Modify: `docs/tools/windsurf.md` - Windsurf configuration tutorial.
- Modify: `docs/.vitepress/theme/components/Image2Playground.vue` - user-facing Chinese UI strings only.

## Rewrite Rules

Use these rules in every task:

- Keep code blocks unchanged unless only Chinese prose inside an example prompt is being improved.
- Keep URLs, API paths, model IDs, field names, image paths, and route links unchanged.
- Keep frontmatter keys and VitePress syntax valid.
- Do not add new technical claims about tool support.
- When support is uncertain, write: `如果你的版本提供这个字段，可以按下面的方式填写。`
- Prefer headings like `准备工作`, `配置步骤`, `配置示例`, `如何验证`, `常见问题`.
- Avoid wording like `统一`, `体系`, `链路`, `能力`, `场景化`, unless it is the clearest technical term in context.

---

### Task 1: Rewrite Homepage

**Files:**
- Modify: `docs/index.md`

- [ ] **Step 1: Read the current homepage**

Run:

```bash
Get-Content -Raw docs\index.md
```

Expected: current homepage Markdown is visible.

- [ ] **Step 2: Rewrite the homepage copy**

Edit `docs/index.md`.

Keep:

- existing routes
- existing tool names
- existing image2 link
- existing frontmatter shape

Use this structure:

```md
---
layout: home

hero:
  name: "途联通证配置教程"
  text: "选择工具，按步骤配置"
  tagline: "这里整理了常见 AI 编程工具的 API Key、Base URL 和模型配置方法。先选工具，再按页面填写。"
  actions:
    - theme: brand
      text: 选择工具
      link: /#tools
    - theme: alt
      text: 查看通用说明
      link: /guide/common-principles

features:
  - title: 先选工具
    details: 不同工具的配置入口不一样。先找到你正在使用的工具。
  - title: 看接口格式
    details: 确认工具使用 OpenAI Chat、OpenAI Responses，还是 Anthropic Messages。
  - title: 填写配置
    details: 按工具页填写 API Key、Base URL、模型名称和 Provider。
  - title: 发请求测试
    details: 配好后发一次请求。重点看 401、404、模型不存在和接口格式错误。
  - title: 使用 image2
    details: image2 是图片接口，使用 OpenAI 图片生成和编辑格式。
---

## 选择你正在用的工具 {#tools}

| 工具 | 先看什么 |
| --- | --- |
| [Claude Code](/tools/claude-code) | Anthropic 接口和 CC Switch 配置 |
| [Codex](/tools/codex) | OpenAI Responses 接口和 `/v1` |
| [OpenCode](/tools/open-code) | `/connect` 流程和 provider 写法 |
| [Cline](/tools/cline) | Provider 类型和 Base URL |
| [Cherry Studio](/tools/cherry-studio) | Provider、接口地址和模型名称 |
| [Continue](/tools/continue) | 配置文件结构和 provider 类型 |
| [Roo Code](/tools/roo-code) | OpenAI Compatible Provider |
| [Cursor](/tools/cursor) | BYOK 设置和自定义接口支持情况 |
| [Windsurf](/tools/windsurf) | API Key 入口和 BYOK 限制 |

选好工具后，打开对应页面照着填。

## 不知道怎么填

先看这几页：

- [什么是 API Key](/guide/api-key)
- [什么是 Base URL](/guide/base-url)
- [通用配置原则](/guide/common-principles)
- [如何验证配置是否生效](/guide/verify)
- [常见问题](/guide/faq)

## 图片接口

image2 是图片接口，不是聊天模型接口。

如果你要生成图片或编辑图片，看 [image2 图片接口教程](/guide/image2)。

## 常见问题

配置不通时，先检查：

- Base URL 是否多写或少写 `/v1`
- API Key 是否填错
- 模型名称是否正确
- Provider 是否选错
- 工具需要的是哪种接口格式

更多排查方法见 [常见问题](/guide/faq)。
```

- [ ] **Step 3: Build after homepage rewrite**

Run:

```bash
npm run docs:build
```

Expected: build completes successfully.

- [ ] **Step 4: Commit homepage rewrite**

Run:

```bash
git add docs/index.md
git commit -m "docs: rewrite homepage copy"
```

Expected: commit succeeds.

---

### Task 2: Rewrite General Guides

**Files:**
- Modify: `docs/guide/api-key.md`
- Modify: `docs/guide/base-url.md`
- Modify: `docs/guide/common-principles.md`
- Modify: `docs/guide/faq.md`
- Modify: `docs/guide/verify.md`

- [ ] **Step 1: Read the guide files**

Run:

```bash
Get-Content -Raw docs\guide\api-key.md
Get-Content -Raw docs\guide\base-url.md
Get-Content -Raw docs\guide\common-principles.md
Get-Content -Raw docs\guide\faq.md
Get-Content -Raw docs\guide\verify.md
```

Expected: current guide Markdown is visible.

- [ ] **Step 2: Rewrite `api-key.md`**

Use this shape:

```md
# API Key 教程

API Key 是访问接口时使用的密钥。

工具发送请求时，会把 API Key 一起发给服务商。服务商用它判断你是谁、有没有权限、还能不能继续调用。

## API Key 填在哪里

大多数工具会有一个 `API Key` 字段。

把你的 Key 填进去即可。

常见位置：

- Provider 设置
- Model Provider 设置
- API 设置
- 环境变量
- 配置文件

## 填写规则

- 不要多写空格。
- 不要换行。
- 不要把 Base URL 填到 API Key 里。
- 不要把多个 Key 写在同一个字段里。
- 一个工具要用哪个 Key，以对应工具页为准。

## 常见写法

```txt
API Key: sk-xxxxxxxxxxxxxxxx
```

有些工具会要求用环境变量：

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

Windows PowerShell 示例：

```powershell
$env:OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxx"
```

## 常见错误

### 401 Unauthorized

通常是 API Key 有问题。

请检查：

- Key 是否复制完整。
- 前后是否有空格。
- Key 是否已经失效。
- Key 是否属于当前服务商。
- 当前 Key 是否有权限访问这个模型。

### Missing API Key

通常是工具没有读到 Key。

请检查：

- 设置是否保存。
- 配置文件路径是否正确。
- 环境变量是否在当前终端生效。
- 修改后是否需要重启工具。

## 下一步

API Key 填好后，再检查 [Base URL](/guide/base-url)。
```

- [ ] **Step 3: Rewrite `base-url.md`**

Use headings:

```md
# Base URL 教程
## Base URL 是什么
## `/v1` 要不要带
## 常见写法
## 填写规则
## 常见错误
## 下一步
```

Required content:

- Explain Base URL as the API address.
- Mention some tools need `/v1`, some add it automatically.
- Keep `https://api.1010101.asia/` and `https://api.1010101.asia/v1` examples if present.
- Troubleshoot 404 and connection timeout.

- [ ] **Step 4: Rewrite `common-principles.md`**

Use headings:

```md
# 通用配置原则
## 先确认接口格式
## 再确认 Base URL
## 然后填写 API Key
## 最后填写模型名称
## 不要混用配置
## 配好后立即测试
```

Required content:

- OpenAI Chat uses `messages`.
- OpenAI Responses uses `input`.
- Anthropic Messages uses Claude-style messages and headers.
- image2 uses image generation/edit endpoints, not chat messages.

- [ ] **Step 5: Rewrite `verify.md`**

Use headings:

```md
# 验证配置教程
## 最快验证方法
## 成功是什么样
## 失败后看报错
## 进一步排查
```

Required content:

- Save config.
- Restart or reload when needed.
- Send a real request.
- Explain 401, 404, model not found, provider/interface mismatch.

- [ ] **Step 6: Rewrite `faq.md`**

Use direct Q&A headings:

```md
# 常见问题
## API Key 填了还是 401？
## Base URL 要不要带 `/v1`？
## 为什么提示模型不存在？
## Provider 应该选哪个？
## 为什么工具里能保存，但请求失败？
## image2 能不能填到代码助手里？
```

Required content:

- Answers must be short.
- Each answer includes checks the user can perform.
- Link to relevant guide pages.

- [ ] **Step 7: Build after guide rewrite**

Run:

```bash
npm run docs:build
```

Expected: build completes successfully.

- [ ] **Step 8: Commit guide rewrite**

Run:

```bash
git add docs/guide/api-key.md docs/guide/base-url.md docs/guide/common-principles.md docs/guide/faq.md docs/guide/verify.md
git commit -m "docs: rewrite general guides"
```

Expected: commit succeeds.

---

### Task 3: Rewrite Tool Pages

**Files:**
- Modify: `docs/tools/cherry-studio.md`
- Modify: `docs/tools/claude-code.md`
- Modify: `docs/tools/cline.md`
- Modify: `docs/tools/codex.md`
- Modify: `docs/tools/continue.md`
- Modify: `docs/tools/cursor.md`
- Modify: `docs/tools/open-code.md`
- Modify: `docs/tools/roo-code.md`
- Modify: `docs/tools/windsurf.md`

- [ ] **Step 1: Read all tool pages**

Run:

```bash
Get-Content -Raw docs\tools\cherry-studio.md
Get-Content -Raw docs\tools\claude-code.md
Get-Content -Raw docs\tools\cline.md
Get-Content -Raw docs\tools\codex.md
Get-Content -Raw docs\tools\continue.md
Get-Content -Raw docs\tools\cursor.md
Get-Content -Raw docs\tools\open-code.md
Get-Content -Raw docs\tools\roo-code.md
Get-Content -Raw docs\tools\windsurf.md
```

Expected: current tool Markdown is visible.

- [ ] **Step 2: Rewrite each tool page with the shared tutorial shape**

For each page, use this order when the information exists:

```md
# 工具名配置教程

一句话说明工具。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

## 这个工具使用什么接口

## 配置步骤

## 配置示例

## 如何验证

## 常见问题

## 注意事项
```

Rules:

- Preserve screenshots and captions in `docs/tools/claude-code.md`.
- Preserve commands in `docs/tools/claude-code.md`.
- Preserve tool-specific facts already present in each file.
- Do not invent support for custom Base URL.
- If the current page says support is uncertain, keep it uncertain.

- [ ] **Step 3: Use conservative wording for uncertain support**

Apply this exact wording where support depends on version or UI availability:

```md
如果你的版本提供 Base URL 字段，可以按下面的方式填写。
```

Apply this exact wording for BYOK-limited tools:

```md
如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。
```

- [ ] **Step 4: Normalize common troubleshooting blocks**

Use this pattern:

```md
### 401 Unauthorized

通常是 API Key 有问题。

请检查：

- API Key 是否填错。
- 前后是否有空格。
- Key 是否已经失效。
- Key 是否有权限访问当前模型。
```

Use this pattern:

```md
### 404 Not Found

通常是 Base URL 或接口路径有问题。

请检查：

- Base URL 是否写错。
- `/v1` 是否多写或少写。
- 当前工具是否会自动补路径。
```

- [ ] **Step 5: Build after tool rewrite**

Run:

```bash
npm run docs:build
```

Expected: build completes successfully.

- [ ] **Step 6: Commit tool rewrite**

Run:

```bash
git add docs/tools/cherry-studio.md docs/tools/claude-code.md docs/tools/cline.md docs/tools/codex.md docs/tools/continue.md docs/tools/cursor.md docs/tools/open-code.md docs/tools/roo-code.md docs/tools/windsurf.md
git commit -m "docs: rewrite tool configuration tutorials"
```

Expected: commit succeeds.

---

### Task 4: Rewrite image2 Page and Playground Copy

**Files:**
- Modify: `docs/guide/image2.md`
- Modify: `docs/.vitepress/theme/components/Image2Playground.vue`

- [ ] **Step 1: Read image2 files**

Run:

```bash
Get-Content -Raw docs\guide\image2.md
Get-Content -Raw docs\.vitepress\theme\components\Image2Playground.vue
```

Expected: image2 Markdown and Vue component are visible.

- [ ] **Step 2: Rewrite `image2.md`**

Use headings:

```md
# image2 图片接口教程
## 在线试用
## image2 能做什么
## 生成图片
## 编辑图片
## 常用字段
## 接入自己的工具
## 常见问题
```

Required content:

- image2 generates images.
- image2 edits uploaded images.
- It uses `/v1/images/generations` and `/v1/images/edits`.
- It is not a chat interface.
- Keep curl and JavaScript examples.
- Keep OpenAI documentation links if present.

- [ ] **Step 3: Rewrite Vue UI strings only**

Modify only visible Chinese strings in `docs/.vitepress/theme/components/Image2Playground.vue`.

Good replacements:

```ts
const prompt = ref('一张清爽的产品图，主体清晰，背景干净，自然光，细节真实')
```

```ts
errorMessage.value = '请先填写 API Key。'
errorMessage.value = '请先写图片描述。'
errorMessage.value = '请先上传要编辑的图片。'
statusMessage.value = '生成完成。可以下载，也可以继续编辑。'
statusMessage.value = '编辑完成。可以下载，也可以继续编辑。'
```

Template copy should use shorter text:

```html
<p class="eyebrow">在线工具</p>
<h2>试生成一张图</h2>
<p>
  填入 API Key 后，可以直接生成图片，也可以上传图片继续编辑。
  Key 只保存在当前浏览器。
</p>
```

Do not change:

- refs
- computed values
- function names
- request payloads
- localStorage keys
- CSS classes
- API URLs

- [ ] **Step 4: Build after image2 rewrite**

Run:

```bash
npm run docs:build
```

Expected: build completes successfully.

- [ ] **Step 5: Commit image2 rewrite**

Run:

```bash
git add docs/guide/image2.md docs/.vitepress/theme/components/Image2Playground.vue
git commit -m "docs: rewrite image2 tutorial copy"
```

Expected: commit succeeds.

---

### Task 5: Final Copy Audit

**Files:**
- Check: all files listed in File Map

- [ ] **Step 1: Search remaining Chinese copy**

Run:

```bash
rg -n --hidden "[\p{Han}]" docs -g "*.md" -g "*.vue"
```

Expected: all remaining Chinese is either rewritten user-facing copy, example prompts, or intentional captions.

- [ ] **Step 2: Search for banned wording**

Run:

```bash
rg -n --hidden "统一|体系|链路|能力|场景化|赋能|闭环|最佳实践|解决方案" docs -g "*.md" -g "*.vue"
```

Expected: no hits, or only hits where the word is clearly necessary. Rewrite avoidable hits.

- [ ] **Step 3: Search for broken Markdown patterns**

Run:

```bash
rg -n "::::|```|\\]\\(|\\]\\[" docs -g "*.md"
```

Expected: no malformed containers or obvious broken links. Code fences should be balanced when visually checked in changed files.

- [ ] **Step 4: Run final build**

Run:

```bash
npm run docs:build
```

Expected: build completes successfully.

- [ ] **Step 5: Check git status**

Run:

```bash
git status --short
```

Expected: either clean or only intended files modified before final commit.

- [ ] **Step 6: Commit final audit fixes if needed**

If Task 5 changed files, run:

```bash
git add docs
git commit -m "docs: polish rewritten Chinese copy"
```

Expected: commit succeeds.

- [ ] **Step 7: Push to both remotes**

Run:

```bash
bash scripts/push-all.sh
```

Expected: both remotes receive the latest commits.

If the script times out, run:

```bash
git push origin master
git push github master
```

Expected: both pushes succeed.
