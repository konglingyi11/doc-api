---
layout: home

hero:
  name: "途联通证配置文档"
  text: "先锁定你正在用的工具"
  tagline: "不同工具的接口格式、baseURL 写法、模型字段要求可能不同，先进入对应工具页，再按该工具的要求填写。"
  actions:
    - theme: brand
      text: 先选工具
      link: /tools/claude-code
    - theme: alt
      text: 先看通用判断
      link: /guide/common-principles

features:
  - title: 先选工具
    details: 先确认你正在使用的是 Claude Code、Codex、OpenCode，还是编辑器插件或桌面客户端，再进入对应工具页。
  - title: 先判断接口格式
    details: 先看该工具走的是 OpenAI Chat、OpenAI Responses，还是 Anthropic Messages，不同格式的字段和路径要求不同。
  - title: 再填写关键字段
    details: 按工具页要求填写 API Key、baseURL、模型名或 Provider，不要把一个工具的写法直接套到另一个工具。
  - title: 最后验证是否成功
    details: 配完后立即发起一次真实请求，检查是否出现 401、404、模型不存在或接口格式不匹配等问题。
---

## 第一步：先锁定你正在用的工具

| 工具 | 先看什么 |
|------|----------|
| [Claude Code](/tools/claude-code) | 先看环境变量名和 Anthropic 接口配置位置 |
| [Codex](/tools/codex) | 先看登录方式、API Key 模式和自定义端点入口 |
| [OpenCode](/tools/open-code) | 先看 `/connect` 流程和配置文件里的 provider 写法 |
| [Cline](/tools/cline) | 先看 Provider 类型和 Base URL 字段怎么填 |
| [Cherry Studio](/tools/cherry-studio) | 先看 Provider 选择、接口地址和模型填写位置 |
| [Continue](/tools/continue) | 先看 provider 类型、配置文件结构和模型字段 |
| [Roo Code](/tools/roo-code) | 先看 OpenAI Compatible Provider 和 Base URL 入口 |
| [Cursor](/tools/cursor) | 先看当前版本有没有自定义接口入口，以及 BYOK 相关设置 |
| [Windsurf](/tools/windsurf) | 先看模型提供方、API Key 入口和是否支持自定义端点 |

先锁定工具，再按该工具页的步骤配置。进入具体工具页后，再看该页告诉你的 baseURL 是否要带 `/v1`，不要在首页先猜。

## 接入判断速览

- **OpenAI Chat**：常见于较早的兼容接入方式，重点看 `messages` 结构、模型字段名称，以及工具要求的请求路径。
- **OpenAI Responses**：常见于更新的 OpenAI 风格接入，重点看工具是否要求 `input`、Responses 端点，或额外的响应格式字段。
- **Anthropic Messages**：常见于 Claude 原生接入，重点看 Anthropic 的请求头、`messages` 格式，以及工具是否直接支持 Anthropic。

首页只帮你先判断大方向，不替具体工具先下结论。不同工具即使都支持“自定义接口”，填写位置、字段名称、是否要补 `/v1` 也可能不同。

## 通用说明

如果你还没判断清楚，可以先补这几页，再回到对应工具页继续配置：

- [通用配置原则](/guide/common-principles)
- [什么是 API Key](/guide/api-key)
- [什么是 Base URL](/guide/base-url)
- [如何验证配置是否生效](/guide/verify)

## 常见问题

如果你已经选好了工具，但还是接不通，优先排查这些高频问题：

- Base URL 路径是否缺少或多写了 `/v1`
- 是否出现 `401 Unauthorized`
- 模型名是否填错，或工具要求的模型字段与你使用的接口格式不一致
- 工具要求的是 OpenAI Chat、OpenAI Responses，还是 Anthropic Messages

更多排查方法见 [常见问题](/guide/faq)。
