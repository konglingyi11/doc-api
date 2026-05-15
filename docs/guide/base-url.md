# Base URL 教程

## Base URL 是什么

Base URL 是 API 地址。

工具会把请求发到这个地址。常见写法是一个 HTTPS 地址：

```txt
https://api.1010101.asia/
```

有些工具要求写到 `/v1`：

```txt
https://api.1010101.asia/v1
```

不要只记一个固定写法。每个工具要看自己的示例。

## `/v1` 要不要带

不一定。

有些工具需要你写 `/v1`。工具再补后面的接口路径。

有些工具会自动加 `/v1`。这时你只填域名即可。

常见完整路径如下：

- OpenAI Chat：`/v1/chat/completions`
- OpenAI Responses：`/v1/responses`
- Anthropic Messages：`/v1/messages`

如果工具页写了示例，按工具页填。

## 常见写法

只填域名：

```txt
https://api.1010101.asia/
```

填到 `/v1`：

```txt
https://api.1010101.asia/v1
```

填到完整路径：

```txt
https://api.example.com/v1/chat/completions
```

是否需要完整路径，必须看工具说明。

## 填写规则

- 先看当前工具页的示例。
- 不要把 API Key 填到 Base URL 里。
- 不要把模型名填到 Base URL 里。
- 不要随意增减 `/v1`。
- 改完后保存配置。
- 必要时重启或重新加载工具。

## 常见错误

### 404 Not Found

通常是路径不对。

先检查：

- 是否多写了 `/v1`。
- 是否少写了 `/v1`。
- 工具是否已经自动补了接口路径。
- 是否把完整路径填进了只需要域名的字段。

### 连接超时

通常是地址连不上。

先检查：

- 域名是否拼错。
- 协议是否正确，常见是 `https://`。
- 网络是否能访问这个地址。
- 服务商或中转服务是否可用。

## 下一步

继续看 [验证配置教程](/guide/verify)。
