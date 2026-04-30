# 自定义 API Key 与 Base URL 文档站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个纯静态中文文档站，帮助用户在 9 个常见编程工具中配置自定义 API Key 与 Base URL，首版所有页面达到可直接照做的完成态。

**Architecture:** 使用 VitePress 作为静态站点生成器，首页采用默认 home layout，导航与侧边栏通过 config.ts 统一维护。内容组织为首页、通用说明（guide）、工具配置（tools）、常见问题（faq）四大块，每个工具页单页闭环。

**Tech Stack:** VitePress, Markdown, 本地图片资源

---

## 文件结构

实现完成后，项目将包含以下核心文件：

```
docs/
  index.md                    # 首页
  guide/
    api-key.md                # 什么是 API Key
    base-url.md               # 什么是 Base URL
    common-principles.md      # 通用配置原则
    verify.md                 # 如何验证配置是否生效
    faq.md                    # 常见问题
  tools/
    claude-code.md            # Claude Code 配置页
    codex.md                  # Codex 配置页
    open-code.md              # OpenCode 配置页
    cline.md                  # Cline 配置页
    cherry-studio.md          # Cherry Studio 配置页
    continue.md               # Continue 配置页
    roo-code.md               # Roo Code 配置页
    cursor.md                 # Cursor 配置页
    windsurf.md               # Windsurf 配置页
  public/
    images/
      tools/                  # 各工具截图目录（按需创建）
  .vitepress/
    config.ts                 # VitePress 配置
package.json                  # 项目依赖
```

---

## Task 1: 初始化 VitePress 项目

**Files:**
- Create: `package.json`
- Create: `docs/.vitepress/config.ts`

- [ ] **Step 1: 初始化 npm 项目并安装 VitePress**

```bash
cd D:/Project/web/doc
npm init -y
npm install -D vitepress
```

- [ ] **Step 2: 创建 VitePress 配置文件**

创建 `docs/.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'API Key 与 Base URL 配置文档',
  description: '帮助你在常见编程工具中快速配置自定义 API Key 与 Base URL',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '通用说明', link: '/guide/api-key' },
      { text: '工具配置', link: '/tools/claude-code' },
      { text: '常见问题', link: '/guide/faq' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '通用说明',
          items: [
            { text: '什么是 API Key', link: '/guide/api-key' },
            { text: '什么是 Base URL', link: '/guide/base-url' },
            { text: '通用配置原则', link: '/guide/common-principles' },
            { text: '如何验证配置是否生效', link: '/guide/verify' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具配置',
          items: [
            { text: 'Claude Code', link: '/tools/claude-code' },
            { text: 'Codex', link: '/tools/codex' },
            { text: 'OpenCode', link: '/tools/open-code' },
            { text: 'Cline', link: '/tools/cline' },
            { text: 'Cherry Studio', link: '/tools/cherry-studio' },
            { text: 'Continue', link: '/tools/continue' },
            { text: 'Roo Code', link: '/tools/roo-code' },
            { text: 'Cursor', link: '/tools/cursor' },
            { text: 'Windsurf', link: '/tools/windsurf' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    search: {
      provider: 'local'
    }
  }
})
```

- [ ] **Step 3: 更新 package.json scripts**

更新 `package.json`：

```json
{
  "name": "doc",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

- [ ] **Step 4: 验证 VitePress 可启动**

```bash
npm run docs:dev
```

预期：VitePress 开发服务器启动成功，访问 `http://localhost:5173` 显示空白站点。

- [ ] **Step 5: 提交初始化**

```bash
git add package.json package-lock.json docs/.vitepress/config.ts
git commit -m "chore: initialize VitePress project"
```

---

## Task 2: 创建首页

**Files:**
- Create: `docs/index.md`

- [ ] **Step 1: 编写首页内容**

创建 `docs/index.md`：

```markdown
---
layout: home

hero:
  name: "API Key 与 Base URL 配置文档"
  text: "快速配置你的编程工具"
  tagline: "默认 Base URL: https://api.1010101.asia/"
  actions:
    - theme: brand
      text: 开始配置
      link: /tools/claude-code
    - theme: alt
      text: 查看支持的工具
      link: /tools/claude-code

features:
  - icon: 🚀
    title: 3 步快速开始
    details: |
      1. 准备自己的 API Key
      2. 把工具里的接口地址改成 https://api.1010101.asia/
      3. 进入对应工具页完成配置并验证
  - icon: 📚
    title: 通用说明
    details: 了解 API Key 和 Base URL 的基本概念，掌握通用配置原则。
  - icon: 🛠️
    title: 工具配置
    details: 支持 Claude Code、Codex、OpenCode、Cline、Cherry Studio、Continue、Roo Code、Cursor、Windsurf 等 9 个工具。
  - icon: ❓
    title: 常见问题
    details: 查看跨工具共性问题与排查方法。
---

## 支持的工具

| 工具 | 类型 | 说明 |
|------|------|------|
| [Claude Code](/tools/claude-code) | CLI | Anthropic 官方命令行工具 |
| [Codex](/tools/codex) | CLI | OpenAI Codex 命令行工具 |
| [OpenCode](/tools/open-code) | CLI | 开源命令行工具 |
| [Cline](/tools/cline) | 编辑器插件 | VS Code 扩展 |
| [Cherry Studio](/tools/cherry-studio) | 桌面应用 | 跨平台桌面客户端 |
| [Continue](/tools/continue) | 编辑器插件 | VS Code / JetBrains 扩展 |
| [Roo Code](/tools/roo-code) | 编辑器插件 | VS Code 扩展 |
| [Cursor](/tools/cursor) | 编辑器 | AI 代码编辑器 |
| [Windsurf](/tools/windsurf) | 编辑器 | AI 代码编辑器 |

## 通用说明摘要

- [什么是 API Key](/guide/api-key)：用于身份验证的密钥
- [什么是 Base URL](/guide/base-url)：API 请求的基础地址
- [通用配置原则](/guide/common-principles)：配置时需要注意的共同原则
- [如何验证配置是否生效](/guide/verify)：确认配置成功的通用方法

## 常见问题预览

- 为什么改完设置后没有生效？
- API Key 和 Base URL 通常分别填在哪里？
- 如何判断工具是否真的在走自定义接口？

查看 [常见问题](/guide/faq) 了解更多。
```

