# Cherry Studio 配置

Cherry Studio 是一个跨平台桌面应用，提供 AI 对话和代码生成功能。

## 这是什么工具

Cherry Studio 是一个桌面应用，支持 Windows、macOS 和 Linux。它支持多种 AI Provider。

## 配置前需要准备什么

- 有效的 API Key
- 示例 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

1. 打开 Cherry Studio 应用
2. 点击左下角的设置图标（齿轮）
3. 进入"Provider"或"API 设置"页面

## 最短完整配置步骤

1. 在设置页面中，点击"添加 Provider"或选择已有 Provider
2. 选择 Provider 类型为"OpenAI Compatible"或"Custom"
3. 在 `API Key` 字段中输入你的 API Key
4. 在 `Base URL` 或 `API Endpoint` 字段中输入：`https://api.1010101.asia/`
5. 如需填写模型名，输入模型 ID（如 `gpt-4`）
6. 点击"保存"或"确认"

## 配置示例

### Provider 设置

- **Provider 类型**: OpenAI Compatible 或 Custom
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`
- **Model**: `gpt-4`（如需要）

## 如何验证生效

1. 返回主界面
2. 发送一个简单问题
3. 如果收到正常回复，说明配置成功

或：

1. 在设置页面中点击"测试连接"按钮
2. 如果显示"连接成功"，说明配置正确

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

**原因**：Base URL 错误或服务商不支持模型列表查询

**排查**：

- 检查 Base URL 是否正确
- 手动输入模型名

### 连接超时

**原因**：网络问题或 Base URL 不可达

**排查**：

- 检查网络连接
- 确认 Base URL 可以访问
- 尝试在浏览器中访问 Base URL

## 注意事项

### Provider 类型

Cherry Studio 支持多种 Provider 类型。选择"OpenAI Compatible"或"Custom"以使用自定义 Base URL。

### 模型选择

某些 Provider 可能要求选择模型。请根据服务商文档确认正确的模型名。

### 应用重启

修改配置后，某些情况下需要重启 Cherry Studio 才能生效。

### 平台差异

Cherry Studio 在不同平台上的界面可能略有不同，但配置流程基本一致。
