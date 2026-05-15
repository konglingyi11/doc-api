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
