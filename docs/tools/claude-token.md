# 创建 Claude 分组令牌

本文介绍如何在令牌管理页面创建多个 Claude 分组令牌，供 Claude Code 和 CC Switch 使用。

## 什么时候需要多个令牌

如果只是临时使用 Claude Code，一个可用令牌通常就够了。

如果希望 CC Switch 的自动故障转移更有用，建议准备 2 到 3 个不同分组的 Claude 令牌。

常见做法：

- 一个高并发分组
- 一个高稳定分组
- 一个备用分组

## 准备工作

请先确认：

- 已有可用账号。
- 可访问 [令牌管理页面](https://api.1010101.asia/console/token)。
- 账号中有可用于 Claude 的分组。

## 创建步骤

访问 [令牌管理页面](https://api.1010101.asia/console/token)。

按图 1 所示，创建多个 Claude 分组令牌。

![图 1：创建多个不同分组的 Claude 令牌](/images/claude-code/cc-switch-step-4.png)
*图 1：在令牌管理页面创建多个不同分组的 Claude 令牌*

创建时建议注意：

- 每个令牌选择不同的 Claude 分组。
- 名称尽量写清楚，例如 `claude-high-concurrency`、`claude-stable`、`claude-backup`。
- 后续导入 CC Switch 时，名称越清晰越容易分辨。

## 推荐数量

建议至少准备 2 到 3 个不同分组的 Claude 令牌。

如果只有一个令牌，CC Switch 仍然可以做本地路由，但故障转移基本没有意义。

如果令牌太多，队列维护成本会变高。一般不需要超过 3 个。

## 下一步

令牌创建完成后，继续阅读 [CC Switch 配置教程](/tools/cc-switch)，把令牌导入 CC Switch 并加入可用队列。

## 常见问题

### 创建令牌后要复制 Key 吗

如果走 CC Switch 的网页导入流程，通常不需要手动复制 Key。

你可以在令牌行的“聊天”按钮右侧下拉菜单中选择“CC Switch”，再按 [CC Switch 配置教程](/tools/cc-switch) 导入。

### 令牌名称应该怎么写

建议名称同时体现用途和分组特点。

例如：

- `claude-main`
- `claude-stable`
- `claude-backup`

不要只写 `key1`、`key2`。导入 CC Switch 后，这类名称不方便判断优先级。

### 可以只创建一个令牌吗

可以。

但只有一个令牌时，自动故障转移没有备用分组可切换。长时间使用 Claude Code 写代码时，更建议准备多个分组。
