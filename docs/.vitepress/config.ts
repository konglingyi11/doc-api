import { defineConfig } from 'vitepress'

// 从环境变量或 VERSION.txt 读取版本号
const version = process.env.npm_package_version || '1.0.0'

export default defineConfig({
  title: 'API Key 与 Base URL 配置文档',
  description: '帮助你在常见编程工具中快速配置自定义 API Key 与 Base URL',
  lang: 'zh-CN',

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '通用说明', link: '/guide/common-principles' },
      { text: '工具配置', link: '/tools/claude-code' },
      { text: '常见问题', link: '/guide/faq' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '通用说明',
          items: [
            { text: '什么是 API Key', link: '/guide/api-key' },
            { text: '什么是 Base URL', link: '/guide/base-url' },
            { text: '通用配置原则', link: '/guide/common-principles' },
            { text: '如何验证配置是否生效', link: '/guide/verify' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具配置',
          items: [
            { text: 'Claude Code', link: '/tools/claude-code' },
            { text: 'Codex', link: '/tools/codex' },
            { text: 'OpenCode', link: '/tools/open-code' },
            { text: 'Cline', link: '/tools/cline' },
            { text: 'Cherry Studio', link: '/tools/cherry-studio' },
            { text: 'Continue', link: '/tools/continue' },
            { text: 'Roo Code', link: '/tools/roo-code' },
            { text: 'Cursor', link: '/tools/cursor' },
            { text: 'Windsurf', link: '/tools/windsurf' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
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
