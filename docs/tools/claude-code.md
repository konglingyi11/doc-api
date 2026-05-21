# Claude Code 配置教程

Claude Code 是 Anthropic 的命令行代码助手。

本文先介绍 Claude Code 本体安装、接口格式和推荐接入路径。多分组令牌和 CC Switch 的详细配置已经拆成独立教程。

## 推荐配置路径

如果你只用一个 Key，可以直接配置 Claude Code。

如果你希望使用多个 Claude 分组令牌，并通过本地路由实现故障转移，推荐按下面顺序配置：

1. 安装 Claude Code。
2. 创建 [API 令牌](/start/api-token)。
3. 按 [CC Switch 配置教程](/tools/cc-switch) 导入令牌并加入队列。
4. 回到本文完成验证。

多分组方案适合长时间使用 Claude Code 写代码。当前分组请求失败时，CC Switch 可以按队列切到下一个可用分组。

## 准备工作

请先准备：

- 一台可正常联网的电脑。
- 已安装 Node.js 18 或更高版本。
- 如果使用多分组方案，请先准备可访问的 [令牌管理页面](https://api.1010101.asia/console/token)。

## 这个工具使用什么接口

Claude Code 主要对接 **Anthropic Messages** 格式。

如果手动配置自定义 Base URL，通常填写根地址，不带 `/v1`：

```text
https://api.1010101.asia
```

如果走 CC Switch，本地路由和多令牌队列由 CC Switch 管理。通常不需要在 Claude Code 中手动维护多套地址。

## 安装 Claude Code

### Windows

1. 安装 Node.js 18+。
2. 执行：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

3. 安装完成后，在终端执行：

```bash
claude --version
```

如果能正常输出版本号，说明 Claude Code 已安装成功。

### macOS

```bash
brew install node
npm install -g @anthropic-ai/claude-code
claude --version
```

### Linux

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g @anthropic-ai/claude-code
claude --version
```

## 配置方式

### 方式一：直接配置 Claude Code

Claude Code 支持直接配置 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`。

这种方式适合只使用一个 Key 的场景。

### 方式二：通过 CC Switch 管理多分组

这种方式适合需要多个 Claude 分组、优先级队列和自动故障转移的场景。

继续阅读：

- [创建 API 令牌](/start/api-token)
- [CC Switch 配置教程](/tools/cc-switch)

## 如何验证

1. 先检查 Claude Code 是否可用：

```bash
claude --version
```

2. 如果使用 CC Switch，确认 CC Switch 已打开本地路由。
3. 如果使用 CC Switch，确认至少一个 Claude 分组已经点击“加入”。
4. 启动 Claude Code，并发送一个简单请求。
5. 如果能收到正常回复，说明配置成功。

## 常见问题

### Claude Code 已安装，但无法正常调用

先执行：

```bash
claude --version
```

如果命令不存在，说明 Claude Code 本体没有装好。

请回到安装步骤，检查 Node.js 和安装命令。

### 应该直接配置 Claude Code，还是使用 CC Switch

- 如果只用一个 Key，可以直接配置 Claude Code。
- 如果要多分组切换和故障转移，更适合走 CC Switch。
- 如果走“网页导入到 CC Switch”的流程，通常以导入后的配置为准，不需要手动维护多套地址。

### 模型名称应该填什么

模型名称可能变化，填写时以页面里能选到的模型为准。
