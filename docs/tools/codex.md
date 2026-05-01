# Codex 配置

Codex 是 OpenAI 提供的命令行工具，用于在终端中使用 OpenAI 的代码生成能力。

## 这是什么工具

Codex 是一个 CLI 工具，支持通过 ChatGPT 登录或 API Key 模式使用。本文档说明 API Key 模式的配置方法。

## 配置前需要准备什么

- 有效的 API Key
- 示例 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Codex 的配置通过以下方式：

1. **配置文件**：编辑 `~/.codex/config.toml`
2. **环境变量**：设置 OpenAI API Key

## 最短完整配置步骤

### 方法 1：使用配置文件

1. 创建 `~/.codex/auth.json`：

```json
{
  "OPENAI_API_KEY": "你的API Key"
}
```

2. 创建或编辑 `~/.codex/config.toml`：

```toml
model_provider = "custom"
model = "gpt-4o"

[model_providers.custom]
base_url = "https://api.1010101.asia/v1"
```

3. 保存文件
4. 启动 Codex：

```bash
codex
```

### 方法 2：使用环境变量

1. 设置环境变量：

```bash
export OPENAI_BASE_URL="https://api.1010101.asia/v1"
export OPENAI_API_KEY="你的API Key"
```

2. 启动 Codex：

```bash
codex
```

## 配置示例

### 配置文件方式

**auth.json：**

```json
{
  "OPENAI_API_KEY": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**config.toml：**

```toml
model_provider = "custom"
model = "gpt-4o"

[model_providers.custom]
base_url = "https://api.1010101.asia/v1"
```

### 环境变量方式（macOS/Linux）

```bash
export OPENAI_BASE_URL="https://api.1010101.asia/v1"
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
codex
```

### 环境变量方式（Windows PowerShell）

```powershell
[System.Environment]::SetEnvironmentVariable("OPENAI_BASE_URL", "https://api.1010101.asia/v1", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", [System.EnvironmentVariableTarget]::User)
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
