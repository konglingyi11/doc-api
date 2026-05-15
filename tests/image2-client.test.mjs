import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildImage2Request,
  extractImage2DataUrl,
  normalizeImage2BaseUrl
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

test('extractImage2DataUrl converts the first base64 image to a displayable data URL', () => {
  const dataUrl = extractImage2DataUrl({
    data: [{ b64_json: 'ZmFrZS1pbWFnZQ==' }]
  }, 'webp')

  assert.equal(dataUrl, 'data:image/webp;base64,ZmFrZS1pbWFnZQ==')
})
