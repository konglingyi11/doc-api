<script setup>
import Image2Playground from '../.vitepress/theme/components/Image2Playground.vue'
</script>

# image2 图片接口使用方法

image2 按 OpenAI 图片生成接口的格式调用。本站示例统一使用：

```text
https://api.1010101.asia
```

完整生成图片地址是：

```text
POST https://api.1010101.asia/v1/images/generations
```

## 官方接口格式

官方图片生成接口的核心格式是 `POST /v1/images/generations`，请求头使用 Bearer Token，常用请求体字段如下：

| 字段 | 示例 | 说明 |
|------|------|------|
| `model` | `gpt-image-2` | 图片生成模型 |
| `prompt` | `一张写实风格的咖啡产品图` | 图片提示词 |
| `size` | `1024x1024` | 图片尺寸，也可用 `1024x1536`、`1536x1024` 或 `auto` |
| `quality` | `medium` | 质量，可用 `low`、`medium`、`high`、`auto` |
| `output_format` | `png` | 输出格式，可用 `png`、`jpeg`、`webp` |

官方文档参考：

- [OpenAI Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [OpenAI Images API reference](https://developers.openai.com/api/reference/resources/images)
- [GPT Image 2 model page](https://developers.openai.com/api/docs/models/gpt-image-2)

## curl 调用示例

把 `YOUR_API_KEY` 换成你的 Key：

```bash
curl -X POST "https://api.1010101.asia/v1/images/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "一张干净的产品海报，展示一杯透明玻璃杯中的冰咖啡，白色背景，自然光，写实摄影风格",
    "size": "1024x1024",
    "quality": "medium",
    "output_format": "png"
  }'
```

接口通常会返回 `data[0].b64_json`。这是图片的 Base64 内容，可以保存成文件，也可以在浏览器里拼成：

```text
data:image/png;base64,返回的_b64_json
```

## JavaScript 调用示例

```js
const apiKey = 'YOUR_API_KEY'
const response = await fetch('https://api.1010101.asia/v1/images/generations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-image-2',
    prompt: '一张赛博朋克风格的城市海报，霓虹灯，雨夜，电影感',
    size: '1024x1024',
    quality: 'medium',
    output_format: 'png'
  })
})

const result = await response.json()
const imageUrl = `data:image/png;base64,${result.data[0].b64_json}`
document.querySelector('#preview').src = imageUrl
```

## 纯前端绘图工具

下面这个工具直接在浏览器里调用 image2 接口。它适合快速验证 Key、Base URL、提示词和参数是否可用。

<Image2Playground />

::: warning 使用提醒
纯前端工具会在浏览器里发起请求，API Key 会出现在本机浏览器的网络请求中。自己测试可以这样用；如果要做公开产品，建议改成后端代理，由服务端保存 Key 并转发请求。
:::

如果生成失败，优先检查：

- API Key 是否有效
- Base URL 是否保持为 `https://api.1010101.asia`
- 浏览器是否因为 CORS 拦截了请求
- 账号或 Key 是否有图片模型权限
- 提示词是否触发内容安全策略

## 适合接入哪些工具

image2 是图片生成接口，不是聊天补全接口。它适合接入：

- 自己写的网页绘图工具
- 需要自动生成配图的前端页面
- 后端服务、脚本、自动化工作流
- Postman、Apifox、Hoppscotch 这类 API 调试工具
- 支持自定义 HTTP 请求的低代码或自动化平台

它通常不适合直接填进 Claude Code、Codex、Cline、Roo Code、Cursor、Windsurf 这类代码助手的“聊天模型 Base URL”里。那些工具大多调用的是 OpenAI Chat、OpenAI Responses 或 Anthropic Messages，不会自动把聊天请求改成图片生成请求。

## 接入建议

### 只做个人测试

可以直接用上面的纯前端工具，填 Key、提示词、尺寸和质量后生成。这个方式最快，但只适合自己使用。

### 做公开网页

建议浏览器请求你自己的后端：

```text
浏览器 -> 你的后端 /api/image2 -> https://api.1010101.asia/v1/images/generations
```

这样 API Key 不会暴露给访问者，也更方便做额度限制、日志、错误处理和内容审核。

### 做自动化脚本

用 curl、Node.js、Python 都可以。关键是保持这三点一致：

1. Base URL 使用 `https://api.1010101.asia`
2. 完整路径使用 `/v1/images/generations`
3. 请求体使用图片接口字段，不要套用聊天接口的 `messages`
