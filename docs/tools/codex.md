# Codex 配置

Codex 是 OpenAI 提供的命令行工具，用于在终端中使用 OpenAI 的代码生成能力。

## 先判断：这个工具接哪种接口

Codex 主要对接 **OpenAI Responses** 格式。

Base URL 需要带 `/v1` 后缀。

## 配置前你要准备什么

- 有效的 API Key
- Base URL：`https://api.1010101.asia/v1`（带 `/v1` 后缀）

## 这些字段分别填哪里

Codex 支持两种配置方式：

1. **配置文件**：`~/.codex/config.toml` + `~/.codex/auth.json`
2. **环境变量**：`OPENAI_API_KEY` 和 `OPENAI_BASE_URL`

## baseURL 这一页该怎么填

Codex 的 Base URL 应该带 `/v1` 后缀。

正确示例：`https://api.1010101.asia/v1`

错误示例：`https://api.1010101.asia`（缺少 `/v1`）

## 模型名怎么填

Codex 默认使用 `gpt-5.3-codex` 模型。

可以在配置文件中指定模型，也可以去模型广场确认最新可用模型。

## 最短完整配置步骤

### Windows

1. 安装 Node.js（需 18+）：同 Claude Code
2. 安装 Codex：

```bash
npm i -g @openai/codex --registry=https://registry.npmmirror.com
```

3. 创建 `C:\Users\你的用户名\.codex\config.toml`：

```toml
model_provider = "custom"
model = "gpt-5.3-codex"
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

5. 启动：

```bash
codex
```

### Linux

1. 安装 Codex：

```bash
npm install -g @openai/codex
```

2. 配置环境变量（bash）：

```bash
echo 'export OPENAI_BASE_URL="https://api.1010101.asia/v1"' >> ~/.bashrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.bashrc
source ~/.bashrc
```

3. 启动：

```bash
codex
```

### Mac

1. 安装 Codex：

```bash
npm install -g @openai/codex
```

2. 配置环境变量（zsh）：

```bash
echo 'export OPENAI_BASE_URL="https://api.1010101.asia/v1"' >> ~/.zshrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.zshrc
source ~/.zshrc
```

3. 启动：

```bash
codex
```

## 如何验证是否成功

1. 启动 Codex：

```bash
codex
```

2. 发送一个简单代码生成请求
3. 如果收到正常回复，说明配置成功

## 常见错误与排查

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
- 确认 Base URL **带** `/v1` 后缀
- 检查网络连接是否正常

### 配置文件未生效

**原因**：配置文件位置错误或格式错误

**排查**：
- 确认配置文件路径为 `~/.codex/config.toml` 和 `~/.codex/auth.json`
- 检查 TOML 格式是否正确
- 确认已保存文件

## 补充说明

### 配置文件优先级

配置文件优先于环境变量。如果同时设置了配置文件和环境变量，配置文件优先生效。

### 登录模式 vs API Key 模式

Codex 支持两种模式：
- **登录模式**：使用 ChatGPT 账号登录，无需 API Key
- **API Key 模式**：使用 API Key，适合自定义 Base URL

本文档说明 API Key 模式。如需使用登录模式，请参考官方文档。

### Windows 路径

Windows 用户注意：
- 配置文件路径为 `%USERPROFILE%\.codex\config.toml` 和 `%USERPROFILE%\.codex\auth.json`
- 环境变量设置使用 PowerShell 或系统环境变量设置

### VSCode 扩展

如果要在 VSCode 中使用 Codex：

1. 在 VSCode 扩展市场搜索并安装 **Codex - OpenAI's coding agent**
2. 在 `~/.codex/auth.json`：

```json
{
  "OPENAI_API_KEY": "你的API密钥"
}
```

3. 在 `~/.codex/config.toml`：

```toml
model_provider = "custom"
model = "gpt-5.3-codex"
model_reasoning_effort = "xhigh"
disable_response_storage = true

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://api.1010101.asia/v1"
```
