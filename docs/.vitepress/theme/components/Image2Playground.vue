<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  clearImage2History,
  editImage2,
  generateImage2,
  loadImage2History,
  loadStoredImage2Key,
  removeStoredImage2Key,
  saveImage2HistoryItem,
  saveStoredImage2Key
} from '../utils/image2-client.js'

const baseUrl = ref('https://api.1010101.asia')
const apiKey = ref('')
const prompt = ref('一张白底产品图，主体清晰，背景干净，自然光，细节真实')
const sizePreset = ref('1024x1024')
const customSize = ref('1024x1024')
const quality = ref('medium')
const outputFormat = ref('png')
const mode = ref('generate')
const selectedFile = ref(null)
const sourceImageUrl = ref('')
const currentImageUrl = ref('')
const currentPrompt = ref('')
const currentFormat = ref('png')
const history = ref([])
const statusMessage = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const actionText = computed(() => {
  if (isLoading.value) {
    return mode.value === 'edit' ? '正在编辑...' : '正在生成...'
  }

  return mode.value === 'edit' ? '编辑图片' : '生成图片'
})

const requestSize = computed(() => {
  return sizePreset.value === 'custom' ? customSize.value.trim() : sizePreset.value
})

onMounted(() => {
  apiKey.value = loadStoredImage2Key()
  history.value = loadImage2History()
})

async function handleCreateImage() {
  resetMessages()

  if (!apiKey.value.trim()) {
    errorMessage.value = '请先填写 API Key。'
    return
  }

  if (!prompt.value.trim()) {
    errorMessage.value = '请先填写图片描述。'
    return
  }

  if (mode.value === 'edit' && !selectedFile.value) {
    errorMessage.value = '请先上传要编辑的图片。'
    return
  }

  if (!requestSize.value) {
    errorMessage.value = '请先填写自定义尺寸。'
    return
  }

  isLoading.value = true
  currentImageUrl.value = ''

  try {
    const params = {
      apiKey: apiKey.value,
      baseUrl: baseUrl.value,
      prompt: prompt.value,
      size: requestSize.value,
      quality: quality.value,
      outputFormat: outputFormat.value
    }

    const result = mode.value === 'edit'
      ? await editImage2({ ...params, imageFile: selectedFile.value })
      : await generateImage2(params)

    currentImageUrl.value = result.imageUrl
    currentPrompt.value = prompt.value
    currentFormat.value = outputFormat.value
    addHistoryItem(result.imageUrl)
    statusMessage.value = mode.value === 'edit'
      ? '编辑完成。可以下载，也可以继续编辑。'
      : '生成完成。可以下载，也可以继续编辑。'
  } catch (error) {
    errorMessage.value = error instanceof Error
      ? `${error.message} 请检查 API Key、Base URL、模型权限和接口路径后重试。`
      : '请求失败。请检查 API Key、Base URL、模型权限和接口路径后重试。'
  } finally {
    isLoading.value = false
  }
}

function handleFileChange(event) {
  const file = event.target.files?.[0]
  selectedFile.value = file || null
  sourceImageUrl.value = file ? URL.createObjectURL(file) : ''

  if (file) {
    mode.value = 'edit'
  }
}

function saveKey() {
  resetMessages()

  if (!apiKey.value.trim()) {
    errorMessage.value = '请先填写 API Key。'
    return
  }

  saveStoredImage2Key(undefined, apiKey.value)
  statusMessage.value = '已保存。API Key 仅保存在当前浏览器。'
}

function clearSavedKey() {
  removeStoredImage2Key()
  apiKey.value = ''
  statusMessage.value = '已清除本地保存的 API Key。'
}

function setGenerateMode() {
  mode.value = 'generate'
  selectedFile.value = null
  sourceImageUrl.value = ''
}

async function continueEdit(item = getCurrentItem()) {
  if (!item?.imageUrl) {
    return
  }

  resetMessages()
  selectedFile.value = await dataUrlToFile(item.imageUrl, `image2-edit.${item.outputFormat || 'png'}`)
  sourceImageUrl.value = item.imageUrl
  mode.value = 'edit'
  prompt.value = `继续编辑这张图片：${item.prompt || '保留主体，优化质感'}`
  statusMessage.value = '已切换到编辑模式。修改描述后点击“编辑图片”。'
}

