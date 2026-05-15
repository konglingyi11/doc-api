# Codex 配置教程

Codex 是 OpenAI 提供的命令行代码助手。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 Node.js 18 或更高版本。
- 有效的 API Key。
- Base URL：`https://api.1010101.asia/v1`。

## 这个工具使用什么接口

Codex 主要使用 **OpenAI Responses** 格式。

Base URL 需要带 `/v1` 后缀。

正确示例：

```text
https://api.1010101.asia/v1
```

错误示例：

```text
https://api.1010101.asia
```

## 配置步骤

Codex 支持两种常用方式：

- 配置文件：`~/.codex/config.toml` 和 `~/.codex/auth.json`。
- 环境变量：`OPENAI_API_KEY` 和 `OPENAI_BASE_URL`。

### Windows

1. 安装 Node.js 18+。
2. 安装 Codex：

```bash
npm i -g @openai/codex --registry=https://registry.npmmirror.com
```

3. 创建 `C:\Users\你的用户名\.codex\config.toml`：

```toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://api.1010101.asia/v1"
```

4. 创建 `C:\Users\你的用户名\.codex\auth.json`：

```json
{
  "OPENAI_API_KEY": "你的API密钥"
}
```

5. 启动 Codex：

```bash
codex
```

### Linux

1. 安装 Codex：

```bash
npm install -g @openai/codex
```

2. 配置环境变量：

```bash
echo 'export OPENAI_BASE_URL="https://api.1010101.asia/v1"' >> ~/.bashrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.bashrc
source ~/.bashrc
```

3. 启动 Codex：

```bash
codex
```

### macOS

1. 安装 Codex：

```bash
npm install -g @openai/codex
```

2. 配置环境变量：

```bash
echo 'export OPENAI_BASE_URL="https://api.1010101.asia/v1"' >> ~/.zshrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.zshrc
source ~/.zshrc
```

3. 启动 Codex：

```bash
codex
```

## 配置示例

### 配置文件方式

`~/.codex/config.toml`：

```toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://api.1010101.asia/v1"
```

`~/.codex/auth.json`：

```json
{
  "OPENAI_API_KEY": "你的API密钥"
}
```

### 环境变量方式

```bash
export OPENAI_BASE_URL="https://api.1010101.asia/v1"
export OPENAI_API_KEY="你的API密钥"
```

## 模型名称

Codex 默认使用 `gpt-5.4` 模型。

也可以在配置文件中指定其他模型。

常见模型：

- `gpt-5.4`
- `gpt-4o`
- `gpt-4-turbo`

模型名称可能变化，请以服务商提供的模型列表为准。

## 如何验证

1. 启动 Codex：

```bash
codex
```

2. 发送一个简单代码生成请求。
3. 如果能收到正常回复，说明配置成功。

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

- Base URL 是否写错。
- `/v1` 是否多写或少写。
- 当前工具是否会自动补路径。

### 配置文件未生效

通常是文件位置或格式有问题。

请检查：

- 配置文件是否在 `~/.codex/config.toml`。
- API Key 是否在 `~/.codex/auth.json`。
- TOML 和 JSON 格式是否正确。
- 文件是否已经保存。

## 注意事项

- 配置文件通常优先于环境变量。
- API Key 模式适合自定义 Base URL。
- 登录模式使用 ChatGPT 账号，不需要 API Key。
- Windows 路径可以写成 `%USERPROFILE%\.codex\config.toml` 和 `%USERPROFILE%\.codex\auth.json`。

## VS Code 扩展

如果要在 VS Code 中使用 Codex：

1. 在 VS Code 扩展市场搜索并安装 **Codex - OpenAI's coding agent**。
2. 在 `~/.codex/auth.json` 写入：

```json
{
  "OPENAI_API_KEY": "你的API密钥"
}
```

3. 在 `~/.codex/config.toml` 写入：

```toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://api.1010101.asia/v1"
```
