# Claude Code 配置

这篇文档讲的是一套更稳的 Claude Code 配置方式：先安装 Claude Code，再接入 CC Switch，用多个不同分组的 Claude 令牌做本地路由和故障转移。

## 开始前你需要准备什么

- 一台可正常联网的电脑
- 已安装 Node.js 18 或更高版本
- 可访问 [CC Switch v3.14.1 官方发布页](https://github.com/farion1231/cc-switch/releases/tag/v3.14.1)
- 可访问 [令牌管理页面](https://api.1010101.asia/console/token)
- 已有可用账号，并能创建多个不同分组的 Claude 令牌

如果你希望配置完之后更稳定，建议至少准备 2 到 3 个不同分组的 Claude 令牌。

## 先安装 Claude Code 本体

CC Switch 负责做本地路由和故障转移，但 Claude Code 仍然要先安装。没有 Claude Code，后面的接入流程无法完成。

## Claude Code 接哪种接口

Claude Code 主要对接 **Anthropic Messages** 格式。

如果你是手动配置自定义 Base URL，通常填写根地址，不带 `/v1`：

```text
https://api.1010101.asia
```

不过这篇文档的主流程不是在 Claude Code 里手填 Key，而是通过 CC Switch 管理多个 Claude 令牌。

## 第一步：先安装 Claude Code

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

访问 [CC Switch v3.14.1 官方下载页](https://github.com/farion1231/cc-switch/releases/tag/v3.14.1)。

根据你的系统下载对应安装包：

- Windows：`CC-Switch-v3.14.1-Windows.msi`
- macOS：`CC-Switch-v3.14.1-macOS.dmg`
- Linux：建议根据发行版选择 `AppImage`、`.deb` 或 `.rpm`

安装完成后先启动一次，确认软件能正常打开。

## 第三步：打开本地路由

启动 CC Switch 后进入设置页面。

1. 点击主界面左上角的设置按钮，位置如图 1 所示
2. 进入“路由”标签页
3. 在“本地路由”区域，按图 2 所示开启以下开关：
   - 在主页面显示本地路由开关
   - 路由总开关
   - Claude 路由启用

开完以后，Claude 请求就会走 CC Switch 的本地路由。

![图 1：点击设置按钮](/images/claude-code/cc-switch-step-1.png)
*图 1：CC Switch 主界面左上角的设置按钮*

![图 2：在路由中开启本地路由与 Claude 路由](/images/claude-code/cc-switch-step-2.png)
*图 2：在“设置 -> 路由 -> 本地路由”中开启本地路由和 Claude 路由*

## 第四步：打开自动故障转移

还在“设置 -> 路由”页面，继续把自动故障转移打开。

1. 找到“自动故障转移”区域
2. 按图 3 所示，开启“在主页面显示故障转移开关”
3. 再开启 Claude 下方的“自动故障转移”

开启后，如果当前分组请求失败，CC Switch 会按队列顺序自动切到下一个可用分组。

![图 3：开启自动故障转移](/images/claude-code/cc-switch-step-3.png)
*图 3：在“设置 -> 路由 -> 自动故障转移”中开启相关开关*

## 第五步：到令牌管理页面创建多个分组令牌

访问 [令牌管理页面](https://api.1010101.asia/console/token)。

然后按图 4 所示，创建多个你要用的 Claude 分组令牌。比较常见的做法是：

- 一个高并发分组
- 一个高稳定分组
- 一个备用分组

名字尽量起得直观点，后面导入 CC Switch 之后更容易分辨。

![图 4：创建多个不同分组的 Claude 令牌](/images/claude-code/cc-switch-step-4.png)
*图 4：在令牌管理页面创建多个不同分组的 Claude 令牌*

## 第六步：在令牌右侧菜单中选择 CC Switch

令牌创建完成后，在对应令牌一行的“聊天”按钮右侧点击下拉箭头。

1. 打开下拉菜单
2. 选择“CC Switch”，如图 5 所示

选完后，页面会弹出“填入 CC Switch”窗口。

![图 5：在聊天右侧下拉菜单中选择 CC Switch](/images/claude-code/cc-switch-step-5.png)
*图 5：在“聊天”右侧下拉菜单中选择 CC Switch*

## 第七步：填写 CC Switch 导入参数并打开软件

在“填入 CC Switch”弹窗中，按照图 6 所示完成填写。

几个字段按页面提示填写即可。名称建议直接用分组名或你自己容易识别的名字，后面排队列时更省事。

确认无误后，点击“打开 CC Switch”。

![图 6：填写 CC Switch 所需参数后点击“打开 CC Switch”](/images/claude-code/cc-switch-step-6.png)
*图 6：填写 CC Switch 导入参数后点击“打开 CC Switch”*

如果浏览器弹出协议唤起窗口，按图 7 所示：

1. 勾选“始终允许”
2. 点击“打开”

这样浏览器就会把当前配置交给本地 CC Switch。

![图 7：浏览器弹出唤起确认时点击“打开”](/images/claude-code/cc-switch-step-7.png)
*图 7：浏览器弹出协议唤起确认框后勾选允许并点击“打开”*

## 第八步：在 CC Switch 中确认导入

浏览器唤起成功后，会自动弹出 CC Switch 软件页面。

此时按图 8 所示：

1. 检查供应商名称、官网地址、API 端点、API 密钥和模型映射
2. 确认这些信息无误后，点击“导入”

![图 8：在 CC Switch 中确认并导入供应商配置](/images/claude-code/cc-switch-step-8.png)
*图 8：在 CC Switch 中确认供应商配置并点击“导入”*

导入完成后，会回到供应商列表页面。

## 第九步：点击“加入”，把该分组加入可用队列

在供应商列表中，按图 9 所示点击“加入”。

这一步做完，这个分组才会真正加入可用队列，后面才能参与本地路由和自动故障转移。

![图 9：点击“加入”把该分组加入队列](/images/claude-code/cc-switch-step-9.png)
*图 9：点击“加入”把当前分组加入可用队列*

## 配置完成后的推荐做法

到这里，基础流程就完成了。接下来继续重复“创建令牌 -> 选择 CC Switch -> 导入 -> 点击加入”这套流程，把其他分组也加进去。

推荐这样使用：

- 至少加入 2 个不同分组
- 把更稳定或额度更充足的分组放前面
- 开启自动故障转移，避免某一个分组异常时 Claude Code 直接中断

如果你平时会长时间挂着 Claude Code 写代码，这种方式通常比单 Key 直连更省心。

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

通常先查这几项：

- 没有开启“自动故障转移”
- 只导入了一个分组，实际上没有备用项可切换
- 虽然导入了多个分组，但没有点击“加入”
- 优先级队列还没有按你的预期配置好

### 应该准备几个令牌

建议至少准备 2 到 3 个不同分组的 Claude 令牌，不然故障转移基本没有意义。

## 补充说明

### 直接在 Claude Code 里配置可不可以

可以。Claude Code 支持直接配置 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`。如果你只用一个 Key，这样配就够了；如果你要多分组切换和故障转移，还是更适合走 CC Switch。

### Base URL 还要不要自己填

如果你是走本文这套“网页导入到 CC Switch”的流程，通常以导入后的配置为准，不需要再手动重复维护多套地址。

### 模型名是否固定

不是。模型名称可能会变，填写时以你当时页面里能选到的模型为准。
