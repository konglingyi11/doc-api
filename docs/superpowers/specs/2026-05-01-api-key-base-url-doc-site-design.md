# 自定义 API Key 与 Base URL 文档站设计规格

## 1. 项目目标

构建一个纯静态中文文档网站，教用户如何在常见编程工具中自定义 `API Key` 与 `Base URL`，并将 `https://api.1010101.asia/` 作为首版示例中的默认 `Base URL`。站点面向新手与有经验开发者混合人群：首页负责解释通用概念与快速开始，各工具页负责提供最短可执行配置步骤与排错信息。

## 2. 目标用户

- 希望将常见 AI 编程工具接入自定义接口地址的普通用户
- 不熟悉 `API Key`、`Base URL`、Provider 概念的新手用户
- 希望快速复制配置、尽快完成接入的有经验开发者

## 3. 设计原则

1. 以可执行为第一优先级，避免只讲概念不讲配置。
2. 以最短路径帮助用户完成配置：首页讲通用步骤，工具页直接给操作方法。
3. 站点内容自包含，不依赖外部链接完成核心流程。
4. 图片资源全部下载到本地并随站点一起发布，不引用远程图片。
5. 首版优先保证结构稳定、内容完整、后续易扩展。
6. 页面风格保持干净、轻量、偏官方文档体验，不做复杂交互。

## 4. 范围

### 4.1 首版必须覆盖的工具

- Claude Code
- Codex
- OpenCode
- Cline
- Cherry Studio
- Continue
- Roo Code
- Cursor
- Windsurf

### 4.2 首版必须覆盖的平台

- Windows
- macOS
- Linux

### 4.3 每个工具页必须包含的内容

- 配置位置
- 配置示例
- 验证方法
- 常见报错

## 5. 信息架构

### 5.1 顶级结构

- 首页
- 通用说明
  - 什么是 API Key
  - 什么是 Base URL
  - 通用配置原则
  - 如何验证配置是否生效
  - 常见问题
- 工具配置
  - Claude Code
  - Codex
  - OpenCode
  - Cline
  - Cherry Studio
  - Continue
  - Roo Code
  - Cursor
  - Windsurf

### 5.2 首页职责

首页只做三件事：

1. 用最短篇幅解释用户真正需要修改的是 `API Key` 与 `Base URL`
2. 给出统一默认 `Base URL`：`https://api.1010101.asia/`
3. 提供按工具进入的清晰入口

首页应包含以下模块：

- Hero 区：标题、副标题、开始按钮
- 3 步快速开始
- 工具入口卡片区
- 通用说明摘要区
- 常见问题预览区

### 5.3 导航结构

顶部导航：

- 首页
- 通用说明
- 工具配置
- 常见问题

侧边栏分组：

- 通用说明
- 工具配置

## 6. 内容组织

### 6.1 首页内容策略

首页偏向概览与引导，不承载长篇细节。用户进入首页后，应能在几十秒内理解以下信息：

- 为什么需要配置 `API Key`
- 为什么有些工具需要自定义 `Base URL`
- 默认示例地址是什么
- 自己应该点击哪个工具页继续

### 6.2 工具页固定模板

每个工具页采用统一结构：

1. 工具简介
   - 说明这是命令行工具、编辑器插件还是桌面应用
2. 配置位置
   - 说明设置入口、配置文件或菜单路径
3. 配置示例
   - 给出可直接照抄的示例
   - 默认使用 `https://api.1010101.asia/`
4. 验证方法
   - 说明如何确认配置已生效
   - 明确成功现象
5. 常见报错
   - 例如 `401`、`404`、模型列表为空、连接超时等
6. 本地截图
   - 放关键节点截图，不堆砌步骤图

### 6.3 内容粒度约束

每个工具页以“配置位置 + 配置示例 + 验证方法 + 常见报错”为最小闭环，不额外扩展大量背景知识。背景解释统一放在通用页，避免工具页重复冗长。

## 7. 视觉与交互设计

### 7.1 视觉风格