- [ ] **Step 2: 验证首页显示**

```bash
npm run docs:dev
```

预期：首页显示 Hero 区、3 步快速开始、工具表格、通用说明摘要、FAQ 预览。

- [ ] **Step 3: 提交首页**

```bash
git add docs/index.md
git commit -m "feat: create homepage with quick start and tool cards"
```

---

## Task 3: 创建通用说明页 - API Key

**Files:**
- Create: `docs/guide/api-key.md`

- [ ] **Step 1: 编写 API Key 说明页**

创建 `docs/guide/api-key.md`：

```markdown
# 什么是 API Key

API Key 是用于身份验证的密钥，相当于你的"用户名 + 密码"。当你调用一个 API 时，服务器通过 API Key 识别你是谁、是否有权限访问。

## 为什么需要 API Key

大多数 AI 编程工具都需要你提供一个 API Key，原因包括：

- **身份识别**：服务器需要知道是谁在调用 API
- **计费与限额**：根据 API Key 统计使用量、控制配额
- **安全控制**：防止未授权访问

## API Key 的常见形式

API Key 通常是一个长字符串，例如：

```
sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

不同服务商的 API Key 格式可能不同，但都遵循"一个密钥对应一个身份"的原则。

## 如何获取 API Key

你需要从对应的服务商处获取 API Key。获取方式因服务商而异，通常需要：

1. 注册账号
2. 进入控制台或设置页面
3. 生成或复制 API Key

**注意**：API Key 是敏感信息，不要分享给他人，也不要提交到公开代码仓库。

## 在工具中填写 API Key

不同工具填写 API Key 的位置不同，但通常在以下位置之一：

- 设置面板的"API Key"字段
- 配置文件的 `apiKey` 字段
- 环境变量（如 `ANTHROPIC_API_KEY`）

具体填写方式请参考对应工具的配置页面。

## 常见问题

### API Key 填错了会怎样？

通常会返回 `401 Unauthorized` 错误，提示身份验证失败。

### API Key 泄露了怎么办？

立即到服务商控制台撤销旧 Key，并生成新 Key。

### 可以多个工具共用一个 API Key 吗？

可以，只要服务商允许。但要注意使用量会合并计算。
```

- [ ] **Step 2: 提交 API Key 页**

```bash
git add docs/guide/api-key.md
git commit -m "feat: add API Key explanation page"
```

---

## Task 4: 创建通用说明页 - Base URL

**Files:**
- Create: `docs/guide/base-url.md`

- [ ] **Step 1: 编写 Base URL 说明页**

创建 `docs/guide/base-url.md`：

```markdown
# 什么是 Base URL

Base URL 是 API 请求的基础地址，相当于你告诉工具"去哪里调用 API"。

## 为什么需要自定义 Base URL

默认情况下，大多数工具会使用官方 API 地址。但有时你需要自定义 Base URL：

- **使用代理或中转服务**：通过第三方服务访问 API
- **使用自建服务**：调用自己部署的 API 服务
- **使用兼容接口**：某些工具支持 OpenAI 兼容接口，你可以指向其他服务商

## Base URL 的常见形式

Base URL 通常是一个 HTTPS 地址，例如：

```
https://api.1010101.asia/
```

或带路径的形式：

```
https://api.example.com/v1
```

## 本文档站的默认 Base URL

本文档站以 `https://api.1010101.asia/` 作为示例 Base URL。你可以在工具配置页面中看到如何填写这个地址。

## 在工具中填写 Base URL

不同工具填写 Base URL 的位置不同，但通常在以下位置之一：

- 设置面板的"Base URL"或"API Endpoint"字段
- 配置文件的 `baseURL` 或 `apiBase` 字段
- 环境变量（如 `ANTHROPIC_BASE_URL`）

具体填写方式请参考对应工具的配置页面。

## 常见问题

### Base URL 填错了会怎样？

通常会返回 `404 Not Found` 或连接超时错误。

### Base URL 需要以 `/` 结尾吗？

取决于服务商的 API 设计。本示例 `https://api.1010101.asia/` 以 `/` 结尾，请按工具页示例填写。

### Base URL 和 API Key 有什么区别？

- **API Key**：身份验证，相当于"密码"
- **Base URL**：请求地址，相当于"服务器地址"

两者缺一不可：没有 API Key，服务器不认识你；没有 Base URL，工具不知道去哪里调用。
```

- [ ] **Step 2: 提交 Base URL 页**

```bash
git add docs/guide/base-url.md
git commit -m "feat: add Base URL explanation page"
```

---

## Task 5: 创建通用说明页 - 通用配置原则

**Files:**
- Create: `docs/guide/common-principles.md`

- [ ] **Step 1: 编写通用配置原则页**

创建 `docs/guide/common-principles.md`：

```markdown
# 通用配置原则

在配置任何工具之前，先了解这些通用原则，可以帮助你避免常见错误。

## 1. 先确认 API Key 和 Base URL

在打开工具设置之前，先确认你已经：

- 获得了有效的 API Key
- 知道正确的 Base URL（如 `https://api.1010101.asia/`）

如果这两个信息有误，后续配置都不会成功。

## 2. 注意字段名称

不同工具对相同概念可能使用不同的字段名：

- API Key 可能叫 `apiKey`、`api_key`、`API Key`、`Key` 等
- Base URL 可能叫 `baseURL`、`base_url`、`Base URL`、`API Endpoint` 等

填写时请以工具页示例为准，不要想当然地猜测字段名。

## 3. 不要有多余空格

复制粘贴 API Key 和 Base URL 时，注意不要带入多余空格：

- 字符串前后不要有空格
- 字符串中间不要有换行

多余空格会导致验证失败，且很难排查。

## 4. 保存后可能需要重启或重新加载

某些工具在修改配置后需要：

- 保存配置文件
- 重新加载配置（如 Continue 的"Reload config"）
- 重启工具

具体操作请参考对应工具页的说明。

## 5. 验证配置是否生效

配置完成后，务必验证是否生效。常见验证方法：

- 发送一个简单请求，看是否成功返回
- 检查工具的"连接测试"功能
- 查看工具日志或调试信息

验证方法请参考 [如何验证配置是否生效](/guide/verify)。

## 6. 注意平台差异

某些工具在不同平台（Windows、macOS、Linux）上的配置方式略有不同：

