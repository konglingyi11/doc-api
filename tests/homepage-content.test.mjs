import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const homepage = readFileSync(new URL('../docs/index.md', import.meta.url), 'utf8')

test('homepage uses the approved documentation title and summary', () => {
  assert.match(homepage, /^# 常见 AI 编程工具接入指南$/m)
  assert.match(homepage, /按创建令牌、填写 Base URL、选择模型和验证请求的顺序，完成工具配置并定位常见错误。/)
})

test('homepage exposes the task-oriented entry structure', () => {
  for (const className of [
    'home-hero',
    'home-checklist',
    'home-grid-steps',
    'home-card-label',
    'home-section-note'
  ]) {
    assert.match(homepage, new RegExp(`class="[^"]*${className}`))
  }
})

test('homepage keeps important existing destinations reachable', () => {
  for (const href of [
    '/start/api-token.html',
    '/start/base-url.html',
    '/start/common-principles.html',
    '/start/verify.html',
    '/tools/claude-code.html',
    '/tools/codex.html',
    '/capabilities/image2.html',
    '/troubleshooting/faq.html'
  ]) {
    assert.match(homepage, new RegExp(`href="${href.replaceAll('/', '\\/')}`))
  }
})
