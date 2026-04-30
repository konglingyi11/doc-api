# Windsurf 配置

Windsurf 是一个 AI 代码编辑器，提供内置 AI 编程助手功能。

## 这是什么工具

Windsurf 是一个独立的代码编辑器，内置 AI 功能。它支持 BYOK（Bring Your Own Key）模式，允许使用自定义 API Key。

## 配置前需要准备什么

- 有效的 API Key
- 默认 Base URL：`https://api.1010101.asia/`

## 从哪里打开配置入口

Windsurf 的 API Key 配置入口：

1. 打开 Windsurf
2. 进入订阅设置页面
3. 找到"Provider API Keys"页面

或：

1. 打开设置
2. 查找"Provider"或"API Keys"相关设置

## 最短完整配置步骤

1. 进入"Provider API Keys"页面
2. 选择要配置的 Provider
3. 在 `API Key` 字段中输入你的 API Key
4. 如有 `Base URL` 或 `Endpoint` 字段，输入：`https://api.1010101.asia/`
5. 保存设置

## 配置示例

### Provider API Keys 设置

- **Provider**: 选择对应 Provider
- **API Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**: `https://api.1010101.asia/`（如有此字段）

## 如何验证生效

1. 在 Windsurf 中使用 AI 功能
2. 发送一个简单请求
3. 如果收到正常回复，说明配置成功

或：

1. 在模型选择中查看是否有 BYOK 标识
2. 选择 BYOK 模型进行测试

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

### Missing API Key 错误

**原因**：未正确设置 API Key

**排查**：

- 确认已在"Provider API Keys"页面填写 API Key
- 检查 API Key 是否保存成功

### BYOK 模型不可用

**原因**：BYOK 仅支持特定模型

**排查**：

- 查看 Windsurf 文档确认 BYOK 支持的模型列表
- 确认当前选择的模型支持 BYOK

## 注意事项

### BYOK 限制

Windsurf 的 BYOK 功能有以下限制：

- 仅支持特定模型
- 仅适用于个人用户
- 需要有效的 API Key

### Base URL 配置

Windsurf 的公开文档对自定义 Base URL 的说明较少。如果设置中没有 Base URL 字段，可能需要：

- 使用环境变量（如支持）
- 参考 Windsurf 社区或官方支持

### 模型选择

在 Windsurf 中，BYOK 模型通常会有特殊标识。选择带有 BYOK 标识的模型以使用自定义 API Key。

### 订阅状态

某些功能可能需要订阅。请确认你的 Windsurf 订阅状态支持 BYOK 功能。

### 版本差异

Windsurf 的设置界面可能因版本更新而变化。本页面基于 2026 年 5 月的信息，如有变化请以应用内实际界面为准。