- 配置文件路径可能不同
- 设置入口位置可能不同
- 环境变量设置方式可能不同

工具页会标注重要的平台差异，请注意查看。

## 7. 不要混用不同服务商的 API Key 和 Base URL

API Key 和 Base URL 必须来自同一服务商：

- 错误：服务商 A 的 API Key + 服务商 B 的 Base URL
- 正确：服务商 A 的 API Key + 服务商 A 的 Base URL

混用会导致身份验证失败。

## 8. 保护你的 API Key

API Key 是敏感信息，请注意：

- 不要分享给他人
- 不要提交到公开代码仓库
- 不要截图发到公开渠道

如果 API Key 泄露，立即到服务商控制台撤销并生成新 Key。
```

- [ ] **Step 2: 提交通用配置原则页**

```bash
git add docs/guide/common-principles.md
git commit -m "feat: add common configuration principles page"
```

---

## Task 6: 创建通用说明页 - 如何验证配置是否生效

**Files:**
- Create: `docs/guide/verify.md`

- [ ] **Step 1: 编写验证方法页**

创建 `docs/guide/verify.md`：

```markdown
# 如何验证配置是否生效

配置完成后，务必验证是否生效。以下是通用的验证方法。

## 方法 1：发送测试请求

最直接的验证方式是发送一个简单请求：

1. 在工具中发起一个简单对话或代码生成请求
2. 观察是否成功返回结果
3. 如果成功，说明配置生效

**注意**：测试请求会消耗 API 配额，请控制测试频率。

## 方法 2：使用工具的连接测试功能

某些工具提供"连接测试"或"验证配置"功能：

1. 在设置面板中找到"Test Connection"或类似按钮
2. 点击测试
3. 观察是否显示"连接成功"或类似提示

## 方法 3：查看工具日志或调试信息

某些工具提供日志或调试信息：

1. 打开工具的日志面板或调试模式
2. 发起一个请求
3. 查看日志中是否包含正确的 Base URL 和请求状态

## 方法 4：检查错误提示

如果配置有误，工具通常会返回错误提示：

- `401 Unauthorized`：API Key 错误或无效
- `404 Not Found`：Base URL 错误或路径不对
- `Connection Timeout`：网络问题或 Base URL 不可达
- `Model Not Found`：模型名称错误或该模型不可用

根据错误提示排查问题。

## 验证成功的标志

配置成功的标志包括：

- 能够正常发起请求并获得响应
- 工具显示"连接成功"或类似提示
- 日志中显示正确的 Base URL
- 没有身份验证或连接错误

## 验证失败的常见原因

如果验证失败，常见原因包括：

- API Key 填错或已失效
- Base URL 填错或不可达
- 未保存配置或未重启工具
- 网络问题或服务商服务不可用
- 模型名称错误（如果工具要求填写模型名）

根据错误提示和工具页的常见报错部分进行排查。
```

- [ ] **Step 2: 提交验证方法页**

```bash
git add docs/guide/verify.md
git commit -m "feat: add configuration verification guide page"
```

---

## Task 7: 创建通用说明页 - 常见问题

**Files:**
- Create: `docs/guide/faq.md`

- [ ] **Step 1: 编写常见问题页**

创建 `docs/guide/faq.md`：

```markdown
# 常见问题

这里收录跨工具共性问题。工具特定问题请参考对应工具页的"常见报错"部分。

## 为什么改完设置后没有生效？

可能原因：

1. **未保存配置**：某些工具需要手动保存配置文件或点击"保存"按钮
2. **未重新加载**：某些工具需要重新加载配置或重启工具
3. **配置文件位置错误**：修改了错误的配置文件（如全局配置 vs 项目配置）
4. **字段名错误**：字段名拼写错误或大小写不匹配

解决方法：

- 确认已保存配置
- 尝试重新加载或重启工具
- 检查配置文件路径是否正确
- 对照工具页示例检查字段名

## API Key 和 Base URL 通常分别填在哪里？

不同工具的填写位置不同，但通常在以下位置之一：

- **设置面板**：图形界面工具通常在"设置"或"偏好设置"中
- **配置文件**：CLI 工具通常在配置文件中（如 `config.yaml`、`settings.json`）
- **环境变量**：某些工具支持通过环境变量设置

具体填写位置请参考对应工具的配置页面。

## 如何判断工具是否真的在走自定义接口？

验证方法：

1. **查看日志**：如果工具提供日志，查看请求是否发送到自定义 Base URL
2. **发送测试请求**：发送一个请求，观察是否从自定义接口返回结果
3. **检查错误提示**：如果自定义接口不可用，工具应返回连接错误
4. **使用抓包工具**：高级用户可以使用抓包工具查看实际请求地址

## 为什么有些工具还要求填模型名或 Provider？

某些工具需要明确指定模型或 Provider，原因包括：

- **多模型支持**：工具支持多个模型，需要你选择使用哪个
- **多服务商支持**：工具支持多个服务商（如 OpenAI、Anthropic），需要你指定
- **兼容模式**：工具使用 OpenAI 兼容模式时，需要指定模型名

模型名和 Provider 的填写方式请参考对应工具页的示例。

## 为什么不同平台看到的界面略有不同？

某些工具在不同平台（Windows、macOS、Linux）上的界面或配置路径略有不同：

- **配置文件路径**：Windows 使用 `%USERPROFILE%`，macOS/Linux 使用 `~`
- **设置入口**：菜单项位置可能不同
- **环境变量设置**：Windows 使用"环境变量"设置，macOS/Linux 使用 shell 配置文件

工具页会标注重要的平台差异，请注意查看。

## 为什么会出现 401 错误？

`401 Unauthorized` 通常表示身份验证失败，可能原因：

- API Key 填错或已失效
- API Key 与 Base URL 不匹配（来自不同服务商）
- API Key 权限不足或已过期

解决方法：

- 检查 API Key 是否正确
- 确认 API Key 和 Base URL 来自同一服务商
- 到服务商控制台检查 API Key 状态

## 为什么会出现 404 错误？

`404 Not Found` 通常表示请求地址错误，可能原因：

- Base URL 填错
- Base URL 路径不正确（如缺少或多余 `/v1`）
- 模型名称错误（如果 URL 中包含模型名）

解决方法：

- 检查 Base URL 是否正确
- 对照工具页示例检查路径
- 检查模型名称是否正确

