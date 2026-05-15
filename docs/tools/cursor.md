# Cursor 配置教程

Cursor 是一个带 AI 功能的代码编辑器。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 Cursor。
- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。

## 这个工具使用什么接口

Cursor 内置 AI 功能，也可能提供 BYOK。

Cursor 的公开文档对自定义 Base URL 说明较少。是否能填写 Base URL，请以当前版本界面为准。

如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。

## 配置步骤

1. 打开 Cursor。
2. 进入设置，快捷键是 `Ctrl/Cmd + ,`。
3. 查找 `AI` 或 `Model` 相关设置。
4. 也可以打开命令面板，快捷键是 `Ctrl/Cmd + Shift + P`。
5. 搜索 `AI Settings` 或 `Model Settings`。
6. 找到 API Key 或 BYOK 配置入口。
7. 在 `API Key` 字段填写你的 API Key。
8. 如果你的版本提供 Base URL 字段，可以按下面的方式填写。
9. 保存设置。

## 配置示例

如果你的版本提供 Base URL 字段，可以按下面的方式填写。

- **Provider**：Custom 或 OpenAI Compatible
- **API Key**：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**：`https://api.1010101.asia/`
- **Model**：`gpt-4`

如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。

## 如何验证

1. 在 Cursor 中打开一个文件。
2. 使用 AI 功能，例如 `Ctrl/Cmd + K`。
3. 发送一个简单请求。
4. 如果能收到正常回复，说明配置成功。

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

### 设置中找不到 Base URL 选项

通常是版本或界面不同。

请检查：

- 是否可以在命令面板中搜索相关设置。
- 当前 Cursor 版本是否提供自定义 Base URL 字段。
- Cursor 官方文档或社区说明是否有更新。

如果设置里没有自定义 Base URL 字段，以当前版本的实际界面为准。

## 注意事项

- Cursor 的设置界面可能会随版本变化。
- 本页面基于 2026 年 5 月的信息整理。
- 模型名请以服务商提供的模型列表为准。
- BYOK 功能可能只允许填写 API Key，不一定提供 Base URL 字段。
