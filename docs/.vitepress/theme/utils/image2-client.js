const DEFAULT_MODEL = 'gpt-image-2'
const KEY_STORAGE_KEY = 'image2.apiKey'
const HISTORY_STORAGE_KEY = 'image2.history'

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

export function buildImage2EditRequest({
  apiKey,
  baseUrl,
  prompt,
  imageFile,
  size = '1024x1024',
  quality = 'medium',
  outputFormat = 'png'
}) {
  const normalizedBaseUrl = normalizeImage2BaseUrl(baseUrl)
  const formData = new FormData()
  formData.append('model', DEFAULT_MODEL)
  formData.append('prompt', String(prompt || '').trim())
  formData.append('image', imageFile)
  formData.append('size', size)
  formData.append('quality', quality)
  formData.append('output_format', outputFormat)

  return {
    url: `${normalizedBaseUrl}/v1/images/edits`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${String(apiKey || '').trim()}`
      },
      body: formData
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

export async function editImage2({ fetchImpl = fetch, ...params }) {
  const { url, options } = buildImage2EditRequest(params)
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

export function loadStoredImage2Key(storage = getBrowserStorage()) {
  return storage?.getItem(KEY_STORAGE_KEY) || ''
}

export function saveStoredImage2Key(storage = getBrowserStorage(), apiKey) {
  storage?.setItem(KEY_STORAGE_KEY, String(apiKey || '').trim())
}

export function removeStoredImage2Key(storage = getBrowserStorage()) {
  storage?.removeItem(KEY_STORAGE_KEY)
}

export function loadImage2History(storage = getBrowserStorage()) {
  const rawHistory = storage?.getItem(HISTORY_STORAGE_KEY)
  if (!rawHistory) {
    return []
  }

  try {
    const history = JSON.parse(rawHistory)
    return Array.isArray(history) ? history : []
  } catch {
    return []
  }
}

export function saveImage2HistoryItem(storage = getBrowserStorage(), item, limit = 12) {
  const history = loadImage2History(storage)
  const nextHistory = [item, ...history].slice(0, limit)
  storage?.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory))
  return nextHistory
}

export function clearImage2History(storage = getBrowserStorage()) {
  storage?.removeItem(HISTORY_STORAGE_KEY)
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

function getBrowserStorage() {
  return typeof window === 'undefined' ? undefined : window.localStorage
}