## 为什么模型列表为空？

某些工具会显示可用模型列表，如果列表为空，可能原因：

- Base URL 错误，无法连接到服务商
- API Key 错误，无法获取模型列表
- 服务商不支持模型列表查询

解决方法：

- 检查 Base URL 和 API Key 是否正确
- 手动填写模型名（如果工具支持）
- 参考工具页示例直接填写配置
```

- [ ] **Step 2: 提交常见问题页**

```bash
git add docs/guide/faq.md
git commit -m "feat: add FAQ page with common cross-tool issues"
```

---

## Task 8: 创建工具页 - Claude Code

**Files:**
- Create: `docs/tools/claude-code.md`

- [ ] **Step 1: 编写 Claude Code 配置页**

创建 `docs/tools/claude-code.md`：

```markdown
# Claude Code 配置

Claude Code 是 Anthropic 官方提供的命令行工具，用于在终端中与 Claude 交互。

## 这是什么工具

Claude Code 是一个 CLI 工具，需要在终端中使用。它支持通过环境变量或配置文件设置 API Key 和 Base URL。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Claude Code 的配置通过以下方式：

1. **环境变量**：在终端中设置环境变量
2. **配置文件**：编辑 `~/.claude/settings.json` 或项目 `.claude/settings.json`

## 最短完整配置步骤

### 方法 1：使用环境变量（推荐）

1. 打开终端
2. 设置环境变量：

```bash
export ANTHROPIC_API_KEY="你的API Key"
export ANTHROPIC_BASE_URL="https://api.1010101.asia/"
```

3. 启动 Claude Code：

```bash
claude
```

### 方法 2：使用配置文件

1. 创建或编辑 `~/.claude/settings.json`：

```json
{
  "apiKey": "你的API Key",
  "baseUrl": "https://api.1010101.asia/"
}
```

2. 保存文件
3. 启动 Claude Code：

```bash
claude
```

## 配置示例

### 环境变量方式（macOS/Linux）

```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export ANTHROPIC_BASE_URL="https://api.1010101.asia/"
claude
```

### 环境变量方式（Windows PowerShell）

```powershell
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$env:ANTHROPIC_BASE_URL="https://api.1010101.asia/"
claude
```

### 配置文件方式

```json
{
  "apiKey": "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://api.1010101.asia/"
}
```

## 如何验证生效

1. 启动 Claude Code：

```bash
claude
```

2. 发送一个简单问题，如："你好"
3. 如果收到正常回复，说明配置成功

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 以 `/` 结尾
- 检查网络连接是否正常

### Connection Timeout

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

### 环境变量未生效

**原因**：环境变量未正确设置或未在当前会话生效

**排查**：

- 确认环境变量已设置：`echo $ANTHROPIC_API_KEY`
- 如果使用配置文件，确认文件路径正确
- 尝试重新打开终端会话

## 注意事项

### 环境变量优先级

环境变量优先于配置文件。如果同时设置了环境变量和配置文件，环境变量优先生效。

### 配置文件位置

- **全局配置**：`~/.claude/settings.json`（适用于所有项目）
- **项目配置**：项目根目录 `.claude/settings.json`（仅适用于当前项目）

项目配置优先于全局配置。

### Windows 路径

Windows 用户注意：

- 配置文件路径为 `%USERPROFILE%\.claude\settings.json`
- 环境变量设置使用 PowerShell 或系统环境变量设置

### 模型选择

Claude Code 默认使用 Claude 3.5 Sonnet。如需切换模型，可在配置文件中添加：

```json
{
  "model": "claude-3-opus-20240229"
}
```

或在启动时指定：

```bash
claude --model claude-3-opus-20240229
```
```

- [ ] **Step 2: 提交 Claude Code 页**

```bash
git add docs/tools/claude-code.md
git commit -m "feat: add Claude Code configuration page"
```

---

## Task 9: 创建工具页 - Codex

**Files:**
- Create: `docs/tools/codex.md`

- [ ] **Step 1: 编写 Codex 配置页**

创建 `docs/tools/codex.md`：

```markdown
# Codex 配置

Codex 是 OpenAI 提供的命令行工具，用于在终端中使用 OpenAI 的代码生成能力。

## 这是什么工具

Codex 是一个 CLI 工具，支持通过 ChatGPT 登录或 API Key 模式使用。本文档说明 API Key 模式的配置方法。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Codex 的配置通过以下方式：

1. **配置文件**：编辑 `~/.codex/config.toml`
2. **环境变量**：设置 OpenAI API Key

## 最短完整配置步骤

### 方法 1：使用配置文件

1. 创建或编辑 `~/.codex/config.toml`
2. 添加以下内容：

```toml
[api]
api_key = "你的API Key"
base_url = "https://api.1010101.asia/"
```

3. 保存文件
4. 启动 Codex：

```bash
codex
```

### 方法 2：使用环境变量

1. 设置环境变量：

```bash
export OPENAI_API_KEY="你的API Key"
export OPENAI_BASE_URL="https://api.1010101.asia/"
```

2. 启动 Codex：

```bash
codex
```

## 配置示例

### 配置文件方式

```toml
[api]
api_key = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
base_url = "https://api.1010101.asia/"
```

### 环境变量方式（macOS/Linux）

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export OPENAI_BASE_URL="https://api.1010101.asia/"
codex
```

### 环境变量方式（Windows PowerShell）

```powershell
$env:OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$env:OPENAI_BASE_URL="https://api.1010101.asia/"
codex
```

## 如何验证生效

1. 启动 Codex：

```bash
codex
```

2. 发送一个简单代码生成请求
3. 如果收到正常回复，说明配置成功

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 配置文件未生效

**原因**：配置文件位置错误或格式错误

**排查**：

- 确认配置文件路径为 `~/.codex/config.toml`
- 检查 TOML 格式是否正确
- 确认已保存文件

## 注意事项

### 配置文件优先级

配置文件优先于环境变量。如果同时设置了配置文件和环境变量，配置文件优先生效。

### 登录模式 vs API Key 模式

Codex 支持两种模式：

- **登录模式**：使用 ChatGPT 账号登录，无需 API Key
- **API Key 模式**：使用 API Key，适合自定义 Base URL

本文档说明 API Key 模式。如需使用登录模式，请参考官方文档。

### Windows 路径

Windows 用户注意：

- 配置文件路径为 `%USERPROFILE%\.codex\config.toml`
- 环境变量设置使用 PowerShell 或系统环境变量设置

### 模型选择

Codex 默认使用 GPT-4 或 GPT-3.5。如需切换模型，可在配置文件中添加：

```toml
[model]
default = "gpt-4"
```
```

