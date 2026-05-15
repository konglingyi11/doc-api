<script setup>
import { ref } from 'vue'
import { generateImage2 } from '../utils/image2-client.js'

const baseUrl = ref('https://api.1010101.asia')
const apiKey = ref('')
const prompt = ref('一张干净的产品海报，展示一杯透明玻璃杯中的冰咖啡，白色背景，自然光，写实摄影风格')
const size = ref('1024x1024')
const quality = ref('medium')
const outputFormat = ref('png')
const imageUrl = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleGenerate() {
  errorMessage.value = ''
  imageUrl.value = ''

  if (!apiKey.value.trim()) {
    errorMessage.value = '请先填写 API Key。'
    return
  }

  if (!prompt.value.trim()) {
    errorMessage.value = '请先填写图片提示词。'
    return
  }

  isLoading.value = true
  try {
    const result = await generateImage2({
      apiKey: apiKey.value,
      baseUrl: baseUrl.value,
      prompt: prompt.value,
      size: size.value,
      quality: quality.value,
      outputFormat: outputFormat.value
    })
    imageUrl.value = result.imageUrl
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '生成失败，请检查接口地址、Key 和浏览器控制台。'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="image2-tool" aria-label="image2 纯前端绘图工具">
    <div class="image2-form">
      <label>
        <span>Base URL</span>
        <input v-model="baseUrl" autocomplete="off" spellcheck="false" />
      </label>

      <label>
        <span>API Key</span>
        <input v-model="apiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-..." />
      </label>

      <label class="image2-prompt">
        <span>提示词</span>
        <textarea v-model="prompt" rows="5" />
      </label>

      <div class="image2-grid">
        <label>
          <span>尺寸</span>
          <select v-model="size">
            <option value="1024x1024">1024x1024</option>
            <option value="1024x1536">1024x1536</option>
            <option value="1536x1024">1536x1024</option>
            <option value="auto">auto</option>
          </select>
        </label>

        <label>
          <span>质量</span>
          <select v-model="quality">
            <option value="medium">medium</option>
            <option value="low">low</option>
            <option value="high">high</option>
            <option value="auto">auto</option>
          </select>
        </label>

        <label>
          <span>格式</span>
          <select v-model="outputFormat">
            <option value="png">png</option>
            <option value="jpeg">jpeg</option>
            <option value="webp">webp</option>
          </select>
        </label>
      </div>

      <button type="button" :disabled="isLoading" @click="handleGenerate">
        {{ isLoading ? '生成中...' : '生成图片' }}
      </button>

      <p v-if="errorMessage" class="image2-error">{{ errorMessage }}</p>
    </div>

    <div class="image2-preview">
      <img v-if="imageUrl" :src="imageUrl" alt="image2 生成结果" />
      <div v-else class="image2-empty">生成结果会显示在这里</div>
    </div>
  </section>
</template>

<style scoped>
.image2-tool {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 24px;
  align-items: start;
  margin: 24px 0;
}

.image2-form,
.image2-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.image2-form {
  display: grid;
  gap: 16px;
  padding: 18px;
}

.image2-form label {
  display: grid;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.image2-form input,
.image2-form textarea,
.image2-form select {
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
}

.image2-form textarea {
  resize: vertical;
  line-height: 1.6;
}

.image2-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.image2-form button {
  min-height: 40px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: var(--vp-c-brand-1);
  font-weight: 700;
  cursor: pointer;
}

.image2-form button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.image2-error {
  margin: 0;
  color: var(--vp-c-danger-1);
  font-size: 14px;
}

.image2-preview {
  display: grid;
  place-items: center;
  min-height: 360px;
  padding: 12px;
}

.image2-preview img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.image2-empty {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  text-align: center;
}

@media (max-width: 860px) {
  .image2-tool,
  .image2-grid {
    grid-template-columns: 1fr;
  }
}
</style>
