# 什么是 Base URL

真正容易出错的不是它叫什么，而是你到底该填到什么粒度。

## Base URL 是什么

Base URL 是 API 请求的基础地址，告诉工具"去哪里调用 API"。它通常是一个 HTTPS 地址，例如：

```
https://api.1010101.asia/
```

或带路径的形式：

```
https://api.example.com/v1
```

但具体填到什么粒度，取决于工具帮你补了多少路径。

## baseURL 没有一个全站通用固定答案

这是最容易踩的坑。你在 A 工具里填 `https://api.example.com` 就对了，但换到 B 工具可能要填 `https://api.example.com/v1` 才对。

原因：不同工具对 baseURL 的期望粒度不同。

- 有些工具你只填域名，它自己会补 `/v1/chat/completions`
- 有些工具期望你填到 `/v1`，它再补 `/chat/completions`
- 有些工具要求你填完整路径

所以：不要把某个教程里的 baseURL 当固定答案背下来。换了工具，要重新看那个工具的示例。

## 为什么 `/v1` 经常让人填错

因为不同接口格式的路径不一样：

- OpenAI Chat 接口：完整路径是 `/v1/chat/completions`
- OpenAI Responses 接口：完整路径是 `/v1/responses`
- Anthropic Messages 接口：完整路径是 `/v1/messages`

工具可能期望你：

- 只填域名 `https://api.example.com`，它帮你加 `/v1/chat/completions`
- 填到 `/v1`：`https://api.example.com/v1`，它帮你加 `/chat/completions`
- 填完整路径：`https://api.example.com/v1/chat/completions`

你如果不知道工具期望哪一级，就容易多填一层或少填一层，导致 404。

## 3 种常见判断方式

### 1. 工具页明确给了字段示例（优先级最高）

工具页的示例是针对这个工具的，优先照着示例填。如果示例写 `https://api.example.com/v1`，就填到 `/v1`；如果示例只写域名，就只填域名。

### 2. 工具页说明它走 OpenAI 风格接口

如果工具走 OpenAI Chat 接口，通常：

- 你填到 `/v1` 或只填域名，工具会补后续路径
- 具体要不要带 `/v1`，看工具页示例

### 3. 工具页说明它走 Anthropic 风格接口

如果工具走 Anthropic Messages 接口，通常：

- Base URL 填到域名即可，工具会补 `/v1/messages`
- 但也要看工具页的具体说明

## Base URL 尾部斜杠规则

**重要**：不同工具对尾部斜杠的处理方式不同，请严格按工具页示例填写。

### 通用规则

1. **Anthropic 接口工具**（如 Claude Code）
   - 通常**不带**尾部斜杠
   - 示例：`https://api.1010101.asia`

2. **OpenAI 接口工具**（如 Codex）
   - 通常**需要带** `/v1` 后缀
   - 示例：`https://api.1010101.asia/v1`

3. **其他工具**（如 Cline、Cherry Studio 等）
   - 通常**带**尾部斜杠
   - 示例：`https://api.1010101.asia/`

### 判断方法

- **优先级最高**：工具页明确给出的示例
- **次优先级**：工具的接口类型（Anthropic/OpenAI）
- **验证方法**：配置后发送真实请求测试

### 常见错误

❌ **错误**：在所有工具中使用相同格式
✅ **正确**：每个工具按其文档示例填写

## Base URL 填错时常见现象

- **404 Not Found**：路径粒度错了。检查你是多填了 `/v1` 还是少填了。
- **连接超时 / 连接被拒绝**：域名错了或服务不可用。检查域名拼写。

## 实战建议

1. **先看当前工具页**：不要用别处学来的配置，看这个工具的示例。
2. **先确认接口格式**：OpenAI 还是 Anthropic，路径规则不同。
3. **改完发真实请求**：用真实请求验证，不要只点保存。
4. **遇到 404 先回头检查 /v1 与路径粒度**：不要一上来就改 API Key 或模型名，404 通常是路径问题。

如果你现在已经知道自己在用哪个工具，最省时间的做法仍然是直接回到对应工具页。