- [ ] **Step 2: 提交 Codex 页**

```bash
git add docs/tools/codex.md
git commit -m "feat: add Codex configuration page"
```

---

## Task 10: 创建工具页 - OpenCode

**Files:**
- Create: `docs/tools/open-code.md`

- [ ] **Step 1: 编写 OpenCode 配置页**

创建 `docs/tools/open-code.md`：

```markdown
# OpenCode 配置

OpenCode 是一个开源的命令行工具，支持多种 AI 模型和服务商。

## 这是什么工具

OpenCode 是一个 CLI 工具，支持通过 `/connect` 命令或配置文件设置 API Key 和 Base URL。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

OpenCode 的配置通过以下方式：

1. **交互式配置**：运行 `/connect` 命令
2. **配置文件**：编辑 `~/.config/opencode/opencode.json` 或项目 `opencode.json`

## 最短完整配置步骤

### 方法 1：使用交互式配置

1. 启动 OpenCode：

```bash
opencode
```

2. 运行连接命令：

```
/connect
```

3. 选择 Provider（如 OpenAI Compatible）
4. 输入 API Key
5. 输入 Base URL：`https://api.1010101.asia/`
6. 选择模型

### 方法 2：使用配置文件

1. 创建或编辑 `~/.config/opencode/opencode.json`
2. 添加以下内容：

```json
{
  "providers": {
    "custom": {
      "type": "openai",
      "options": {
        "baseURL": "https://api.1010101.asia/",
        "apiKey": "你的API Key"
      }
    }
  },
  "model": "custom/gpt-4"
}
```

3. 保存文件
4. 启动 OpenCode：

```bash
opencode
```

## 配置示例

### 配置文件方式

```json
{
  "providers": {
    "custom": {
      "type": "openai",
      "options": {
        "baseURL": "https://api.1010101.asia/",
        "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  },
  "model": "custom/gpt-4"
}
```

### 环境变量方式

OpenCode 也支持通过环境变量设置 API Key：

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export OPENAI_BASE_URL="https://api.1010101.asia/"
opencode
```

## 如何验证生效

1. 启动 OpenCode：

```bash
opencode
```

2. 发送一个简单问题
3. 如果收到正常回复，说明配置成功

4. 或运行模型列表命令：

```
/models
```

查看是否能列出可用模型。

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 模型列表为空

**原因**：Base URL 错误或 API Key 错误

**排查**：

- 检查 Base URL 和 API Key 是否正确
- 确认服务商支持模型列表查询
- 尝试手动指定模型名

### 配置文件未生效

**原因**：配置文件位置错误或格式错误

**排查**：

- 确认配置文件路径正确
- 检查 JSON 格式是否正确
- 确认已保存文件

## 注意事项

### 配置文件优先级

配置文件中的 Provider 设置优先于环境变量。如果同时设置了配置文件和环境变量，配置文件优先生效。

### Provider 类型

OpenCode 支持多种 Provider 类型：

- `openai`：OpenAI 或 OpenAI 兼容接口
- `anthropic`：Anthropic API
- `bedrock`：AWS Bedrock

本文档示例使用 `openai` 类型，适用于 OpenAI 兼容接口。

### 模型格式

在配置文件中指定模型时，格式为 `provider_id/model_id`：

```json
{
  "model": "custom/gpt-4"
}
```

其中 `custom` 是 Provider ID，`gpt-4` 是模型 ID。

### Windows 路径

Windows 用户注意：

- 配置文件路径为 `%APPDATA%\opencode\opencode.json`
- 环境变量设置使用 PowerShell 或系统环境变量设置

### 认证文件

OpenCode 的认证信息存储在 `~/.local/share/opencode/auth.json`，通常无需手动编辑。
```

- [ ] **Step 2: 提交 OpenCode 页**

```bash
git add docs/tools/open-code.md
git commit -m "feat: add OpenCode configuration page"
```

---

## Task 11: 创建工具页 - Cline

**Files:**
- Create: `docs/tools/cline.md`

- [ ] **Step 1: 编写 Cline 配置页**

创建 `docs/tools/cline.md`：

```markdown
# Cline 配置

Cline 是一个 VS Code 扩展，提供 AI 编程助手功能。

## 这是什么工具

Cline 是一个编辑器插件，需要在 VS Code 中安装和使用。它支持多种 AI Provider，包括 OpenAI Compatible。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

1. 打开 VS Code
2. 点击左侧活动栏的 Cline 图标（齿轮或机器人图标）
3. 点击右上角的齿轮图标，打开设置面板

## 最短完整配置步骤

1. 在 Cline 设置面板中，找到 `API Provider` 选项
2. 选择 `OpenAI Compatible`
3. 在 `Base URL` 字段中输入：`https://api.1010101.asia/`
4. 在 `API Key` 字段中输入你的 API Key
5. 在 `Model` 字段中输入模型名（如 `gpt-4`）
6. 点击 `Verify` 或 `Save`

## 配置示例

### 设置面板字段

- **API Provider**: OpenAI Compatible
- **Base URL**: `https://api.1010101.asia/`
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Model**: `gpt-4`

## 如何验证生效

1. 在 Cline 面板中输入一个简单问题
2. 点击发送
3. 如果收到正常回复，说明配置成功

或：

1. 在设置面板中点击 `Verify` 按钮
2. 如果显示"连接成功"或类似提示，说明配置正确

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 以 `/` 结尾
- 检查网络连接是否正常

### 模型列表为空

**原因**：Base URL 错误或服务商不支持模型列表查询

**排查**：

- 检查 Base URL 是否正确
- 手动输入模型名（如 `gpt-4`）

### 连接超时

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

## 注意事项

### Base URL 格式

对于 OpenAI Compatible Provider，Base URL 应该是服务商的端点地址，而不是 OpenAI 的默认地址。

### 模型名称

某些服务商可能使用不同的模型名称。请根据服务商文档确认正确的模型名。

### 保存设置

修改设置后，确保点击 `Save` 或 `Verify` 按钮，否则配置可能不会生效。

