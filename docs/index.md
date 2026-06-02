---
pageClass: home-page
---

# 常见 AI 编程工具接入指南

<div class="home-hero">
  <div class="home-hero-copy">
    <p class="home-eyebrow">API Key / Base URL / 模型名称 / Provider</p>
    <p class="home-summary">按创建令牌、填写 Base URL、选择模型和验证请求的顺序，完成工具配置并定位常见错误。</p>
    <div class="home-actions">
      <a class="home-button home-button-primary" href="/start/api-token.html">开始配置</a>
      <a class="home-button home-button-secondary" href="/troubleshooting/faq.html">查看故障排查</a>
    </div>
  </div>

  <section class="home-checklist" aria-labelledby="home-checklist-title">
    <h2 id="home-checklist-title">配置前检查</h2>
    <ol>
      <li><span>1</span><p>确认 API 令牌已经创建，并完整复制。</p></li>
      <li><span>2</span><p>确认 Base URL 使用服务根地址，不重复填写 <code>/v1</code>。</p></li>
      <li><span>3</span><p>确认 Provider 与工具要求的接口格式一致。</p></li>
      <li><span>4</span><p>保存配置后发起真实请求，用返回错误定位问题。</p></li>
    </ol>
  </section>
</div>

## 快速开始

<p class="home-section-note">新用户建议按以下顺序完成配置。每一步都对应一个可验证的结果。</p>

<div class="home-grid home-grid-steps">
  <a class="home-card home-step-card" href="/start/api-token.html">
    <span class="home-card-label">STEP 01</span>
    <strong>创建 API 令牌</strong>
    <span>在控制台创建用于工具接入的 API Key。</span>
  </a>
  <a class="home-card home-step-card" href="/start/base-url.html">
    <span class="home-card-label">STEP 02</span>
    <strong>确认 Base URL</strong>
    <span>检查接口地址和 <code>/v1</code> 的填写规则。</span>
  </a>
  <a class="home-card home-step-card" href="/start/common-principles.html">
    <span class="home-card-label">STEP 03</span>
    <strong>选择模型和 Provider</strong>
    <span>按工具要求填写模型名称和服务商类型。</span>
  </a>
  <a class="home-card home-step-card" href="/start/verify.html">
    <span class="home-card-label">STEP 04</span>
    <strong>验证配置结果</strong>
    <span>保存后发起请求，确认配置已经生效。</span>
  </a>
  <a class="home-card home-step-card" href="/start/api-key.html">
    <span class="home-card-label">REFERENCE</span>
    <strong>理解 API Key</strong>
    <span>了解密钥填写位置、权限含义和 401 排查方向。</span>
  </a>
</div>

## 工具配置

<p class="home-section-note">先选择正在使用的工具，再按对应页面填写 API Key、Base URL、模型名称和 Provider。</p>

<h3 class="home-subtitle">推荐路径</h3>

<div class="home-grid home-grid-tools">
  <a class="home-card" href="/tools/claude-code.html">
    <span class="home-card-label">推荐</span>
    <strong>Claude Code</strong>
    <span>Claude Code 安装、环境变量和验证入口。</span>
  </a>
  <a class="home-card" href="/tools/cc-switch.html">
    <span class="home-card-label">推荐</span>
    <strong>CC Switch</strong>
    <span>本地路由、配置导入和故障转移。</span>
  </a>
</div>

<h3 class="home-subtitle">命令行工具</h3>

<div class="home-grid home-grid-tools">
  <a class="home-card" href="/tools/codex.html">
    <span class="home-card-label">CLI</span>
    <strong>Codex</strong>
    <span>OpenAI Responses 接口和 <code>/v1</code> 配置。</span>
  </a>
  <a class="home-card" href="/tools/open-code.html">
    <span class="home-card-label">CLI</span>
    <strong>OpenCode</strong>
    <span><code>/connect</code> 流程和 Provider 写法。</span>
  </a>
  <a class="home-card" href="/tools/openclaw.html">
    <span class="home-card-label">CLI</span>
    <strong>OpenClaw</strong>
    <span><code>openclaw.json</code> 和 OpenAI 兼容接口。</span>
  </a>
  <a class="home-card" href="/tools/hermes.html">
    <span class="home-card-label">CLI</span>
    <strong>Hermes</strong>
    <span><code>hermes model</code> 和自定义端点。</span>
  </a>
</div>

<h3 class="home-subtitle">IDE 与编辑器插件</h3>

<div class="home-grid home-grid-tools">
  <a class="home-card" href="/tools/cline.html">
    <span class="home-card-label">IDE</span>
    <strong>Cline</strong>
    <span>Provider 类型、Base URL 和模型名称。</span>
  </a>
  <a class="home-card" href="/tools/continue.html">
    <span class="home-card-label">IDE</span>
    <strong>Continue</strong>
    <span>配置文件结构和 Provider 类型。</span>
  </a>
  <a class="home-card" href="/tools/roo-code.html">
    <span class="home-card-label">IDE</span>
    <strong>Roo Code</strong>
    <span>OpenAI Compatible Provider 配置。</span>
  </a>
  <a class="home-card" href="/tools/cursor.html">
    <span class="home-card-label">IDE</span>
    <strong>Cursor</strong>
    <span>BYOK 设置和自定义接口支持情况。</span>
  </a>
  <a class="home-card" href="/tools/windsurf.html">
    <span class="home-card-label">IDE</span>
    <strong>Windsurf</strong>
    <span>API Key 入口和 BYOK 限制。</span>
  </a>
</div>

<h3 class="home-subtitle">桌面客户端</h3>

<div class="home-grid home-grid-single">
  <a class="home-card" href="/tools/cherry-studio.html">
    <span class="home-card-label">Desktop</span>
    <strong>Cherry Studio</strong>
    <span>Provider、接口地址和模型名称。</span>
  </a>
</div>

## 能力接口

<div class="home-grid home-grid-single">
  <a class="home-card" href="/capabilities/image2.html">
    <span class="home-card-label">Images API</span>
    <strong>image2 图片接口</strong>
    <span>生成图片、编辑图片和在线试用。该接口不用于聊天模型配置。</span>
  </a>
</div>

## 故障排查

<p class="home-section-note">根据返回错误进入对应页面，先确认 Key、Base URL、模型名称和 Provider。</p>

<div class="home-grid">
  <a class="home-card" href="/troubleshooting/faq.html">
    <span class="home-card-label">FAQ</span>
    <strong>常见问题</strong>
    <span>集中查看 401、404、模型不存在和 Provider 错误。</span>
  </a>
  <a class="home-card" href="/start/api-key.html#常见错误">
    <span class="home-card-label">401</span>
    <strong>API Key 无效</strong>
    <span>检查 Key 是否完整、有效，并确认账号权限。</span>
  </a>
  <a class="home-card" href="/start/base-url.html#常见错误">
    <span class="home-card-label">404</span>
    <strong>Base URL 路径错误</strong>
    <span>检查 <code>/v1</code> 是否多写、少写或位置错误。</span>
  </a>
  <a class="home-card" href="/start/verify.html#失败后看报错">
    <span class="home-card-label">Model</span>
    <strong>模型不存在</strong>
    <span>检查模型名称、账号权限和服务商支持情况。</span>
  </a>
  <a class="home-card" href="/troubleshooting/faq.html#provider-应该选哪个">
    <span class="home-card-label">Provider</span>
    <strong>Provider 选择错误</strong>
    <span>按工具页面选择对应接口格式。</span>
  </a>
</div>
