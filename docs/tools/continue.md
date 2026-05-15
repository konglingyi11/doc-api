# Continue 配置教程

Continue 是一个 VS Code 和 JetBrains AI 代码助手扩展。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 VS Code 或 JetBrains IDE。
- 已安装 Continue 扩展。
- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。

## 这个工具使用什么接口

Continue 通过配置文件管理 Provider 和模型。

本文示例使用 `openai` Provider，适用于 OpenAI 兼容接口。

## 配置步骤

1. 打开 VS Code 或 JetBrains IDE。
2. 打开 Continue 扩展。
3. 点击右上角的齿轮图标。
4. 选择 `Open Config File`。
5. 编辑 `config.yaml`。
6. 在 `models` 中添加模型配置。
7. 保存文件。
8. 在 Continue 扩展中点击 `Reload config`。

配置文件位置：

- VS Code：`~/.continue/config.yaml`
- JetBrains：`~/.continue/config.yaml`
- Windows：`%USERPROFILE%\.continue\config.yaml`

## 配置示例

### 直接填写 API Key

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "你的API Key"
```

### 指定模型角色

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    roles:
      - "chat"
      - "edit"
```

### 使用环境变量

也可以使用环境变量或 Mission Control 的 User Secrets：

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "${OPENAI_API_KEY}"
```

## 如何验证

1. 保存 `config.yaml`。
2. 点击 Continue 扩展中的 `Reload config`。
3. 在聊天面板中选择刚配置的模型。
4. 发送一个简单问题。
5. 如果能收到正常回复，说明配置成功。

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

### 配置未生效

通常是没有重新加载配置。

请检查：

- `config.yaml` 是否已经保存。
- 是否点击了 `Reload config`。
- 是否需要重启 IDE。

### YAML 格式错误

通常是缩进或字段名有问题。

请检查：

- YAML 缩进是否正确。
- 字段名是否拼写正确。
- 字符串是否需要加引号。

## 注意事项

- Continue 旧版本使用 `config.json`。
- 新版本推荐使用 `config.yaml`。
- 如果两个文件同时存在，`config.yaml` 优先。
- `openai` Provider 适用于 OpenAI 或 OpenAI 兼容接口。
- Mission Control 可以管理 API Key 等敏感信息，建议用 Secrets 保存 Key。
