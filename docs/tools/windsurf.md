# Windsurf 配置教程

Windsurf 是一个带 AI 功能的代码编辑器。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 Windsurf。
- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。
- 支持 BYOK 的账号或订阅状态。

## 这个工具使用什么接口

Windsurf 支持 BYOK（Bring Your Own Key）模式。

BYOK 主要用于填写自定义 API Key。自定义 Base URL 是否可用，请以当前版本界面为准。

如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。

## 配置步骤

1. 打开 Windsurf。
2. 进入订阅设置页面。
3. 找到 `Provider API Keys` 页面。
4. 选择要配置的 Provider。
5. 在 `API Key` 字段填写你的 API Key。
6. 如果你的版本提供 Base URL 字段，可以按下面的方式填写。
7. 保存设置。

也可以在设置中搜索 `Provider` 或 `API Keys`，找到同类入口。

## 配置示例

如果你的版本提供 Base URL 字段，可以按下面的方式填写。

- **Provider**：选择对应 Provider
- **API Key**：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**：`https://api.1010101.asia/`

如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。

## 如何验证

1. 在 Windsurf 中使用 AI 功能。
2. 发送一个简单请求。
3. 如果能收到正常回复，说明配置成功。

也可以检查模型选择列表：

1. 查看是否有 BYOK 标识。
2. 选择 BYOK 模型进行测试。

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

### Missing API Key

通常是 API Key 没有保存成功。

请检查：

- 是否已经在 `Provider API Keys` 页面填写 API Key。
- 是否选择了正确的 Provider。
- 保存后是否需要重新打开设置页确认。

### BYOK 模型不可用

通常是当前模型不支持 BYOK，或账号条件不满足。

请检查：

- Windsurf 文档中 BYOK 支持的模型列表。
- 当前选择的模型是否带 BYOK 标识。
- 当前账号或订阅是否支持 BYOK。

## 注意事项

- Windsurf 的 BYOK 可能只支持特定模型。
- BYOK 可能只适用于个人用户。
- 某些功能可能需要订阅。
- Windsurf 的公开文档对自定义 Base URL 说明较少。
- 如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。
- 本页面基于 2026 年 5 月的信息整理。
