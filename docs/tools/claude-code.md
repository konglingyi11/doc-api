# Claude Code 配置

Claude Code 是 Anthropic 官方提供的命令行编程工具，适合在终端里直接与 Claude 协作完成代码编写、修改和排错。本文档按“先安装 Claude Code，再接入 CC Switch，最后开启本地路由与自动故障转移”的顺序编写，适合希望把多个 Claude 分组令牌统一接入并提升稳定性的用户。

## 本节信息

- 适用对象：准备在 Windows、macOS 或 Linux 上使用 Claude Code 的用户
- 推荐阅读时长：8 到 12 分钟
- 预计正文篇幅：约 1800 字
- 适用接口：Anthropic Messages
- 推荐接入方式：Claude Code + CC Switch + 多分组令牌故障转移

## 开始前你需要准备什么

开始配置前，先确认这些条件已经满足：

- 一台可正常联网的电脑
- 已安装 Node.js 18 或更高版本
- 可访问 [CC Switch v3.14.1 官方发布页](https://github.com/farion1231/cc-switch/releases/tag/v3.14.1)
- 可访问 [令牌管理页面](https://api.1010101.asia/console/token)
- 已有可用账号，并能创建多个不同分组的 Claude 令牌

如果你的目标是尽量避免单一分组异常导致 Claude Code 中断，建议至少准备 2 到 3 个不同分组的令牌，再通过 CC Switch 统一管理。

## 先说明两个关键点

### 1. Claude Code 本身先安装

CC Switch 负责做本地路由和故障转移，但 Claude Code 仍然要先安装。没有 Claude Code，后面的接入流程无法完成。

### 2. 不建议把 CC Switch 安装包直接放进这个文档项目

可以做到，但不建议这样处理。原因很直接：

- 安装包体积大，会让文档仓库变重
- 二进制文件不适合频繁跟随文档版本管理
- 后续升级版本时，仓库里会积累多份历史安装包
- 文档站本身更适合放下载链接和操作说明，而不是托管桌面应用安装包

更稳妥的写法，是在文档中直接引导用户前往官方 Release 下载对应平台的安装包。

## Claude Code 接哪种接口

Claude Code 主要对接 **Anthropic Messages** 格式。

如果你是直接配置自定义 Base URL，通常应填写根地址，不带 `/v1` 后缀。  
正确示例：

```text
https://api.1010101.asia
```

不过本文主流程不是直接在 Claude Code 里手填 Key 和 Base URL，而是通过 CC Switch 来管理多个 Claude 令牌并做自动切换。

## 第一步：先安装 Claude Code

先完成 Claude Code 安装，再继续后面的 CC Switch 接入。

### Windows

1. 安装 Node.js 18+
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

## 第二步：安装 CC Switch

访问官方发布页：

- [CC Switch v3.14.1 官方下载页](https://github.com/farion1231/cc-switch/releases/tag/v3.14.1)

根据你的系统下载对应安装包：

- Windows：`CC-Switch-v3.14.1-Windows.msi`
- macOS：`CC-Switch-v3.14.1-macOS.dmg`
- Linux：建议根据发行版选择 `AppImage`、`.deb` 或 `.rpm`

安装完成后，先启动一次 CC Switch，确保软件可以正常打开。

## 第三步：打开本地路由

启动 CC Switch 后，先进入设置页面。

1. 点击主界面左上角的设置按钮，位置如图 1 所示
2. 进入“路由”标签页
3. 在“本地路由”区域，按图 2 所示开启以下开关：
   - 在主页面显示本地路由开关
   - 路由总开关
   - Claude 路由启用

完成后，Claude 的请求就可以通过 CC Switch 的本地路由转发。

![图 1：点击设置按钮](/images/claude-code/cc-switch-step-1.png)

![图 2：在路由中开启本地路由与 Claude 路由](/images/claude-code/cc-switch-step-2.png)

## 第四步：打开自动故障转移

仍然在“设置 -> 路由”页面，继续配置自动故障转移。

1. 找到“自动故障转移”区域
2. 按图 3 所示，开启“在主页面显示故障转移开关”
3. 再开启 Claude 下方的“自动故障转移”

启用后，CC Switch 会按照你后续配置的优先级顺序依次尝试供应商。当当前分组请求失败时，会自动切到下一个可用分组，减少编码过程中断的概率。

![图 3：开启自动故障转移](/images/claude-code/cc-switch-step-3.png)

## 第五步：到令牌管理页面创建多个分组令牌

访问：

- [令牌管理页面](https://api.1010101.asia/console/token)

然后按图 4 所示，在令牌管理页创建多个你自己需要的 Claude 分组令牌。这里建议不要只保留单一分组，比较常见的做法是：

- 一个高并发分组
- 一个高稳定分组
- 一个备用分组

命名时尽量清晰一些，后面导入到 CC Switch 后更容易识别和排序。

![图 4：创建多个不同分组的 Claude 令牌](/images/claude-code/cc-switch-step-4.png)

## 第六步：在令牌右侧菜单中选择 CC Switch

令牌创建完成后，在对应令牌一行的“聊天”按钮右侧点击下拉箭头。

1. 打开下拉菜单
2. 选择“CC Switch”，如图 5 所示

选择后，页面会弹出“填入 CC Switch”窗口。

![图 5：在聊天右侧下拉菜单中选择 CC Switch](/images/claude-code/cc-switch-step-5.png)

## 第七步：填写 CC Switch 导入参数并打开软件

在“填入 CC Switch”弹窗中，按照图 6 所示完成填写。

建议这样理解这些字段：

- 名称：建议填写当前分组的识别名称，后面在 CC Switch 中更容易区分
- 主模型：填写你希望优先使用的主模型
- Haiku 模型：填写轻量模型
- Sonnet 模型：填写日常编码最常用模型
- Opus 模型：填写高能力模型

确认无误后，点击“打开 CC Switch”。

![图 6：填写 CC Switch 所需参数后点击“打开 CC Switch”](/images/claude-code/cc-switch-step-6.png)

如果浏览器弹出协议唤起窗口，按图 7 所示：

1. 勾选“始终允许”
2. 点击“打开”

这样浏览器就会把当前配置发送给本地 CC Switch。

![图 7：浏览器弹出唤起确认时点击“打开”](/images/claude-code/cc-switch-step-7.png)

## 第八步：在 CC Switch 中确认导入

浏览器唤起成功后，会自动弹出 CC Switch 软件页面。

此时按图 8 所示：

1. 检查供应商名称、官网地址、API 端点、API 密钥和模型映射
2. 确认这些信息无误后，点击“导入”

![图 8：在 CC Switch 中确认并导入供应商配置](/images/claude-code/cc-switch-step-8.png)

导入完成后，会回到供应商列表页面。

## 第九步：点击“加入”，把该分组加入可用队列

在供应商列表中，按图 9 所示点击“加入”。

这一步的作用，是把当前导入的 Claude 供应商正式加入 CC Switch 的可用使用队列中。完成后，这个分组就能参与本地路由和自动故障转移。

![图 9：点击“加入”把该分组加入队列](/images/claude-code/cc-switch-step-9.png)

## 配置完成后的推荐做法

到这里，基础流程就结束了。接下来建议你继续重复“创建令牌 -> 选择 CC Switch -> 导入 -> 点击加入”这套流程，把多个不同分组的 Claude 令牌都加进来。

推荐这样使用：

- 至少加入 2 个不同分组
- 把更稳定或额度更充足的分组放在更高优先级
- 开启自动故障转移，避免某一个分组异常时 Claude Code 直接中断

如果你主要用 Claude Code 长时间编码，这种做法会比单 Key 直连更稳。

## 这套方案的价值

相比只在 Claude Code 里手工填写单个 Key，这套方案更适合下面几类用户：

- 经常长时间连续编码的用户
- 希望减少请求失败中断的人
- 需要多个 Claude 分组轮换使用的人
- 想把路由、切换和故障转移统一放到本地工具里管理的人

核心收益主要有三点：

- 多分组统一管理
- 本地路由统一转发
- 请求失败时自动切换，稳定性更高

## 常见问题与排查

### Claude Code 已安装，但无法正常调用

先执行：

```bash
claude --version
```

如果命令不存在，说明 Claude Code 本体没有装好，先回到第一步检查 Node.js 和安装命令。

### 点击“打开 CC Switch”没有反应

优先排查这些问题：

- CC Switch 是否已经安装
- CC Switch 是否至少启动过一次
- 浏览器协议唤起时是否点了“取消”
- 本机是否拦截了应用唤起

### 已导入成功，但没有自动切换

通常是下面几种原因：

- 没有开启“自动故障转移”
- 只导入了一个分组，实际上没有备用项可切换
- 虽然导入了多个分组，但没有点击“加入”
- 优先级队列还没有按你的预期配置好

### 应该准备几个令牌

没有绝对固定值，但从稳定性出发，建议至少准备 2 到 3 个不同分组的 Claude 令牌。这样在某个分组异常时，故障转移才有实际意义。

## 补充说明

### 直接在 Claude Code 里配置可不可以

可以。Claude Code 支持直接配置 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`。但如果你已经明确需要多分组切换和故障转移，那么直接走 CC Switch 会更符合你的使用场景。

### Base URL 还要不要自己填

如果你是走本文这套“网页导入到 CC Switch”的流程，通常以导入后的配置为准，不需要再手动重复维护多套地址。

### 模型名是否固定

不是。模型名称可能会随着平台更新而变化。文档中的模型只适合作为当前填写示意，实际应以你平台当时提供的可用模型列表为准。
