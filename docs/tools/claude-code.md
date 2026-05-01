# Claude Code 配置

Claude Code 是 Anthropic 官方提供的命令行工具，用于在终端中与 Claude 交互。

## 先判断：这个工具接哪种接口

Claude Code 主要对接 **Anthropic Messages** 格式。

Base URL 通常不带 `/v1` 后缀，直接填写根地址即可。

## 配置前你要准备什么

- 有效的 API Key
- Base URL：`https://api.1010101.asia`（不带尾部斜杠）

## 这些字段分别填哪里

Claude Code 支持两种配置方式：

1. **配置文件**：`~/.claude/settings.json`
2. **环境变量**：`ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`

## baseURL 这一页该怎么填

Claude Code 的 Base URL 应该填根地址，**不带** `/v1` 后缀。

正确示例：`https://api.1010101.asia`

错误示例：`https://api.1010101.asia/v1`（不要这样写）

## 模型名怎么填

Claude Code 默认使用 Claude 3.5 Sonnet，通常不需要手动指定模型名。

如果需要切换模型，可以在启动时指定：

```bash
claude --model claude-3-5-sonnet-20241022
```

也可以去模型广场确认最新可用模型。

## 最短完整配置步骤

### Windows

#### 方法 1：配置文件

1. 安装 Node.js（需 18+）：访问 [nodejs.org](https://nodejs.org/) 下载 LTS 版本
2. 安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

3. 编辑 `C:\Users\你的用户名\.claude\settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API密钥",
    "ANTHROPIC_BASE_URL": "https://api.1010101.asia"
  }
}
```

4. 启动：

```bash
claude
```

#### 方法 2：环境变量（PowerShell 永久设置）

```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.1010101.asia", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的API密钥", [System.EnvironmentVariableTarget]::User)
```

### Linux

1. 安装 Node.js：

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. 安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
```

3. 配置环境变量（bash）：

```bash
echo 'export ANTHROPIC_BASE_URL="https://api.1010101.asia"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="你的API密钥"' >> ~/.bashrc
source ~/.bashrc
```

4. 启动：

```bash
claude
```

### Mac

1. 安装 Node.js：

```bash
brew install node
```

2. 安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
```

3. 配置环境变量（zsh）：

```bash
echo 'export ANTHROPIC_BASE_URL="https://api.1010101.asia"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="你的API密钥"' >> ~/.zshrc
source ~/.zshrc
```

4. 启动：

```bash
claude
```

## 如何验证是否成功

1. 启动 Claude Code：

```bash
claude
```

2. 发送一个简单问题，如："你好"
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
- 确认 Base URL **不带** `/v1` 后缀
- 确认 Base URL **不带**尾部斜杠
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
- 确认环境变量已设置：`echo $ANTHROPIC_AUTH_TOKEN`
- 如果使用配置文件，确认文件路径正确
- 尝试重新打开终端会话

## 补充说明

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

### VSCode 扩展

如果要在 VSCode 中使用 Claude Code：

1. 在 VSCode 扩展市场搜索并安装 **Claude Code for VS Code**
2. 在 `.claude/config.json` 中添加：

```json
{
  "primaryApiKey": "你的API密钥"
}
```

**注意**：是 `config.json`，不是 `settings.json`。Cursor 编辑器使用相同配置。
