# OpenClaw 配置教程

OpenClaw 是一个开源命令行 AI 编程代理工具，支持通过 OpenAI 兼容接口接入自定义模型服务。

本文介绍如何配置 API Key、Base URL 和模型名称。

![OpenClaw 标识](/images/openclaw/openclaw-logo.svg)

## 准备工作

请先准备：

- 已安装 OpenClaw。
- 有效的 API Key。
- Base URL：`https://api.1010101.asia/v1`。
- 可用模型名称，例如 `gpt-5.4`。

## 这个工具使用什么接口

OpenClaw 支持多种接口兼容模式。

接入 OpenAI 兼容服务时，通常选择 OpenAI 兼容接口，并填写带 `/v1` 后缀的 Base URL。

正确示例：

```text
https://api.1010101.asia/v1
```

错误示例：

```text
https://api.1010101.asia
```

## 配置步骤

OpenClaw 可以通过首次启动向导配置，也可以直接编辑配置文件。

### 方法一：使用启动向导

1. 启动 OpenClaw：

```bash
openclaw
```

2. 根据提示选择自定义或 OpenAI 兼容 Provider。
3. 填写 API Key。
4. 填写 Base URL：`https://api.1010101.asia/v1`。
5. 填写模型名称，例如 `gpt-5.4`。
6. 保存后进入对话界面，发送一个简单请求验证。

### 方法二：使用配置文件

1. 创建或编辑 `~/.openclaw/openclaw.json`。
2. 在 `models.providers` 中增加自定义 Provider。
3. 在 `models.primary` 中引用要使用的模型。
4. 保存文件后重新启动 OpenClaw。

## 配置示例

`~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "primary": {
      "provider": "tulian",
      "model": "gpt-5.4"
    },
    "providers": {
      "tulian": {
        "baseUrl": "https://api.1010101.asia/v1",
        "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "api": "openai-responses"
      }
    }
  }
}
```

如果当前服务商只支持普通 OpenAI Chat Completions 接口，可以把 `api` 改成工具支持的 OpenAI 兼容类型，例如 `openai`。如果服务商明确支持 Responses 接口，优先使用 `openai-responses`。

## 如何验证

1. 启动 OpenClaw：

```bash
openclaw
```

2. 发送一个简单请求，例如：

```text
用 JavaScript 写一个返回当前时间的函数
```

3. 如果能正常返回结果，说明 API Key、Base URL 和模型名称基本可用。

## 常见问题

### 401 Unauthorized

通常是 API Key 有问题。

请检查：

- API Key 是否填错。
- 前后是否有空格。
- Key 是否已经失效。
- Key 是否有权限访问当前模型。

### 404 Not Found

通常是 Base URL 或接口路径有问题。

请检查：

- Base URL 是否带 `/v1`。
- 是否把 `/v1` 写了两次。
- Provider 的接口类型是否和服务商兼容。

### 模型不可用

通常是模型名称或权限问题。

请检查：

- `models.primary.model` 是否写成服务商提供的真实模型名。
- API Key 是否有该模型的调用权限。
- Provider 名称是否和 `models.providers` 中的键一致。

### 配置文件未生效

通常是路径、JSON 格式或字段名称有问题。

请检查：

- 配置文件是否位于 `~/.openclaw/openclaw.json`。
- JSON 是否有多余逗号。
- `baseUrl`、`apiKey`、`api` 字段大小写是否正确。
- 修改后是否重新启动了 OpenClaw。

## 注意事项

- 不同版本的 OpenClaw 支持的 `api` 类型可能不同，请以当前版本提示和官方文档为准。
- Base URL 通常需要写到 `/v1`。
- Windows 路径可以写成 `%USERPROFILE%\.openclaw\openclaw.json`。
- 不建议把真实 API Key 提交到 Git 仓库或截图公开分享。
- 当前可公开抓取的中文教程页面未提供配置步骤截图，因此本页只放置 OpenClaw 标识和文字步骤。
