const DEFAULT_MODEL = 'gpt-image-2'

export function normalizeImage2BaseUrl(baseUrl) {
  return String(baseUrl || '').trim().replace(/\/+$/, '')
}

export function buildImage2Request({
  apiKey,
  baseUrl,
  prompt,
  size = '1024x1024',
  quality = 'medium',
  outputFormat = 'png'
}) {
  const normalizedBaseUrl = normalizeImage2BaseUrl(baseUrl)

  return {
    url: `${normalizedBaseUrl}/v1/images/generations`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${String(apiKey || '').trim()}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        prompt: String(prompt || '').trim(),
        size,
        quality,
        output_format: outputFormat
      })
    }
  }
}

export function extractImage2DataUrl(payload, outputFormat = 'png') {
  const base64 = payload?.data?.[0]?.b64_json
  if (!base64) {
    throw new Error('响应中没有找到 data[0].b64_json。')
  }

  return `data:image/${outputFormat};base64,${base64}`
}

export async function generateImage2({ fetchImpl = fetch, ...params }) {
  const { url, options } = buildImage2Request(params)
  const response = await fetchImpl(url, options)
  const payload = await readJsonResponse(response)

  if (!response.ok) {
    throw new Error(formatImage2Error(response.status, payload))
  }

  return {
    imageUrl: extractImage2DataUrl(payload, params.outputFormat),
    payload
  }
}

async function readJsonResponse(response) {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

function formatImage2Error(status, payload) {
  const message = payload?.error?.message || payload?.message
  return message ? `请求失败 (${status}): ${message}` : `请求失败 (${status})。`
}
