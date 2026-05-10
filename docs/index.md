---
layout: home

hero:
  name: "途联通证配置文档"
  text: "选择工具，查看配置方法"
  tagline: "这里整理了常见 AI 编程工具的 API Key、Base URL 和模型配置方法。先找到你正在用的工具，再按对应页面填写。"
  actions:
    - theme: brand
      text: 选择工具
      link: /tools/claude-code
    - theme: alt
      text: 查看通用原则
      link: /guide/common-principles

features:
  - title: 找到对应工具
    details: Claude Code、Codex、OpenCode、编辑器插件和桌面客户端的配置入口不同，先进入对应页面。
  - title: 确认接口格式
    details: 看清工具使用 OpenAI Chat、OpenAI Responses 还是 Anthropic Messages，不同格式的路径和字段不一样。
  - title: 填写必要字段
    details: API Key、baseURL、模型名和 Provider 按工具页填写，不要直接套用别的工具配置。
  - title: 发请求验证
    details: 配完后测试一次，重点检查 401、404、模型不存在和接口格式不匹配。
---

## 选择你正在用的工具

| 工具 | 重点确认 |
|------|----------|
| [Claude Code](/tools/claude-code) | 环境变量名和 Anthropic 接口配置位置 |
| [Codex](/tools/codex) | 登录方式、API Key 模式和自定义端点入口 |
| [OpenCode](/tools/open-code) | `/connect` 流程和配置文件里的 provider 写法 |
| [Cline](/tools/cline) | Provider 类型和 Base URL 字段 |
| [Cherry Studio](/tools/cherry-studio) | Provider、接口地址和模型填写位置 |
| [Continue](/tools/continue) | provider 类型、配置文件结构和模型字段 |
| [Roo Code](/tools/roo-code) | OpenAI Compatible Provider 和 Base URL 入口 |
| [Cursor](/tools/cursor) | 当前版本是否支持自定义接口，以及 BYOK 相关设置 |
| [Windsurf](/tools/windsurf) | 模型提供方、API Key 入口和自定义端点支持情况 |

选好工具后，按对应页面操作。baseURL 是否要带 `/v1`，以工具页说明为准。

## 接入判断速览

- **OpenAI Chat**：常见的兼容接入方式，注意 `messages` 结构、模型字段和请求路径。
- **OpenAI Responses**：较新的 OpenAI 风格接口，注意 `input`、Responses 端点和响应格式要求。
- **Anthropic Messages**：Claude 原生接口常用格式，注意请求头、`messages` 格式和工具是否直接支持 Anthropic。

这里用于判断大方向，不替具体工具下结论。即使都支持“自定义接口”，不同工具的填写位置、字段名、`/v1` 规则也可能不同。

## 通用说明

不确定该怎么填时，先看这几页：

- [通用配置原则](/guide/common-principles)
- [什么是 API Key](/guide/api-key)
- [什么是 Base URL](/guide/base-url)
- [如何验证配置是否生效](/guide/verify)

## 常见问题

选好工具后仍然接不通，优先查这些问题：

- Base URL 路径是否缺少或多写了 `/v1`
- 是否出现 `401 Unauthorized`
- 模型名是否填错，或工具要求的模型字段与你使用的接口格式不一致
- 工具要求的是 OpenAI Chat、OpenAI Responses，还是 Anthropic Messages

更多排查方法见 [常见问题](/guide/faq)。
