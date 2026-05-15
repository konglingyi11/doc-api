# OpenCode 配置教程

OpenCode 是一个开源命令行 AI 编程工具。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 OpenCode。
- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。

## 这个工具使用什么接口

OpenCode 支持多种 Provider。

本文示例使用 `openai` 类型，适用于 OpenAI 兼容接口。

## 配置步骤

OpenCode 可以用交互式命令配置，也可以编辑配置文件。

### 方法一：使用交互式配置

1. 启动 OpenCode：

```bash
opencode
```

2. 运行连接命令：

```text
/connect
```

3. 选择 Provider，例如 OpenAI Compatible。
4. 输入 API Key。
5. 输入 Base URL：`https://api.1010101.asia/`。
6. 选择模型。

### 方法二：使用配置文件

1. 创建或编辑 `~/.config/opencode/opencode.json`。
2. 写入 Provider 和模型配置。
3. 保存文件。
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

## 如何验证

1. 启动 OpenCode：

```bash
opencode
```

2. 发送一个简单问题。
3. 如果能收到正常回复，说明配置成功。

也可以运行：

```text
/models
```

如果能看到可用模型，说明配置基本可用。

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

### 模型列表为空

通常是 Base URL、API Key 或模型列表查询有问题。

请检查：

- Base URL 是否填写正确。
- API Key 是否填写正确。
- 服务商是否支持模型列表查询。
- 是否可以手动指定模型名。

### 配置文件未生效

通常是配置文件位置或 JSON 格式有问题。

请检查：

- 配置文件路径是否正确。
- JSON 格式是否正确。
- 文件是否已经保存。

## 注意事项

- 配置文件中的 Provider 设置通常优先于环境变量。
- OpenCode 支持 `openai`、`anthropic`、`bedrock` 等 Provider 类型。
- 模型格式是 `provider_id/model_id`，例如 `custom/gpt-4`。
- Windows 配置文件路径通常是 `%APPDATA%\opencode\opencode.json`。
- 认证信息通常保存在 `~/.local/share/opencode/auth.json`，一般不需要手动编辑。