### VS Code 重启

某些情况下，修改配置后需要重启 VS Code 才能生效。
```

- [ ] **Step 2: 提交 Cline 页**

```bash
git add docs/tools/cline.md
git commit -m "feat: add Cline configuration page"
```

---

## Task 12: 创建工具页 - Cherry Studio

**Files:**
- Create: `docs/tools/cherry-studio.md`

- [ ] **Step 1: 编写 Cherry Studio 配置页**

创建 `docs/tools/cherry-studio.md`：

```markdown
# Cherry Studio 配置

Cherry Studio 是一个跨平台桌面应用，提供 AI 对话和代码生成功能。

## 这是什么工具

Cherry Studio 是一个桌面应用，支持 Windows、macOS 和 Linux。它支持多种 AI Provider。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

1. 打开 Cherry Studio 应用
2. 点击左下角的设置图标（齿轮）
3. 进入"Provider"或"API 设置"页面

## 最短完整配置步骤

1. 在设置页面中，点击"添加 Provider"或选择已有 Provider
2. 选择 Provider 类型为"OpenAI Compatible"或"Custom"
3. 在 `API Key` 字段中输入你的 API Key
4. 在 `Base URL` 或 `API Endpoint` 字段中输入：`https://api.1010101.asia/`
5. 如需填写模型名，输入模型 ID（如 `gpt-4`）
6. 点击"保存"或"确认"

## 配置示例

### Provider 设置

- **Provider 类型**: OpenAI Compatible 或 Custom
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`
- **Model**: `gpt-4`（如需要）

## 如何验证生效

1. 返回主界面
2. 发送一个简单问题
3. 如果收到正常回复，说明配置成功

或：

1. 在设置页面中点击"测试连接"按钮
2. 如果显示"连接成功"，说明配置正确

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 模型列表为空

**原因**：Base URL 错误或服务商不支持模型列表查询

**排查**：

- 检查 Base URL 是否正确
- 手动输入模型名

### 连接超时

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

## 注意事项

### Provider 类型

Cherry Studio 支持多种 Provider 类型。选择"OpenAI Compatible"或"Custom"以使用自定义 Base URL。

### 模型选择

某些 Provider 可能要求选择模型。请根据服务商文档确认正确的模型名。

### 应用重启

修改配置后，某些情况下需要重启 Cherry Studio 才能生效。

### 平台差异

Cherry Studio 在不同平台上的界面可能略有不同，但配置流程基本一致。
```

- [ ] **Step 2: 提交 Cherry Studio 页**

```bash
git add docs/tools/cherry-studio.md
git commit -m "feat: add Cherry Studio configuration page"
```

---

## Task 13: 创建工具页 - Continue

**Files:**
- Create: `docs/tools/continue.md`

- [ ] **Step 1: 编写 Continue 配置页**

创建 `docs/tools/continue.md`：

```markdown
# Continue 配置

Continue 是一个 VS Code 和 JetBrains 扩展，提供 AI 代码助手功能。

## 这是什么工具

Continue 是一个编辑器插件，支持 VS Code 和 JetBrains IDE。它通过 `config.yaml` 配置文件管理 Provider 和模型。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Continue 的配置通过 `config.yaml` 文件管理：

1. 打开 VS Code 或 JetBrains IDE
2. 打开 Continue 扩展
3. 点击右上角的齿轮图标，选择"Open Config File"
4. 编辑 `config.yaml` 文件

配置文件位置：

- **VS Code**: `~/.continue/config.yaml`
- **JetBrains**: `~/.continue/config.yaml`

## 最短完整配置步骤

1. 打开 `config.yaml` 文件
2. 在 `models` 部分添加或修改配置：

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "你的API Key"
```

3. 保存文件
4. 在 Continue 扩展中点击"Reload config"

## 配置示例

### config.yaml 示例

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    roles:
      - "chat"
      - "edit"
```

### 使用环境变量

也可以使用环境变量或 Mission Control 的 User Secrets：

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "${OPENAI_API_KEY}"
```

## 如何验证生效

1. 保存 `config.yaml` 后，点击 Continue 扩展中的"Reload config"
2. 在 Continue 聊天面板中选择刚配置的模型
3. 发送一个简单问题
4. 如果收到正常回复，说明配置成功

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 `apiBase` 字段是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 配置未生效

**原因**：未重新加载配置

**排查**：

- 确认已保存 `config.yaml`
- 点击"Reload config"按钮
- 尝试重启 IDE

### YAML 格式错误

**原因**：`config.yaml` 格式错误

**排查**：

- 检查 YAML 缩进是否正确
- 确认字段名拼写正确
- 使用 YAML 验证工具检查格式

## 注意事项

### config.yaml vs config.json

Continue 旧版本使用 `config.json`，新版本推荐使用 `config.yaml`。如果同时存在两个文件，`config.yaml` 优先。

### Provider 类型

Continue 支持多种 Provider 类型：

- `openai`：OpenAI 或 OpenAI 兼容接口
- `anthropic`：Anthropic API
- 其他 Provider

本文档示例使用 `openai` Provider，适用于 OpenAI 兼容接口。

### 模型角色

可以为模型指定角色：

```yaml
roles:
  - "chat"    # 用于聊天
  - "edit"    # 用于编辑
  - "summarize"  # 用于总结
```

### Windows 路径

Windows 用户注意：

- 配置文件路径为 `%USERPROFILE%\.continue\config.yaml`

### Mission Control Secrets

Continue 提供 Mission Control 界面管理 API Key 等敏感信息，推荐使用 Secrets 而不是直接写在 `config.yaml` 中。
```

- [ ] **Step 2: 提交 Continue 页**

```bash
git add docs/tools/continue.md
git commit -m "feat: add Continue configuration page"
```

---

## Task 14: 创建工具页 - Roo Code

**Files:**
- Create: `docs/tools/roo-code.md`

- [ ] **Step 1: 编写 Roo Code 配置页**

创建 `docs/tools/roo-code.md`：

```markdown
# Roo Code 配置

Roo Code 是一个 VS Code 扩展，提供 AI 编程助手功能。

## 这是什么工具

Roo Code 是一个编辑器插件，需要在 VS Code 中安装和使用。它支持多种 AI Provider，包括 OpenAI Compatible。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

1. 打开 VS Code
2. 点击左侧活动栏的 Roo Code 图标
3. 点击右上角的齿轮图标，打开设置面板

