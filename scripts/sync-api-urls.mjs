import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const configPath = path.join(rootDir, 'config', 'api-urls.json')
const lockPath = path.join(rootDir, 'config', 'api-urls.lock.json')
const docsDir = path.join(rootDir, 'docs')

const urls = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const previousUrls = fs.existsSync(lockPath)
  ? JSON.parse(fs.readFileSync(lockPath, 'utf8'))
  : {}

const requiredKeys = ['apiBaseUrl', 'anthropicBaseUrl', 'openaiBaseUrl']
for (const key of requiredKeys) {
  if (typeof urls[key] !== 'string' || urls[key].trim() === '') {
    throw new Error(`Missing required URL config: ${key}`)
  }

  // Validate URL format
  const urlPattern = /^https?:\/\/[^\s]+$/
  if (!urlPattern.test(urls[key])) {
    throw new Error(`Invalid URL format for ${key}: ${urls[key]}`)
  }
}

const replacements = buildReplacements(urls, previousUrls)

const markdownFiles = []
collectMarkdownFiles(docsDir, markdownFiles)

let changedCount = 0
for (const file of markdownFiles) {
  try {
    const original = fs.readFileSync(file, 'utf8')
    let updated = original

    for (const [pattern, replacement] of replacements) {
      updated = updated.replace(pattern, replacement)
    }

    if (updated !== original) {
      fs.writeFileSync(file, updated)
      changedCount += 1
    }
  } catch (err) {
    console.error(`Failed to process ${file}: ${err.message}`)
    throw err
  }
}

console.log(`Synced API URL examples in ${changedCount} markdown file(s).`)
fs.writeFileSync(lockPath, `${JSON.stringify(urls, null, 2)}\n`)

function collectMarkdownFiles(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, files)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
}

function buildReplacements(currentUrls, oldUrls) {
  const pairs = [
    ['openaiBaseUrl', 'https://api.1010101.asia/v1'],
    ['apiBaseUrl', 'https://api.1010101.asia/'],
    ['anthropicBaseUrl', 'https://api.1010101.asia']
  ]

  return pairs.flatMap(([key, fallback]) => {
    const candidates = new Set([fallback])
    if (typeof oldUrls[key] === 'string' && oldUrls[key].trim() !== '') {
      candidates.add(oldUrls[key])
    }

    return [...candidates]
      .filter((candidate) => candidate !== currentUrls[key])
      .map((candidate) => [new RegExp(escapeRegExp(candidate), 'g'), currentUrls[key]])
  })
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
