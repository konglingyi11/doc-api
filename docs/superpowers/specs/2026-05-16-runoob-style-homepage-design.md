# 菜鸟教程式首页设计

本次只改首页。

目标是让首页更像菜鸟教程的入口页。

学的是它的结构和节奏：

- 先告诉用户这个站点是干什么的。
- 然后给清楚的分类入口。
- 每个入口都像教程目录。
- 少写大段介绍。
- 不做营销式大标题。

不照抄菜鸟教程的代码、样式和内容。

## 当前问题

现在首页使用 VitePress 默认 `layout: home`。

它有大标题、按钮和 feature 卡片。

问题是：

- 工具入口不够像教程目录。
- 首页第一眼更像产品介绍，不像资料站。
- 用户要往下看，才知道有哪些工具。
- image2、通用教程、工具教程没有明显分区。

## 首页结构

首页改成普通 Markdown 首页。

不再使用 VitePress 默认 hero。

推荐结构：

```md
# 途联通证配置教程

常见 AI 编程工具的 API Key、Base URL 和模型配置教程。

## 工具配置

## 通用教程

## 图片接口

## 配置排查
```

每个分区下面放入口列表。

工具配置放：

- Claude Code
- Codex
- OpenCode
- Cline
- Cherry Studio
- Continue
- Roo Code
- Cursor
- Windsurf

通用教程放：

- 什么是 API Key
- 什么是 Base URL
- 通用配置原则
- 如何验证配置
- 常见问题

图片接口放：

- image2 图片接口教程

配置排查放：

- API Key 401
- Base URL `/v1`
- 模型不存在
- Provider 选错

排查入口可以链接到现有 FAQ 或验证页面，不新增页面。

## 视觉风格

视觉上做成简单入口页。

要求：

- 白底。
- 内容居中。
- 桌面端两到三列。
- 移动端一列。
- 分区标题清楚。
- 链接块像教程入口。
- 鼠标悬停有轻微反馈。
- 不使用大面积渐变。
- 不使用夸张 hero。
- 不新增图片。

整体感觉应该像文档目录，不像官网首页。

## 文件改动

计划改这些文件：

- `docs/index.md`
- `docs/.vitepress/theme/index.js`
- 新增 `docs/.vitepress/theme/style.css`

可能小改：

- `docs/.vitepress/config.ts`

如果改 `config.ts`，只允许调整站点描述或首页相关文案。

不改：

- 工具页正文
- 通用指南正文
- image2 页面正文
- 侧边栏结构
- 路由路径
- API 示例
- Vue 组件逻辑

## 实现方式

`docs/index.md` 使用普通 Markdown 和少量 HTML class。

示例：

```md
<div class="home-grid">
  <a class="home-card" href="/tools/claude-code">
    <strong>Claude Code</strong>
    <span>Claude 接口和 CC Switch 配置</span>
  </a>
</div>
```

样式放到 `docs/.vitepress/theme/style.css`。

`docs/.vitepress/theme/index.js` 引入样式：

```js
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default DefaultTheme
```

## 文案标准

文案继续按菜鸟教程式写法：

- 句子短。
- 标题短。
- 入口说明短。
- 用户能一眼知道点哪里。
- 不写“赋能、闭环、方案、体系、场景化”这类词。

## 验证

完成后运行：

```bash
npm run docs:build
```

构建必须通过。

还要检查：

- 首页链接能跳到现有页面。
- 移动端不会横向溢出。
- 首页样式只影响首页，不影响普通文档页。
