# 什么是 Base URL

Base URL 是 API 请求的基础地址,相当于你告诉工具"去哪里调用 API"。

## 为什么需要自定义 Base URL

默认情况下,大多数工具会使用官方 API 地址。但有时你需要自定义 Base URL:

- **使用代理或中转服务**:通过第三方服务访问 API
- **使用自建服务**:调用自己部署的 API 服务
- **使用兼容接口**:某些工具支持 OpenAI 兼容接口,你可以指向其他服务商

## Base URL 的常见形式

Base URL 通常是一个 HTTPS 地址,例如:

```
https://api.1010101.asia/
```

或带路径的形式:

```
https://api.example.com/v1
```

## 本文档站的默认 Base URL

本文档站以 `https://api.1010101.asia/` 作为示例 Base URL。你可以在工具配置页面中看到如何填写这个地址。

## 在工具中填写 Base URL

不同工具填写 Base URL 的位置不同,但通常在以下位置之一:

- 设置面板的"Base URL"或"API Endpoint"字段
- 配置文件的 `baseURL` 或 `apiBase` 字段
- 环境变量(如 `ANTHROPIC_BASE_URL`)

具体填写方式请参考对应工具的配置页面。

## 常见问题

### Base URL 填错了会怎样?

通常会返回 `404 Not Found` 或连接超时错误。

### Base URL 需要以 `/` 结尾吗?

取决于服务商的 API 设计。本示例 `https://api.1010101.asia/` 以 `/` 结尾,请按工具页示例填写。

### Base URL 和 API Key 有什么区别?

- **API Key**:身份验证,相当于"密码"
- **Base URL**:请求地址,相当于"服务器地址"

两者缺一不可:没有 API Key,服务器不认识你;没有 Base URL,工具不知道去哪里调用。
