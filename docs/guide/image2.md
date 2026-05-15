<script setup>
import Image2Playground from '../.vitepress/theme/components/Image2Playground.vue'
</script>

# image2 在线绘图与接口说明

想先试效果，可以直接用下面的在线工具。它在你的浏览器里调用 image2 接口，支持生成图片、上传图片继续编辑、下载图片和查看绘图历史。

<Image2Playground />

::: tip 关于 API Key
如果点击“保存到本浏览器”，Key 只会保存在当前浏览器的 `localStorage` 里，不会写入本站服务器。生成或编辑图片时，浏览器会把 Key 直接发送给 `https://api.1010101.asia` 完成请求。
:::

## image2 能做什么

image2 按 OpenAI 图片接口格式调用，Base URL 固定使用：

```text
https://api.1010101.asia
```

它主要有两个接口：

| 能力 | 完整地址 | 适合做什么 |
|------|----------|------------|
| 生成图片 | `POST https://api.1010101.asia/v1/images/generations` | 从文字提示词生成一张新图 |
| 编辑图片 | `POST https://api.1010101.asia/v1/images/edits` | 上传一张图，再按提示词继续改图 |

官方文档参考：

- [OpenAI Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [OpenAI Images API reference](https://developers.openai.com/api/reference/resources/images)
- [GPT Image 2 model page](https://developers.openai.com/api/docs/models/gpt-image-2)

## 生成图片接口

生成图片使用 JSON 请求体。

### curl 示例

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

### JavaScript 示例

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

## 编辑图片接口

编辑图片需要用 `multipart/form-data` 上传图片文件。不要手动设置 `Content-Type`，浏览器或 HTTP 客户端会自动补上 boundary。

### curl 示例

```bash
curl -X POST "https://api.1010101.asia/v1/images/edits" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=gpt-image-2" \
  -F "image=@source.png" \
  -F "prompt=把背景换成清晨的厨房，保留杯子主体，整体更明亮" \
  -F "size=1024x1024" \
  -F "quality=medium" \
  -F "output_format=png"
```

### JavaScript 示例

```js
const apiKey = 'YOUR_API_KEY'
const fileInput = document.querySelector('#source-image')

const formData = new FormData()
formData.append('model', 'gpt-image-2')
formData.append('image', fileInput.files[0])
formData.append('prompt', '把背景换成清晨的厨房，保留杯子主体，整体更明亮')
formData.append('size', '1024x1024')
formData.append('quality', 'medium')
formData.append('output_format', 'png')

const response = await fetch('https://api.1010101.asia/v1/images/edits', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`
  },
  body: formData
})

const result = await response.json()
const imageUrl = `data:image/png;base64,${result.data[0].b64_json}`
document.querySelector('#preview').src = imageUrl
```

## 常用字段

| 字段 | 用在 | 示例 | 说明 |
|------|------|------|------|
| `model` | 生成、编辑 | `gpt-image-2` | 图片模型 |
| `prompt` | 生成、编辑 | `一张写实风格的咖啡产品图` | 想生成或修改成什么样 |
| `image` | 编辑 | `source.png` | 要继续编辑的图片文件 |
| `size` | 生成、编辑 | `1024x1024` | 也可用 `1024x1536`、`1536x1024`、`auto` |
| `quality` | 生成、编辑 | `medium` | 可用 `low`、`medium`、`high`、`auto` |
| `output_format` | 生成、编辑 | `png` | 可用 `png`、`jpeg`、`webp` |

接口通常会返回 `data[0].b64_json`。这是图片的 Base64 内容，可以拼成浏览器可显示的地址：

```text
data:image/png;base64,返回的_b64_json
```

## 接入什么工具

image2 是图片接口，不是聊天接口。它适合接入：

- 自己做的网页绘图工具
- 后端图片生成服务
- 自动生成封面、配图、商品图的脚本
- Postman、Apifox、Hoppscotch 这类 API 调试工具
- 支持自定义 HTTP 请求的自动化平台

它不适合直接填进 Claude Code、Codex、Cline、Roo Code、Cursor、Windsurf 这类代码助手的聊天模型配置里。那些工具通常调用 OpenAI Chat、OpenAI Responses 或 Anthropic Messages，不会自动把聊天请求改成图片生成或图片编辑请求。

## 做成自己的绘图工具

如果只是自己使用，纯前端工具就够快：浏览器保存 Key、直接请求 image2、把返回的 Base64 图片显示出来。

如果要给别人用，建议改成后端代理：

```text
浏览器 -> 你的后端 /api/image2 -> https://api.1010101.asia/v1/images/generations
浏览器 -> 你的后端 /api/image2/edit -> https://api.1010101.asia/v1/images/edits
```

这样 Key 不会暴露给访问者，也更方便做额度限制、日志、错误提示和内容安全处理。

## 常见问题

### 为什么生成成功但历史记录没有保存？

浏览器的 `localStorage` 空间有限。图片是 Base64，体积可能比较大。如果空间不够，当前图片仍然可以下载，但历史记录可能保存失败。

### 为什么编辑图片失败？

先检查三点：

1. 是否真的上传了图片，或者从历史里点了“继续编辑”
2. 请求是否走 `POST /v1/images/edits`
3. 是否用了 `multipart/form-data`，并且没有手动写死 `Content-Type`

### 为什么代码助手里不能直接用 image2？

代码助手通常发的是聊天请求，例如 `messages` 或 `input`。image2 要求的是图片接口字段，例如 `prompt`、`image`、`size`、`quality`。两者不是同一种接口格式。