## 最短完整配置步骤

1. 在 Roo Code 设置面板中，找到 `API Provider` 选项
2. 选择 `OpenAI Compatible`
3. 在 `Base URL` 字段中输入：`https://api.1010101.asia/`
4. 在 `API Key` 字段中输入你的 API Key
5. 在 `Model` 字段中输入模型 ID（如 `gpt-4`）
6. 点击 `Save` 或 `Verify`

## 配置示例

### 设置面板字段

- **API Provider**: OpenAI Compatible
- **Base URL**: `https://api.1010101.asia/`
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Model**: `gpt-4`

## 如何验证生效

1. 在 Roo Code 面板中输入一个简单问题
2. 点击发送
3. 如果收到正常回复，说明配置成功

或：

1. 在设置面板中点击 `Verify` 按钮
2. 如果显示"连接成功"，说明配置正确

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 应该是服务商的端点，而不是 `https://api.openai.com/v1`
- 检查网络连接是否正常

### 模型列表为空

**原因**：Base URL 错误或服务商不支持模型列表查询

**排查**：

- 检查 Base URL 是否正确
- 手动输入模型名

### 连接超时

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

## 注意事项

### Base URL 格式

官方文档提示，Base URL 应该是服务商的端点地址，而不是 OpenAI 的默认地址。

### Provider 选择

Roo Code 支持多种 Provider。选择 `OpenAI Compatible` 以使用自定义 Base URL。

### 模型名称

某些服务商可能使用不同的模型名称。请根据服务商文档确认正确的模型 ID。

### 配置文件

Roo Code 也支持通过配置文件管理 API 配置，支持多个 Profile。详情请参考官方文档。

### VS Code 重启

某些情况下，修改配置后需要重启 VS Code 才能生效。
```

- [ ] **Step 2: 提交 Roo Code 页**

```bash
git add docs/tools/roo-code.md
git commit -m "feat: add Roo Code configuration page"
```

---

## Task 15: 创建工具页 - Cursor

**Files:**
- Create: `docs/tools/cursor.md`

- [ ] **Step 1: 编写 Cursor 配置页**

创建 `docs/tools/cursor.md`：

```markdown
# Cursor 配置

Cursor 是一个 AI 代码编辑器，基于 VS Code 构建，内置 AI 功能。

## 这是什么工具

Cursor 是一个独立的代码编辑器，内置 AI 编程助手功能。它支持多种 AI Provider。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Cursor 的自定义 Base URL 配置入口可能因版本而异。常见入口：

1. 打开 Cursor
2. 进入设置（`Ctrl/Cmd + ,`）
3. 查找"AI"或"Model"相关设置

或：

1. 打开命令面板（`Ctrl/Cmd + Shift + P`）
2. 搜索"AI Settings"或"Model Settings"

**注意**：Cursor 的公开文档对自定义 Base URL 的说明较少，建议在应用内查找相关设置，或参考社区文档。

## 最短完整配置步骤

由于 Cursor 的公开文档对自定义 Base URL 配置说明有限，以下为通用步骤：

1. 在设置中找到"AI Provider"或"Model Provider"选项
2. 选择"Custom"或"OpenAI Compatible"
3. 在 `API Key` 字段中输入你的 API Key
4. 在 `Base URL` 字段中输入：`https://api.1010101.asia/`
5. 保存设置

## 配置示例

### 可能的设置字段

- **Provider**: Custom 或 OpenAI Compatible
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`
- **Model**: `gpt-4`（如需要）

## 如何验证生效

1. 在 Cursor 中打开一个文件
2. 使用 AI 功能（如 `Ctrl/Cmd + K`）
3. 发送一个简单请求
4. 如果收到正常回复，说明配置成功

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 设置中找不到 Base URL 选项

**原因**：Cursor 版本或界面变化

**排查**：

- 尝试在命令面板中搜索相关设置
- 查看 Cursor 官方文档或社区论坛
- 确认当前 Cursor 版本是否支持自定义 Base URL

## 注意事项

### 文档不完整

Cursor 的公开文档对自定义 Base URL 的说明较少。建议：

- 在应用内仔细查找相关设置
- 参考 Cursor 社区或论坛
- 关注 Cursor 官方文档更新

### 版本差异

Cursor 的设置界面可能因版本更新而变化。本页面基于 2026 年 5 月的信息，如有变化请以应用内实际界面为准。

### 模型选择

Cursor 可能要求选择模型。请根据服务商文档确认正确的模型名。

### BYOK 功能

Cursor 可能提供 BYOK（Bring Your Own Key）功能，允许使用自定义 API Key 和 Base URL。详情请参考 Cursor 官方文档。
```

- [ ] **Step 2: 提交 Cursor 页**

```bash
git add docs/tools/cursor.md
git commit -m "feat: add Cursor configuration page"
```

---

## Task 16: 创建工具页 - Windsurf

**Files:**
- Create: `docs/tools/windsurf.md`

- [ ] **Step 1: 编写 Windsurf 配置页**

创建 `docs/tools/windsurf.md`：

```markdown
# Windsurf 配置

Windsurf 是一个 AI 代码编辑器，提供内置 AI 编程助手功能。

## 这是什么工具

Windsurf 是一个独立的代码编辑器，内置 AI 功能。它支持 BYOK（Bring Your Own Key）模式，允许使用自定义 API Key。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Windsurf 的 API Key 配置入口：

1. 打开 Windsurf
2. 进入订阅设置页面
3. 找到"Provider API Keys"页面

或：

1. 打开设置
2. 查找"Provider"或"API Keys"相关设置

## 最短完整配置步骤

1. 进入"Provider API Keys"页面
2. 选择要配置的 Provider
3. 在 `API Key` 字段中输入你的 API Key
4. 如有 `Base URL` 或 `Endpoint` 字段，输入：`https://api.1010101.asia/`
5. 保存设置

## 配置示例

### Provider API Keys 设置