function downloadImage(item = getCurrentItem()) {
  if (!item?.imageUrl) {
    return
  }

  const link = document.createElement('a')
  link.href = item.imageUrl
  link.download = `image2-${Date.now()}.${item.outputFormat || currentFormat.value || 'png'}`
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function clearHistory() {
  clearImage2History()
  history.value = []
  statusMessage.value = '历史记录已清空。'
}

function addHistoryItem(imageUrl) {
  const item = {
    id: `${Date.now()}`,
    mode: mode.value,
    prompt: prompt.value,
    imageUrl,
    outputFormat: outputFormat.value,
    createdAt: new Date().toISOString()
  }

  try {
    history.value = saveImage2HistoryItem(undefined, item)
  } catch {
    history.value = [item, ...history.value].slice(0, 12)
    statusMessage.value = '图片已生成，但本地空间不足，历史记录可能无法保存。'
  }
}

function getCurrentItem() {
  return currentImageUrl.value
    ? {
        imageUrl: currentImageUrl.value,
        prompt: currentPrompt.value,
        outputFormat: currentFormat.value
      }
    : null
}

async function dataUrlToFile(dataUrl, fileName) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type || 'image/png' })
}

function resetMessages() {
  statusMessage.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <section class="image2-workbench" aria-label="image2 在线工具">
    <div class="workbench-heading">
      <p class="eyebrow">在线试用</p>
      <h2>生成或编辑 image2 图片</h2>
      <p>
        填写 API Key 后，可以直接生成图片，也可以上传图片进行编辑。
        API Key 只保存在当前浏览器。
      </p>
    </div>

    <div class="workbench-layout">
      <form class="control-panel" @submit.prevent="handleCreateImage">
        <div class="mode-switch" role="tablist" aria-label="选择模式">
          <button type="button" :class="{ active: mode === 'generate' }" @click="setGenerateMode">
            生成图片
          </button>
          <button type="button" :class="{ active: mode === 'edit' }" @click="mode = 'edit'">
            编辑图片
          </button>
        </div>

        <label>
          <span>API Key</span>
          <input v-model="apiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-..." />
        </label>

        <div class="key-actions">
          <button type="button" class="secondary" @click="saveKey">保存到当前浏览器</button>
          <button type="button" class="ghost" @click="clearSavedKey">删除已保存的 Key</button>
        </div>

        <p class="storage-note">
          API Key 可在
          <a href="https://api.1010101.asia/console/token" target="_blank" rel="noopener noreferrer">https://api.1010101.asia/console/token</a>
          获取。
          保存后只写入当前浏览器的 localStorage。生成或编辑时，浏览器会把 Key 发送给
          <code>https://api.1010101.asia</code>。
        </p>

        <label>
          <span>Base URL</span>
          <input v-model="baseUrl" autocomplete="off" spellcheck="false" />
        </label>

        <label>
          <span>{{ mode === 'edit' ? '编辑描述' : '图片描述' }}</span>
          <textarea v-model="prompt" rows="5" />
        </label>

        <label v-if="mode === 'edit'">
          <span>上传图片</span>
          <input type="file" accept="image/png,image/jpeg,image/webp" @change="handleFileChange" />
        </label>

        <div v-if="sourceImageUrl" class="source-preview">
          <img :src="sourceImageUrl" alt="待编辑图片预览" />
          <span>将基于此图片进行编辑</span>
        </div>

        <div class="settings-grid">
          <label>
            <span>尺寸</span>
            <select v-model="sizePreset">
              <option value="1024x1024">1k</option>
              <option value="2048x2048">2k</option>
              <option value="4096x4096">4k</option>
              <option value="auto">自动</option>
              <option value="custom">自定义</option>
            </select>
          </label>

          <label v-if="sizePreset === 'custom'">
            <span>自定义尺寸</span>
            <input v-model="customSize" autocomplete="off" spellcheck="false" placeholder="1024x1536" />
          </label>

          <label>
            <span>质量</span>
            <select v-model="quality">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </label>

          <label>
            <span>格式</span>
            <select v-model="outputFormat">
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
          </label>
        </div>

        <button type="submit" class="primary-action" :disabled="isLoading">
          {{ actionText }}
        </button>

        <p v-if="statusMessage" class="message success">{{ statusMessage }}</p>
        <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>
      </form>

      <div class="result-panel">
        <div class="result-frame">
          <img v-if="currentImageUrl" :src="currentImageUrl" alt="image2 生成结果" />
          <div v-else class="empty-result">
            <strong>结果会显示在这里</strong>
            <span>
              {{ mode === 'edit' ? '上传图片，填写编辑描述，然后点击“编辑图片”。' : '填写图片描述，然后点击“生成图片”。' }}
            </span>
          </div>
        </div>

        <div class="result-actions">
          <button type="button" class="secondary" :disabled="!currentImageUrl" @click="downloadImage()">
            下载图片
          </button>
          <button type="button" class="secondary" :disabled="!currentImageUrl" @click="continueEdit()">
            继续编辑
          </button>
        </div>

        <div class="history-panel">
          <div class="history-heading">
            <h3>历史记录</h3>
            <button type="button" class="ghost" :disabled="history.length === 0" @click="clearHistory">
              清空
            </button>
          </div>

          <div v-if="history.length > 0" class="history-list">
            <article v-for="item in history" :key="item.id" class="history-item">
              <img :src="item.imageUrl" alt="历史图片" />
              <div>
                <p>{{ item.prompt }}</p>
                <span>{{ item.mode === 'edit' ? '编辑' : '生成' }} · {{ item.outputFormat?.toUpperCase() }}</span>
                <div class="history-actions">
                  <button type="button" class="ghost" @click="continueEdit(item)">继续编辑</button>
                  <button type="button" class="ghost" @click="downloadImage(item)">下载</button>
                </div>
              </div>
            </article>
          </div>
          <p v-else class="empty-history">生成或编辑图片后，历史记录会显示在这里。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image2-workbench {
  margin: 24px 0 40px;
  padding: 24px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  background: linear-gradient(180deg, #fff, var(--doc-surface-soft));
  box-shadow: var(--doc-shadow);
}

.workbench-heading {
  max-width: 760px;
  margin-bottom: 20px;
}

.workbench-heading .eyebrow {
  margin: 0 0 6px;
  color: var(--doc-brand);
  font-size: 13px;
  font-weight: 700;
}

.workbench-heading h2 {
  margin: 0 0 8px;
  border: 0;
  padding: 0;
  color: var(--doc-text-strong);
  font-size: 28px;
}

.workbench-heading p {
  margin: 0;
  color: var(--doc-text-muted);
  font-size: 15px;
  line-height: 1.7;
}

.workbench-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr);
  gap: 20px;
  align-items: start;
}

