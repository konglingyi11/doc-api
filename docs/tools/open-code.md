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
