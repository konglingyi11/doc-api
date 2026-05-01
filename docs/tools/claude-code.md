# Claude Code 配置

Claude Code 是 Anthropic 官方提供的命令行工具，用于在终端中与 Claude 交互。

## 这是什么工具

Claude Code 是一个 CLI 工具，需要在终端中使用。它支持通过环境变量或配置文件设置 API Key 和 Base URL。

## 配置前需要准备什么

- 有效的 API Key
- 示例 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Claude Code 的配置通过以下方式：

1. **环境变量**：在终端中设置环境变量
2. **配置文件**：编辑 `~/.claude/settings.json` 或项目 `.claude/settings.json`

## 最短完整配置步骤

### 方法 1：使用环境变量（推荐）

1. 打开终端
2. 设置环境变量：

```bash
export ANTHROPIC_AUTH_TOKEN="你的API Key"
export ANTHROPIC_BASE_URL="https://api.1010101.asia"
```

3. 启动 Claude Code：

```bash
claude
```

### 方法 2：使用配置文件

1. 创建或编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.1010101.asia"
  }
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
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.1010101.asia", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的API Key", [System.EnvironmentVariableTarget]::User)
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
