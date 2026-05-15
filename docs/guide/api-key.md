# API Key 教程

API Key 是访问接口时使用的密钥。

工具发送请求时，会把 API Key 一起发给服务商。服务商用它判断你是谁、有没有权限、还能不能继续调用。

## API Key 填在哪里

大多数工具会有一个 `API Key` 字段。

把你的 Key 填进去即可。

常见位置：

- Provider 设置
- Model Provider 设置
- API 设置
- 环境变量
- 配置文件

具体位置以对应工具页为准。

## 填写规则

- 不要多写空格。
- 不要换行。
- 不要把 Base URL 填到 API Key 里。
- 不要把多个 Key 写在同一个字段里。
- 一个工具要用哪个 Key，以对应工具页为准。

## 常见写法

普通文本：

```txt
sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

Bash：

```bash
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
```

PowerShell：

```powershell
$env:OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
```

配置文件里常见写法：

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

## 常见错误

### 401 Unauthorized

先检查：

- Key 是否复制完整。
- Key 前后是否有空格。
- Key 是否来自正确的服务商。
- Key 是否已经过期、撤销或额度用完。
- 字段是否填对，特别是 `API Key` 和其他 Secret 字段。

### Missing API Key

先检查：

- 是否已经点了保存。
- 是否改完后需要重启或重新加载工具。
- 是否填到了当前工具正在读取的配置里。
- 环境变量名是否写对。
- 配置文件路径是否写对。

## 下一步

继续看 [Base URL 教程](/guide/base-url)。
