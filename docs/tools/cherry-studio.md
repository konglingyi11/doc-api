# Cherry Studio 配置教程

Cherry Studio 是一个跨平台 AI 桌面应用。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 有效的 API Key。
- 示例 Base URL：`https://api.1010101.asia/`。
- 已安装 Cherry Studio。

## 这个工具使用什么接口

Cherry Studio 支持多种 AI Provider。

使用自定义 Base URL 时，通常选择 `OpenAI Compatible` 或 `Custom`。

## 配置步骤

1. 打开 Cherry Studio。
2. 点击左下角的设置图标。
3. 进入 `Provider` 或 `API 设置` 页面。
4. 点击 `添加 Provider`，或选择已有 Provider。
5. Provider 类型选择 `OpenAI Compatible` 或 `Custom`。
6. 在 `API Key` 字段填写你的 API Key。
7. 在 `Base URL` 或 `API Endpoint` 字段填写：`https://api.1010101.asia/`。
8. 如需填写模型名，填写模型 ID，例如 `gpt-4`。
9. 点击 `保存` 或 `确认`。

## 配置示例

- **Provider 类型**：OpenAI Compatible 或 Custom
- **API Key**：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Base URL**：`https://api.1010101.asia/`
- **Model**：`gpt-4`

## 如何验证

可以用下面任一方式验证：

1. 返回主界面。
2. 发送一个简单问题。
3. 如果能收到正常回复，说明配置成功。

或：

1. 回到设置页面。
2. 点击 `测试连接`。
3. 如果显示连接成功，说明配置正确。

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
- 模型名是否和服务商提供的一致。

### 连接超时

通常是网络问题，或 Base URL 不可访问。

请检查：

- 当前网络是否正常。
- Base URL 是否可以访问。
- 是否被代理、防火墙或系统网络设置拦截。

## 注意事项

- Cherry Studio 在 Windows、macOS 和 Linux 上都可以使用。
- 不同平台的界面可能略有不同，以实际界面为准。
- 修改配置后，如果没有立即生效，可以重启 Cherry Studio。
- 模型名请以服务商提供的模型列表为准。
