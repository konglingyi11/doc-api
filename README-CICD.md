# CI/CD 配置说明

本项目配置了完整的 CI/CD 自动化部署流程，支持双远程仓库（Gitee + GitHub）。

## 📦 远程仓库配置

本项目同时推送到两个远程仓库：

- **Gitee**: `https://gitee.com/kongling11/doc-api.git` (origin)
- **GitHub**: `https://github.com/konglingyi11/doc-api.git` (github)

### 推送方式

```bash
# 推送到单个仓库
git push origin master    # Gitee
git push github master    # GitHub

# 同时推送到两个仓库（推荐）
bash scripts/push-all.sh

# 推送所有内容（分支+标签）
bash scripts/push-all-content.sh
```

## 🚀 CI/CD 流程

### 自动部署

使用 **GitHub Actions** 实现自动化部署：

1. **触发条件**：推送到 `master` 分支
2. **构建环境**：Node.js 20
3. **部署目标**：自有服务器（SSH 方式）
4. **自动备份**：保留最近 10 个版本
5. **版本管理**：自动生成版本号或手动指定

### 手动部署

在 GitHub Actions 页面可以手动触发部署，并指定版本号（如 `v1.0.0`）。

## 📋 配置步骤

### 1. 服务器配置

首次部署需要在服务器上运行配置脚本：

```bash
# 上传配置脚本
scp scripts/setup-server.sh user@your-server:/tmp/

# 运行配置脚本
ssh user@your-server
sudo bash /tmp/setup-server.sh
```

### 2. SSH 密钥配置

```bash
# 生成密钥对
ssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key

# 将公钥添加到服务器
cat github-actions-key.pub | ssh user@your-server 'cat >> ~/.ssh/authorized_keys'
```

### 3. GitHub Secrets 配置

在 GitHub 仓库的 `Settings` → `Secrets and variables` → `Actions` 中添加：

| Secret 名称 | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | 服务器 IP 或域名 | `192.168.1.100` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SERVER_SSH_KEY` | SSH 私钥 | 私钥文件内容 |
| `SERVER_PORT` | SSH 端口 | `22`（可选） |

### 4. 测试部署

```bash
# 提交代码
git add .
git commit -m "feat: add CI/CD configuration"

# 推送到 GitHub（触发自动部署）
git push github master
```

在 GitHub Actions 页面查看部署进度。

## 📚 详细文档

- [完整配置指南](docs/cicd-setup.md) - 详细的配置步骤和说明
- [快速参考](docs/cicd-quickstart.md) - 常用命令和故障排查

## 🔄 版本管理

### 自动版本号

每次自动部署生成版本号：`v20240115-143022-abc1234`

### 手动版本标签

在 GitHub Actions 页面手动触发，输入版本号（如 `v1.0.0`），会自动创建 Git 标签。

## 🛠️ 维护工具

### 回滚脚本

```bash
# 在服务器上运行
bash scripts/rollback.sh
```

交互式选择要回滚的版本。

### 备份管理

- 备份位置：`/var/www/doc-api-backups/`
- 自动保留最近 10 个备份
- 备份命名：`backup-YYYYMMDD-HHMMSS.tar.gz`

## 📊 监控

- GitHub Actions 日志：查看部署详情
- 服务器版本文件：`/var/www/doc-api/VERSION.txt`
- Nginx 日志：`/var/log/nginx/doc-api-*.log`

## 🔐 安全建议

1. 使用专用部署用户（非 root）
2. SSH 密钥妥善保管，不要提交到仓库
3. 定期检查服务器备份
4. 配置防火墙限制访问

## 📞 故障排查

遇到问题请查看：
1. GitHub Actions 构建日志
2. 服务器 SSH 连接状态
3. 目录权限设置
4. Nginx 配置和日志

详细排查步骤请参考 [快速参考文档](docs/cicd-quickstart.md)。
