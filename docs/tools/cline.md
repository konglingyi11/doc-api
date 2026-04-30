# Cline 配置

Cline 是一个 VS Code 扩展，提供 AI 编程助手功能。

## 这是什么工具

Cline 是一个编辑器插件，需要在 VS Code 中安装和使用。它支持多种 AI Provider，包括 OpenAI Compatible。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

1. 打开 VS Code
2. 点击左侧活动栏的 Cline 图标（齿轮或机器人图标）
3. 点击右上角的齿轮图标，打开设置面板

## 最短完整配置步骤

1. 在 Cline 设置面板中，找到 `API Provider` 选项
2. 选择 `OpenAI Compatible`
3. 在 `Base URL` 字段中输入：`https://api.1010101.asia/`
4. 在 `API Key` 字段中输入你的 API Key
5. 在 `Model` 字段中输入模型名（如 `gpt-4`）
6. 点击 `Verify` 或 `Save`

## 配置示例

### 设置面板字段

- **API Provider**: OpenAI Compatible
- **Base URL**: `https://api.1010101.asia/`
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Model**: `gpt-4`

## 如何验证生效

1. 在 Cline 面板中输入一个简单问题
2. 点击发送
3. 如果收到正常回复，说明配置成功

或：

1. 在设置面板中点击 `Verify` 按钮
2. 如果显示"连接成功"或类似提示，说明配置正确

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

### 模型列表为空

**原因**：Base URL 错误或服务商不支持模型列表查询

**排查**：

- 检查 Base URL 是否正确
- 手动输入模型名（如 `gpt-4`）

### 连接超时

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

## 注意事项

### Base URL 格式

对于 OpenAI Compatible Provider，Base URL 应该是服务商的端点地址，而不是 OpenAI 的默认地址。

### 模型名称

某些服务商可能使用不同的模型名称。请根据服务商文档确认正确的模型名。

### 保存设置

修改设置后，确保点击 `Save` 或 `Verify` 按钮，否则配置可能不会生效。

### VS Code 重启

某些情况下，修改配置后需要重启 VS Code 才能生效。