.control-panel,
.result-panel {
  display: grid;
  gap: 12px;
}

.mode-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  padding: 4px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  background: var(--doc-surface);
}

.mode-switch button,
.primary-action,
.secondary,
.ghost {
  min-height: 40px;
  border-radius: var(--doc-radius);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.mode-switch button {
  border: 0;
  color: var(--doc-text-muted);
  background: transparent;
}

.mode-switch button.active {
  color: #fff;
  background: var(--doc-brand);
}

.control-panel label {
  display: grid;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: var(--doc-text-strong);
}

.control-panel input,
.control-panel textarea,
.control-panel select {
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  padding: 8px 10px;
  color: var(--doc-text-strong);
  background: var(--doc-surface);
  font: inherit;
}

.control-panel textarea {
  resize: vertical;
  line-height: 1.6;
}

.key-actions,
.result-actions,
.history-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.storage-note {
  margin: -4px 0 0;
  color: var(--doc-text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.primary-action {
  border: 0;
  color: #fff;
  background: var(--doc-brand);
}

.secondary {
  border: 1px solid var(--doc-border);
  color: var(--doc-text-strong);
  background: var(--doc-surface);
}

.ghost {
  border: 1px solid var(--doc-border);
  color: var(--doc-text-muted);
  background: var(--doc-surface);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.source-preview {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  background: var(--doc-surface);
  color: var(--doc-text-muted);
  font-size: 13px;
}

.source-preview img {
  width: 72px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--doc-radius);
}

.message {
  margin: 0;
  font-size: 14px;
}

.message.success {
  color: var(--doc-success);
}

.message.error {
  color: #b42318;
}

.result-frame {
  display: grid;
  place-items: center;
  min-height: 360px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  background: var(--doc-surface);
  overflow: hidden;
}

.result-frame img {
  width: 100%;
  height: auto;
  display: block;
}

.empty-result {
  display: grid;
  gap: 6px;
  place-items: center;
  min-height: 320px;
  padding: 20px;
  color: var(--doc-text-muted);
  text-align: center;
}

.empty-result strong {
  color: var(--doc-text-strong);
}

.history-panel {
  display: grid;
  gap: 10px;
}

.history-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.history-heading h3 {
  margin: 0;
  font-size: 18px;
  color: var(--doc-text-strong);
}

.history-list {
  display: grid;
  gap: 10px;
  max-height: 460px;
  overflow: auto;
}

.history-item {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius);
  background: var(--doc-surface);
}

.history-item img {
  width: 84px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--doc-radius);
}

.history-item p {
  display: -webkit-box;
  margin: 0 0 4px;
  overflow: hidden;
  color: var(--doc-text-strong);
  font-size: 13px;
  line-height: 1.45;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.history-item span,
.empty-history {
  color: var(--doc-text-muted);
  font-size: 12px;
}

.history-actions {
  margin-top: 8px;
}

.history-actions .ghost {
  min-height: 30px;
  padding: 0 10px;
  font-size: 12px;
}

.empty-history {
  margin: 0;
}

@media (max-width: 900px) {
  .image2-workbench {
    padding: 16px;
  }

  .workbench-layout {
    grid-template-columns: 1fr;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .result-frame {
    min-height: 300px;
  }
}
</style>
