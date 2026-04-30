# Cursor 配置

Cursor 是一个 AI 代码编辑器，基于 VS Code 构建，内置 AI 功能。

## 这是什么工具

Cursor 是一个独立的代码编辑器，内置 AI 编程助手功能。它支持多种 AI Provider。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Cursor 的自定义 Base URL 配置入口可能因版本而异。常见入口：

1. 打开 Cursor
2. 进入设置（`Ctrl/Cmd + ,`）
3. 查找"AI"或"Model"相关设置

或：

1. 打开命令面板（`Ctrl/Cmd + Shift + P`）
2. 搜索"AI Settings"或"Model Settings"

**注意**：Cursor 的公开文档对自定义 Base URL 的说明较少，建议在应用内查找相关设置，或参考社区文档。

## 最短完整配置步骤

由于 Cursor 的公开文档对自定义 Base URL 配置说明有限，以下为通用步骤：

1. 在设置中找到"AI Provider"或"Model Provider"选项
2. 选择"Custom"或"OpenAI Compatible"
3. 在 `API Key` 字段中输入你的 API Key
4. 在 `Base URL` 字段中输入：`https://api.1010101.asia/`
5. 保存设置

## 配置示例

### 可能的设置字段

- **Provider**: Custom 或 OpenAI Compatible
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`
- **Model**: `gpt-4`（如需要）

## 如何验证生效

1. 在 Cursor 中打开一个文件
2. 使用 AI 功能（如 `Ctrl/Cmd + K`）
3. 发送一个简单请求
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

- 检查 Base URL 是否正确
- 确认 Base URL 格式符合要求
- 检查网络连接是否正常

### 设置中找不到 Base URL 选项

**原因**：Cursor 版本或界面变化

**排查**：

- 尝试在命令面板中搜索相关设置
- 查看 Cursor 官方文档或社区论坛
- 确认当前 Cursor 版本是否支持自定义 Base URL

## 注意事项

### 文档不完整

Cursor 的公开文档对自定义 Base URL 的说明较少。建议：

- 在应用内仔细查找相关设置
- 参考 Cursor 社区或论坛
- 关注 Cursor 官方文档更新

### 版本差异

Cursor 的设置界面可能因版本更新而变化。本页面基于 2026 年 5 月的信息，如有变化请以应用内实际界面为准。

### 模型选择

Cursor 可能要求选择模型。请根据服务商文档确认正确的模型名。

### BYOK 功能

Cursor 可能提供 BYOK（Bring Your Own Key）功能，允许使用自定义 API Key 和 Base URL。详情请参考 Cursor 官方文档。
