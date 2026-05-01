# Continue 配置

Continue 是一个 VS Code 和 JetBrains 扩展，提供 AI 代码助手功能。

## 这是什么工具

Continue 是一个编辑器插件，支持 VS Code 和 JetBrains IDE。它通过 `config.yaml` 配置文件管理 Provider 和模型。

## 配置前需要准备什么

- 有效的 API Key
- 示例 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Continue 的配置通过 `config.yaml` 文件管理：

1. 打开 VS Code 或 JetBrains IDE
2. 打开 Continue 扩展
3. 点击右上角的齿轮图标，选择"Open Config File"
4. 编辑 `config.yaml` 文件

配置文件位置：

- **VS Code**: `~/.continue/config.yaml`
- **JetBrains**: `~/.continue/config.yaml`

## 最短完整配置步骤

1. 打开 `config.yaml` 文件
2. 在 `models` 部分添加或修改配置：

```yaml
models:
  - name: "Custom GPT-4"
    provider: "openai"
    model: "gpt-4"
    apiBase: "https://api.1010101.asia/"
    apiKey: "你的API Key"
```

3. 保存文件
4. 在 Continue 扩展中点击"Reload config"

## 配置示例

### config.yaml 示例

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

## 如何验证生效

1. 保存 `config.yaml` 后，点击 Continue 扩展中的"Reload config"
2. 在 Continue 聊天面板中选择刚配置的模型
3. 发送一个简单问题
4. 如果收到正常回复，说明配置成功

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

- 检查 `apiBase` 字段是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 配置未生效

**原因**：未重新加载配置

**排查**：

- 确认已保存 `config.yaml`
- 点击"Reload config"按钮
- 尝试重启 IDE

### YAML 格式错误

**原因**：`config.yaml` 格式错误

**排查**：

- 检查 YAML 缩进是否正确
- 确认字段名拼写正确
- 使用 YAML 验证工具检查格式

## 注意事项

### config.yaml vs config.json

Continue 旧版本使用 `config.json`，新版本推荐使用 `config.yaml`。如果同时存在两个文件，`config.yaml` 优先。

### Provider 类型

Continue 支持多种 Provider 类型：

- `openai`：OpenAI 或 OpenAI 兼容接口
- `anthropic`：Anthropic API
- 其他 Provider

本文档示例使用 `openai` Provider，适用于 OpenAI 兼容接口。

### 模型角色

可以为模型指定角色：

```yaml
roles:
  - "chat"    # 用于聊天
  - "edit"    # 用于编辑
  - "summarize"  # 用于总结
```

### Windows 路径

Windows 用户注意：

- 配置文件路径为 `%USERPROFILE%\.continue\config.yaml`

### Mission Control Secrets

Continue 提供 Mission Control 界面管理 API Key 等敏感信息，推荐使用 Secrets 而不是直接写在 `config.yaml` 中。
