<script setup>
import Image2Playground from '../.vitepress/theme/components/Image2Playground.vue'
</script>

# image2 图片接口教程

image2 用来生成图片，也可以编辑上传的图片。

它不是聊天接口。不要把它填到聊天模型配置里。

它使用两个 OpenAI 图片接口：

- `POST /v1/images/generations`
- `POST /v1/images/edits`

Base URL：

```text
https://api.1010101.asia
```

## 在线试用

下面的工具会在浏览器里请求 image2。

填入 API Key 后，可以生成图片，也可以上传图片继续编辑。生成结果可以下载，也会保存在本地历史记录里。

<Image2Playground />

::: tip API Key
如果点击“保存到本浏览器”，Key 只会保存在当前浏览器的 `localStorage` 里。

本站服务器不会保存你的 Key。生成或编辑图片时，浏览器会把 Key 发送给 `https://api.1010101.asia`。
:::

## image2 能做什么

image2 主要做两件事：

| 功能 | 地址 | 说明 |
|------|------|------|
| 生成图片 | `POST https://api.1010101.asia/v1/images/generations` | 根据文字描述生成新图片 |
| 编辑图片 | `POST https://api.1010101.asia/v1/images/edits` | 上传图片，再按文字描述修改 |

官方文档参考：

- [OpenAI Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [OpenAI Images API reference](https://developers.openai.com/api/reference/resources/images)
- [GPT Image 2 model page](https://developers.openai.com/api/docs/models/gpt-image-2)

## 生成图片

生成图片使用 `POST /v1/images/generations`。

请求体是 JSON。

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

## 编辑图片

编辑图片使用 `POST /v1/images/edits`。

请求体是 `multipart/form-data`。需要上传图片文件。

不要手动设置 `Content-Type`。浏览器或 HTTP 客户端会自动添加 boundary。

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
| `prompt` | 生成、编辑 | `一张写实风格的咖啡产品图` | 图片描述或修改要求 |
| `image` | 编辑 | `source.png` | 要编辑的图片文件 |
| `size` | 生成、编辑 | `1024x1024` | 可用 `1024x1024`、`1024x1536`、`1536x1024`、`auto` |
| `quality` | 生成、编辑 | `medium` | 可用 `low`、`medium`、`high`、`auto` |
| `output_format` | 生成、编辑 | `png` | 可用 `png`、`jpeg`、`webp` |

接口通常返回 `data[0].b64_json`。

这是图片的 Base64 内容。可以拼成浏览器能显示的地址：

```text
data:image/png;base64,返回的_b64_json
```

## 接入自己的工具

image2 是图片接口。它适合接入这些工具：

- 自己做的网页绘图工具
- 后端图片生成服务
- 自动生成封面、配图、商品图的脚本
- Postman、Apifox、Hoppscotch 这类 API 调试工具
- 支持自定义 HTTP 请求的自动化平台

如果只是自己用，可以做成纯前端工具：

```text
浏览器 -> https://api.1010101.asia/v1/images/generations
浏览器 -> https://api.1010101.asia/v1/images/edits
```

如果给别人用，建议加一层后端代理：

```text
浏览器 -> 你的后端 /api/image2 -> https://api.1010101.asia/v1/images/generations
浏览器 -> 你的后端 /api/image2/edit -> https://api.1010101.asia/v1/images/edits
```

这样不会把 Key 暴露给访问者。你也可以在后端处理额度、日志、错误提示和内容安全。

## 常见问题

### image2 可以当聊天接口用吗？

不可以。

image2 调用的是图片接口，不是 Chat、Responses 或 Anthropic Messages 接口。

聊天工具通常发送 `messages` 或 `input`。image2 需要的是 `prompt`、`image`、`size`、`quality` 这类图片字段。

### 为什么编辑图片失败？

先检查三点：

1. 是否上传了图片，或从历史记录点了“继续编辑”
2. 请求是否走 `POST /v1/images/edits`
3. 是否使用 `multipart/form-data`，并且没有手动写死 `Content-Type`

### 为什么历史记录没有保存？

浏览器的 `localStorage` 空间有限。

图片是 Base64，体积可能比较大。空间不够时，当前图片仍然可以下载，但历史记录可能保存失败。
