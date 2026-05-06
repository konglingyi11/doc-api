# CI/CD 快速参考

## 🚀 快速开始

### 1️⃣ 服务器配置（首次部署）

```bash
# 1. 上传配置脚本到服务器
scp scripts/setup-server.sh user@your-server:/tmp/

# 2. 运行配置脚本
ssh user@your-server
sudo bash /tmp/setup-server.sh
```

### 2️⃣ GitHub Secrets 配置

在 GitHub 仓库 `Settings` → `Secrets and variables` → `Actions` 中添加：

| Secret | 值 |
|--------|---|
| `SERVER_HOST` | 服务器 IP 或域名 |
| `SERVER_USER` | SSH 用户名 |
| `SERVER_SSH_KEY` | SSH 私钥内容 |
| `SERVER_PORT` | SSH 端口（默认 22） |

### 3️⃣ 触发部署

```bash
# 自动触发：推送到 master 分支
git push origin master

# 手动触发：在 GitHub Actions 页面点击 "Run workflow"
```

## 📋 常用命令

### 推送代码

```bash
# 方式1：同时推送到 Gitee 和 GitHub（推荐）
bash scripts/push-all.sh

# 方式2：分别推送
git push origin master      # 推送到 Gitee
git push github master      # 推送到 GitHub

# 方式3：推送所有内容（包括所有分支和标签）
bash scripts/push-all-content.sh
```

### 本地操作

```bash
# 生成 SSH 密钥对
ssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key

# 查看公钥
cat github-actions-key.pub

# 查看私钥
cat github-actions-key

# 测试 SSH 连接
ssh -i github-actions-key user@your-server
```

### 服务器操作

```bash
# 查看部署版本
cat /var/www/doc-api/VERSION.txt

# 查看备份列表
ls -lt /var/www/doc-api-backups/

# 手动回滚
bash scripts/rollback.sh

# 查看 Nginx 日志
tail -f /var/log/nginx/doc-api-access.log
tail -f /var/log/nginx/doc-api-error.log

# 重载 Nginx
sudo nginx -s reload
```

## 🔄 版本管理

### 自动版本

每次推送到 master 自动生成版本号：
```
v20240115-143022-abc1234
```

### 手动版本标签

```bash
# 在 GitHub Actions 页面手动触发
# 输入版本号如：v1.0.0
# 会自动创建 Git 标签并推送
```

## 🛠️ 故障排查

### 部署失败

1. **检查 GitHub Actions 日志**
   - 查看具体错误信息

2. **测试 SSH 连接**
   ```bash
   ssh -i github-actions-key user@your-server
   ```

3. **检查服务器权限**
   ```bash
   ls -la /var/www/doc-api
   ls -la /var/www/doc-api-backups
   ```

### 站点无法访问

1. **检查 Nginx 状态**
   ```bash
   sudo systemctl status nginx
   ```

2. **检查 Nginx 配置**
   ```bash
   sudo nginx -t
   ```

3. **检查防火墙**
   ```bash
   sudo ufw status
   ```

4. **查看错误日志**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

## 📊 监控与日志

### GitHub Actions

- 每次部署都有详细日志
- 包含版本号、提交信息
- 显示部署摘要

### 服务器日志

```bash
# Nginx 访问日志
/var/log/nginx/doc-api-access.log

# Nginx 错误日志
/var/log/nginx/doc-api-error.log

# 版本信息
/var/www/doc-api/VERSION.txt
```

## 🔐 安全检查清单

- [ ] 使用专用部署用户（非 root）
- [ ] SSH 密钥已加密存储在 GitHub Secrets
- [ ] 服务器防火墙已配置
- [ ] Nginx 配置已优化（gzip、缓存）
- [ ] 定期检查备份完整性
- [ ] 定期更新服务器软件

## 📞 获取帮助

详细配置请查看：`docs/cicd-setup.md`