- **Provider**: 选择对应 Provider
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`（如有此字段）

## 如何验证生效

1. 在 Windsurf 中使用 AI 功能
2. 发送一个简单请求
3. 如果收到正常回复，说明配置成功

或：

1. 在模型选择中查看是否有 BYOK 标识
2. 选择 BYOK 模型进行测试

## 常见报错与排查

### 401 Unauthorized

**原因**：API Key 错误或无效

**排查**：

- 检查 API Key 是否正确
- 检查 API Key 是否有多余空格
- 确认 API Key 是否已过期或被撤销

### 404 Not Found

**原因**：Base URL 错误

**排查**：

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### Missing API Key 错误

**原因**：未正确设置 API Key

**排查**：

- 确认已在"Provider API Keys"页面填写 API Key
- 检查 API Key 是否保存成功

### BYOK 模型不可用

**原因**：BYOK 仅支持特定模型

**排查**：

- 查看 Windsurf 文档确认 BYOK 支持的模型列表
- 确认当前选择的模型支持 BYOK

## 注意事项

### BYOK 限制

Windsurf 的 BYOK 功能有以下限制：

- 仅支持特定模型
- 仅适用于个人用户
- 需要有效的 API Key

### Base URL 配置

Windsurf 的公开文档对自定义 Base URL 的说明较少。如果设置中没有 Base URL 字段，可能需要：

- 使用环境变量（如支持）
- 参考 Windsurf 社区或官方支持

### 模型选择

在 Windsurf 中，BYOK 模型通常会有特殊标识。选择带有 BYOK 标识的模型以使用自定义 API Key。

### 订阅状态

某些功能可能需要订阅。请确认你的 Windsurf 订阅状态支持 BYOK 功能。

### 版本差异

Windsurf 的设置界面可能因版本更新而变化。本页面基于 2026 年 5 月的信息，如有变化请以应用内实际界面为准。
```

- [ ] **Step 2: 提交 Windsurf 页**

```bash
git add docs/tools/windsurf.md
git commit -m "feat: add Windsurf configuration page"
```

---

## Task 17: 构建并验证站点

**Files:**
- Modify: `docs/.vitepress/config.ts`（如需调整）
- Modify: 各页面文件（如需修复）

- [ ] **Step 1: 构建静态站点**

```bash
npm run docs:build
```

预期：构建成功，输出到 `docs/.vitepress/dist` 目录。

- [ ] **Step 2: 本地预览站点**

```bash
npm run docs:preview
```

预期：预览服务器启动，访问 `http://localhost:4173` 查看站点。

- [ ] **Step 3: 验收检查清单**

检查以下项目：

- [ ] 首页首屏直接可见默认 Base URL
- [ ] 首页包含 3 步快速开始
- [ ] 首页工具卡片链接正确
- [ ] 顶部导航链接正确
- [ ] 侧边栏显示正确
- [ ] 本地搜索可用
- [ ] 9 个工具页都已创建
- [ ] 每个工具页包含配置位置、步骤、示例、验证、报错
- [ ] 通用说明页都已创建
- [ ] FAQ 页面创建完成
- [ ] 所有页面无占位内容
- [ ] 所有链接可访问

- [ ] **Step 4: 修复发现的问题**

如果发现问题，修复后重新构建和验证。

- [ ] **Step 5: 提交最终版本**

```bash
git add .
git commit -m "feat: complete static documentation site"
```

---

## Task 18: 准备部署

**Files:**
- Create: `.gitignore`（如不存在）
- Modify: `package.json`（添加部署脚本）

- [ ] **Step 1: 更新 .gitignore**

创建或更新 `.gitignore`：

```
node_modules/
docs/.vitepress/dist/
docs/.vitepress/cache/
.DS_Store
```

- [ ] **Step 2: 添加部署脚本（可选）**

如果部署到 GitHub Pages，在 `package.json` 中添加：

```json
{
  "scripts": {
    "docs:deploy": "npm run docs:build && gh-pages -d docs/.vitepress/dist"
  }
}
```

需要安装 `gh-pages`：

```bash
npm install -D gh-pages
```

- [ ] **Step 3: 提交部署配置**

```bash
git add .gitignore package.json
git commit -m "chore: add deployment configuration"
```

---

## 自检清单

在完成所有任务后，对照以下清单进行自检：

### Spec 覆盖检查

- [x] Spec 第 1 节"项目目标"：首页快速分流、工具页单页闭环 → Task 2-16
- [x] Spec 第 2 节"目标用户"：内容组织优先熟手、兼顾新手 → 所有页面内容策略
- [x] Spec 第 3 节"设计原则"：可执行优先、自包含、本地图片 → 所有页面
- [x] Spec 第 4 节"范围"：9 个工具、3 个平台 → Task 8-16
- [x] Spec 第 5 节"信息架构"：首页、通用说明、工具配置、FAQ → Task 2-7, 8-16
- [x] Spec 第 6 节"内容组织"：首页 3 步快速开始、工具页模板 → Task 2, 8-16
- [x] Spec 第 7 节"视觉与交互设计"：VitePress 默认 home layout → Task 1-2
- [x] Spec 第 8 节"资料整理策略"：自包含、不放外链 → 所有页面
- [x] Spec 第 9 节"报错与 FAQ 组织策略"：工具页自带报错、FAQ 只留共性问题 → Task 7, 8-16
- [x] Spec 第 10 节"技术方案"：VitePress、纯静态、本地搜索 → Task 1
- [x] Spec 第 11 节"目录结构"：docs/index.md、guide/、tools/ → Task 1-16
- [x] Spec 第 12 节"首版页面清单"：所有页面创建 → Task 2-16
- [x] Spec 第 13 节"页面行为要求"：首页分流、工具页闭环、搜索可用 → Task 17
- [x] Spec 第 14 节"非目标"：不做登录、后端等 → 未包含
- [x] Spec 第 15 节"验收标准"：13 条验收标准 → Task 17
- [x] Spec 第 16 节"单页完成定义"：每个工具页完整 → Task 8-16

### 占位符扫描

- [x] 无"TBD"、"TODO"、"待补充"、"后续完善"等占位符
- [x] 无"Add appropriate error handling"等模糊描述
- [x] 所有代码步骤都包含完整代码
- [x] 所有命令步骤都包含完整命令

### 类型一致性

- [x] 配置文件字段名在各工具页中一致使用官方名称
- [x] Base URL 格式统一为 `https://api.1010101.asia/`
- [x] API Key 示例格式统一

### 范围检查

- [x] 计划聚焦于单个目标：构建纯静态文档站
- [x] 无需分解为多个子项目
- [x] 每个任务都可独立完成并验证

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-01-api-key-base-url-doc-site.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
