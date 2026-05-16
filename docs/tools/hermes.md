# Hermes 配置教程

Hermes 是一个命令行 AI 助手，支持通过交互式命令配置主模型，并可以接入自定义 Base URL。

本文介绍如何配置 API Key、Base URL 和模型名称。

## 准备工作

请先准备：

- 已安装 Hermes。
- 有效的 API Key。
- Base URL：`https://api.1010101.asia/v1`。
- 可用模型名称，例如 `gpt-5.4`。

## 这个工具使用什么接口

Hermes 的主模型配置支持自定义 OpenAI 兼容端点。

配置主模型时，需要填写：

- Provider：选择 `custom` 或自定义端点。
- Base URL：`https://api.1010101.asia/v1`。
- API Key：服务商提供的密钥。
- Model：服务商提供的模型名称。

## 配置步骤

Hermes 推荐使用交互式模型配置命令。

### 方法一：使用交互式配置

1. 启动模型配置：

```bash
hermes model
```

2. 选择自定义 Provider 或自定义 OpenAI 兼容端点。
3. 输入 Base URL：`https://api.1010101.asia/v1`。
4. 输入 API Key。
5. 输入模型名称，例如 `gpt-5.4`。
6. 保存配置。

### 方法二：使用配置命令

如果当前版本支持 `config set`，也可以直接写入配置项：

```bash
hermes config set model.provider custom
hermes config set model.base_url https://api.1010101.asia/v1
hermes config set model.api_key sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
hermes config set model.default gpt-5.4
```

### 方法三：手动编辑配置文件

1. 创建或编辑 `~/.hermes/config.yaml`。
2. 写入主模型配置。
3. 保存后重新启动 Hermes。

## 配置示例

`~/.hermes/config.yaml`：

```yaml
model:
  provider: custom
  base_url: https://api.1010101.asia/v1
  api_key: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  default: gpt-5.4
```

如果你的 Hermes 版本在配置向导中使用不同字段名，请优先以 `hermes model` 生成的配置为准，再按同样含义替换 Base URL、API Key 和模型名称。

## 如何验证

1. 启动 Hermes：

```bash
hermes
```

2. 发送一个简单请求，例如：

```text
请用 Python 写一个读取 JSON 文件的示例
```

3. 如果能收到正常回复，说明配置成功。

也可以查看当前配置：

```bash
hermes config
```

确认主模型、Base URL 和 Provider 与预期一致。

## 常见问题

### 401 Unauthorized

通常是 API Key 有问题。

请检查：

- API Key 是否完整。
- 前后是否有空格。
- Key 是否已经失效。
- Key 是否有权限访问当前模型。

### 404 Not Found

通常是 Base URL 或接口路径有问题。

请检查：

- Base URL 是否带 `/v1`。
- 是否把 `/v1` 重复写入。
- Hermes 当前 Provider 是否确实使用自定义 Base URL。

### 模型不存在

通常是模型名称写错或没有权限。

请检查：

- `model.default` 是否是服务商提供的模型名。
- API Key 是否有该模型权限。
- 如果服务商区分 Responses 和 Chat Completions，确认当前 Hermes 版本支持对应接口。

### 环境变量未生效

Hermes 的主模型配置以 `hermes model` 和 `~/.hermes/config.yaml` 为准。

如果你在旧教程中看到 `OPENAI_BASE_URL`，但当前版本没有生效，请改用 `hermes model` 或配置文件方式设置 Base URL。

## 注意事项

- 主模型配置建议优先使用 `hermes model`，减少字段名写错的概率。
- 敏感信息不要提交到 Git 仓库，也不要公开截图。
- Windows 路径可以写成 `%USERPROFILE%\.hermes\config.yaml`。
- 不同版本的 Hermes 配置字段可能调整，手动编辑前建议先运行一次交互式配置生成模板。
