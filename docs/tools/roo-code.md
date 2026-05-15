# Roo Code 配置教程

Roo Code 是一个 VS Code AI 编程扩展。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 VS Code。
- 已安装 Roo Code 扩展。
- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。

## 这个工具使用什么接口

Roo Code 支持多种 AI Provider。

使用自定义 Base URL 时，选择 `OpenAI Compatible`。

## 配置步骤

1. 打开 VS Code。
2. 点击左侧活动栏的 Roo Code 图标。
3. 点击右上角的齿轮图标，打开设置面板。
4. 找到 `API Provider`。
5. 选择 `OpenAI Compatible`。
6. 在 `Base URL` 字段填写：`https://api.1010101.asia/`。
7. 在 `API Key` 字段填写你的 API Key。
8. 在 `Model` 字段填写模型 ID，例如 `gpt-4`。
9. 点击 `Save` 或 `Verify`。

## 配置示例

- **API Provider**：OpenAI Compatible
- **Base URL**：`https://api.1010101.asia/`
- **API Key**：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Model**：`gpt-4`

## 如何验证

可以用下面任一方式验证：

1. 在 Roo Code 面板中输入一个简单问题。
2. 点击发送。
3. 如果能收到正常回复，说明配置成功。

或：

1. 在设置面板中点击 `Verify`。
2. 如果显示连接成功，说明配置正确。

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

通常是 Base URL 不正确，或服务商不支持模型列表查询。

请检查：

- Base URL 是否填写正确。
- 是否可以手动输入模型名。

### 连接超时

通常是网络问题，或 Base URL 不可访问。

请检查：

- 当前网络是否正常。
- Base URL 是否可以访问。
- 是否被代理、防火墙或系统网络设置拦截。

## 注意事项

- Base URL 应填写服务商端点，不要填写 `https://api.openai.com/v1`。
- Roo Code 支持多个 Provider，请确认选中的是 `OpenAI Compatible`。
- 模型 ID 请以服务商提供的模型列表为准。
- Roo Code 也支持通过配置文件管理 API 配置，并支持多个 Profile。
- 如果配置没有生效，可以重启 VS Code。