- 干净、轻量、偏官方文档风格
- 重点突出“清楚、快找、能复制”
- 首页允许使用卡片式入口提升可读性
- 支持浅色与暗色模式，但不做额外品牌化视觉系统

### 7.2 图片策略

- 图片是辅助，不替代文字步骤与配置代码块
- 图形界面工具优先配关键截图：Cherry Studio、Continue、Roo Code、Cursor、Windsurf、Cline
- 命令行工具以文字步骤和代码块为主：Claude Code、Codex、OpenCode
- 每个工具页控制在 1 到 3 张关键截图
- 所有图片资源下载到本地后再引用

### 7.3 交互边界

- 不做登录
- 不做在线测试接口
- 不做后端服务
- 不做复杂动画
- 首版只保留文档阅读所需的基础交互

## 8. 资料整理策略

1. 可参考公开资料核对当前配置方式。
2. 站内内容统一重写，保持术语和结构一致。
3. 站内不放外部参考链接。
4. 用户完成配置所需的信息，尽量全部在站内闭环提供。
5. 对界面频繁变化的工具，优先写“路径描述 + 关键词”，降低截图过期风险。

## 9. 技术方案

### 9.1 框架选择

采用 VitePress 构建文档站。

选择原因：

- 适合技术文档
- 纯静态输出，部署简单
- 导航、侧边栏、代码块与搜索体验成熟
- 后续新增工具页维护成本低

### 9.2 部署形式

- 输出为纯静态站点
- 便于部署到 GitHub Pages、Vercel、Nginx 等静态托管环境
- 首版不依赖任何后端基础设施

### 9.3 搜索策略

首版采用 VitePress 自带的本地搜索能力或等价轻量配置，不引入单独搜索服务。

## 10. 目录结构

建议采用如下目录结构：

```text
docs/
  index.md
  guide/
    api-key.md
    base-url.md
    common-principles.md
    verify.md
    faq.md
  tools/
    claude-code.md
    codex.md
    open-code.md
    cline.md
    cherry-studio.md
    continue.md
    roo-code.md
    cursor.md
    windsurf.md
  public/
    images/
      tools/
        claude-code/
        codex/
        open-code/
        cline/
        cherry-studio/
        continue/
        roo-code/
        cursor/
        windsurf/
  .vitepress/
    config.ts
```

## 11. 首版页面清单

### 11.1 核心页面

- `docs/index.md`
- `docs/guide/api-key.md`
- `docs/guide/base-url.md`
- `docs/guide/common-principles.md`
- `docs/guide/verify.md`
- `docs/guide/faq.md`

### 11.2 工具页面

- `docs/tools/claude-code.md`
- `docs/tools/codex.md`
- `docs/tools/open-code.md`
- `docs/tools/cline.md`
- `docs/tools/cherry-studio.md`
- `docs/tools/continue.md`
- `docs/tools/roo-code.md`
- `docs/tools/cursor.md`
- `docs/tools/windsurf.md`

## 12. 页面行为要求

### 12.1 首页

首页必须让用户快速完成以下动作：

- 理解通用概念
- 获得默认 `Base URL`
- 进入目标工具页

### 12.2 工具页

工具页必须让用户在单页内完成以下闭环：

- 找到配置入口
- 复制可用示例
- 验证配置成功
- 遇到错误时完成基本排查

## 13. 非目标

首版不包含以下内容：

- 多语言支持
- 账号系统
- 用户评论或反馈系统
- 在线 API 联通性检测
- 自动抓取官方文档并同步
- 高度定制化可视化首页动画

## 14. 验收标准

当以下条件全部满足时，首版设计视为达标：

1. 网站可作为纯静态站点部署。
2. 首页能清晰解释 `API Key` 与 `Base URL` 的基本概念。
3. 已覆盖 9 个指定工具的独立页面。
4. 每个工具页都包含配置位置、配置示例、验证方法、常见报错四个核心区块。
5. 所有站内图片均为本地资源引用。
6. 用户不依赖外部链接即可完成主要配置流程。
7. 站点结构允许后续继续新增工具页而不需要重做导航体系。
