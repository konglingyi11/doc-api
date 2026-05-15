import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildImage2EditRequest,
  buildImage2Request,
  extractImage2DataUrl,
  loadImage2History,
  loadStoredImage2Key,
  normalizeImage2BaseUrl,
  removeStoredImage2Key,
  saveImage2HistoryItem,
  saveStoredImage2Key
} from '../docs/.vitepress/theme/utils/image2-client.js'

test('normalizeImage2BaseUrl removes trailing slashes', () => {
  assert.equal(normalizeImage2BaseUrl('https://api.1010101.asia///'), 'https://api.1010101.asia')
})

test('buildImage2Request targets the OpenAI-compatible image generation endpoint', () => {
  const request = buildImage2Request({
    apiKey: 'sk-test',
    baseUrl: 'https://api.1010101.asia/',
    prompt: '一张赛博朋克风格的城市海报',
    size: '1024x1024',
    quality: 'medium',
    outputFormat: 'png'
  })

  assert.equal(request.url, 'https://api.1010101.asia/v1/images/generations')
  assert.equal(request.options.method, 'POST')
  assert.equal(request.options.headers.Authorization, 'Bearer sk-test')
  assert.equal(request.options.headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(request.options.body), {
    model: 'gpt-image-2',
    prompt: '一张赛博朋克风格的城市海报',
    size: '1024x1024',
    quality: 'medium',
    output_format: 'png'
  })
})

test('buildImage2EditRequest targets the OpenAI-compatible image edit endpoint', () => {
  const imageFile = new File(['fake image'], 'source.png', { type: 'image/png' })

  const request = buildImage2EditRequest({
    apiKey: 'sk-test',
    baseUrl: 'https://api.1010101.asia/',
    prompt: '把背景换成清晨的厨房',
    imageFile,
    size: '1024x1024',
    quality: 'high',
    outputFormat: 'webp'
  })

  assert.equal(request.url, 'https://api.1010101.asia/v1/images/edits')
  assert.equal(request.options.method, 'POST')
  assert.equal(request.options.headers.Authorization, 'Bearer sk-test')
  assert.equal(request.options.headers['Content-Type'], undefined)
  assert.equal(request.options.body.get('model'), 'gpt-image-2')
  assert.equal(request.options.body.get('prompt'), '把背景换成清晨的厨房')
  assert.equal(request.options.body.get('size'), '1024x1024')
  assert.equal(request.options.body.get('quality'), 'high')
  assert.equal(request.options.body.get('output_format'), 'webp')
  assert.equal(request.options.body.get('image').name, 'source.png')
})

test('extractImage2DataUrl converts the first base64 image to a displayable data URL', () => {
  const dataUrl = extractImage2DataUrl({
    data: [{ b64_json: 'ZmFrZS1pbWFnZQ==' }]
  }, 'webp')

  assert.equal(dataUrl, 'data:image/webp;base64,ZmFrZS1pbWFnZQ==')
})

test('stored key helpers save, load, and remove keys from browser storage', () => {
  const storage = createMemoryStorage()

  saveStoredImage2Key(storage, '  sk-local  ')
  assert.equal(loadStoredImage2Key(storage), 'sk-local')

  removeStoredImage2Key(storage)
  assert.equal(loadStoredImage2Key(storage), '')
})

test('history helper stores newest image first and keeps a bounded list', () => {
  const storage = createMemoryStorage()

  for (let index = 1; index <= 4; index += 1) {
    saveImage2HistoryItem(storage, {
      id: `item-${index}`,
      mode: 'generate',
      prompt: `prompt-${index}`,
      imageUrl: `data:image/png;base64,${index}`,
      createdAt: `2026-05-15T00:00:0${index}.000Z`
    }, 3)
  }

  assert.deepEqual(loadImage2History(storage).map((item) => item.id), ['item-4', 'item-3', 'item-2'])
})

function createMemoryStorage() {
  const values = new Map()

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null
    },
    setItem(key, value) {
      values.set(key, String(value))
    },
    removeItem(key) {
      values.delete(key)
    }
  }
}
