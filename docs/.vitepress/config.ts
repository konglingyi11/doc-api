import { defineConfig } from 'vitepress'

const rawVersion = process.env.VITEPRESS_VERSION || process.env.npm_package_version || '1.0.0'
const version = rawVersion.replace(/^v/, '')

export default defineConfig({
  title: '途联通证配置文档',
  description: '帮助你在常见编程工具中快速配置 API Key、Base URL 与模型接入方式',
  lang: 'zh-CN',

  themeConfig: {
    logo: 'https://rustfs.1010101.asia/api.1010101.asia/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/start/common-principles' },
      { text: '工具配置', link: '/tools/claude-code' },
      { text: '能力接口', link: '/capabilities/image2' },
      { text: '故障排查', link: '/troubleshooting/faq' },
      { text: '控制台', link: 'https://api.1010101.asia' }
    ],

    sidebar: {
      '/start/': [
        {
          text: '快速开始',
          items: [
            { text: '通用配置原则', link: '/start/common-principles' },
            { text: '创建 API 令牌', link: '/start/api-token' },
            { text: '什么是 API Key', link: '/start/api-key' },
            { text: '什么是 Base URL', link: '/start/base-url' },
            { text: '如何验证配置是否生效', link: '/start/verify' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '推荐路径',
          items: [
            { text: 'Claude Code', link: '/tools/claude-code' },
            { text: 'CC Switch', link: '/tools/cc-switch' }
          ]
        },
        {
          text: '命令行工具',
          items: [
            { text: 'Codex', link: '/tools/codex' },
            { text: 'OpenCode', link: '/tools/open-code' },
            { text: 'OpenClaw', link: '/tools/openclaw' },
            { text: 'Hermes', link: '/tools/hermes' }
          ]
        },
        {
          text: 'IDE 与编辑器插件',
          items: [
            { text: 'Cline', link: '/tools/cline' },
            { text: 'Continue', link: '/tools/continue' },
            { text: 'Roo Code', link: '/tools/roo-code' },
            { text: 'Cursor', link: '/tools/cursor' },
            { text: 'Windsurf', link: '/tools/windsurf' }
          ]
        },
        {
          text: '桌面客户端',
          items: [
            { text: 'Cherry Studio', link: '/tools/cherry-studio' }
          ]
        }
      ],
      '/capabilities/': [
        {
          text: '能力接口',
          items: [
            { text: 'image2 图片接口', link: '/capabilities/image2' }
          ]
        }
      ],
      '/troubleshooting/': [
        {
          text: '故障排查',
          items: [
            { text: '常见问题', link: '/troubleshooting/faq' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/konglingyi11/doc-api' }
    ],

    search: {
      provider: 'local'
    },

    // 在页脚显示版本号
    footer: {
      message: `Released under the MIT License. Version v${version}`,
      copyright: 'Copyright © 2026-present'
    }
  }
})
