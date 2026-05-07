# CI/CD 配置说明

## 📋 概述

本项目使用 GitHub Actions 实现自动化部署，每次推送到 `master` 分支时会自动构建并部署到自有服务器。

## 🚀 部署流程

1. **触发条件**
   - 推送到 `master` 分支自动触发
   - 手动触发（可指定版本号）

2. **构建步骤**
   - 检出代码
   - 生成语义化版本号
   - 安装 Node.js 20
   - 安装依赖（npm ci）
   - 构建文档（npm run docs:build）
   - 打包构建产物

3. **部署步骤**
   - 通过单个 SSH 部署步骤上传并发布
   - 备份当前版本到服务器
   - 解压并设置权限
   - 检查 `index.html` 是否存在
   - 创建 Git 标签

## ⚙️ 必需配置

### 1. GitHub Secrets 配置

在 GitHub 仓库的 `Settings` → `Secrets and variables` → `Actions` 中添加以下密钥：

| Secret 名称 | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | 服务器 IP 或域名 | `192.168.1.100` 或 `example.com` |
| `SERVER_USER` | SSH 用户名 | `root` 或 `www-user` |
| `SERVER_SSH_KEY` | SSH 私钥 | 见下方说明 |
| `SERVER_PORT` | SSH 端口（可选） | `22`（默认） |
| `DEPLOY_DIR` | 服务器部署目录 | `/srv/doc-api/current` |
| `BACKUP_DIR` | 服务器备份目录 | `/srv/doc-api/backups` |
| `SITE_URL` | 部署后健康检查 URL（可选） | `https://your-domain.example` |

### 2. SSH 密钥配置

**在本地生成 SSH 密钥对：**

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key
```

这会生成两个文件：
- `github-actions-key`（私钥）→ 添加到 GitHub Secrets 的 `SERVER_SSH_KEY`
- `github-actions-key.pub`（公钥）→ 添加到服务器

**在服务器上配置公钥：**

```bash
# 登录服务器
ssh user@your-server

# 添加公钥到 authorized_keys
echo "ssh-rsa AAAA... github-actions" >> ~/.ssh/authorized_keys

# 设置权限
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

**添加私钥到 GitHub Secrets：**

1. 复制私钥内容：
   ```bash
   cat github-actions-key
   ```

2. 在 GitHub 仓库中：
   - 进入 `Settings` → `Secrets and variables` → `Actions`
   - 点击 `New repository secret`
   - Name: `SERVER_SSH_KEY`
   - Value: 粘贴完整的私钥内容（包括 `-----BEGIN` 和 `-----END` 行）

### 3. 服务器目录配置

**在服务器上创建目录：**

```bash
# 创建部署目录（nginx 根目录）
sudo mkdir -p /srv/doc-api/current

# 创建备份目录
sudo mkdir -p /srv/doc-api/backups

# 设置权限（根据你的 SSH 用户调整）
sudo chown -R $USER:www-data /srv/doc-api
sudo chmod -R 775 /srv/doc-api
```

### 4. Nginx 配置

**创建或修改 Nginx 配置：**

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    root /srv/doc-api/current;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**重载 Nginx：**

```bash
# 测试配置
sudo nginx -t

# 重载配置
sudo nginx -s reload
```

## 📦 版本管理

### 自动版本号

每次自动部署会生成版本号：
```
v1.0.1
```
格式：`vMAJOR.MINOR.PATCH`。workflow 内部写入 `package.json` 时使用无 `v` 的 semver，Git 标签和页脚显示使用带 `v` 的格式。

如果仓库还没有任何版本标签，可以先初始化：

```bash
git tag v1.0.0
git push github v1.0.0
```

如果没有手动初始化，首次成功部署也会从 `v1.0.0` 开始创建标签。

### 手动指定版本

1. 进入 GitHub 仓库
2. 点击 `Actions` 标签
3. 选择 `Deploy Documentation` 工作流
4. 点击 `Run workflow`
5. 输入版本号（如 `v1.0.0`）
6. 点击 `Run workflow`

这会：
- 创建 Git 标签
- 推送标签到仓库
- 部署指定版本

## 🔄 备份与回滚

### 自动备份

每次部署前会自动备份当前版本：
- 备份位置：由 `BACKUP_DIR` GitHub Secret 配置
- 备份命名：`backup-YYYYMMDD-HHMMSS.tar.gz`
- 保留策略：最近 10 个备份

### 手动回滚

**查看可用备份：**

```bash
ls -lt "$BACKUP_DIR/"
```

**回滚到指定备份：**

```bash
# 1. 清空当前版本
find "$DEPLOY_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +

# 2. 解压备份
tar -xzf "$BACKUP_DIR/backup-20240115-143022.tar.gz" -C "$DEPLOY_DIR"

# 3. 设置权限
chmod -R u=rwX,g=rX,o=rX "$DEPLOY_DIR"
```

## 🔐 安全建议

1. **使用专用 SSH 用户**
   ```bash
   # 创建专用用户
   sudo useradd -m -s /bin/bash deploy-user

   # 设置密码（可选）
   sudo passwd deploy-user
   ```

2. **限制 SSH 权限**
   ```bash
   # 编辑 /etc/ssh/sshd_config
   Match User deploy-user
       AllowTcpForwarding no
       X11Forwarding no
   ```

   不建议把部署用户切换为 restricted shell；当前部署流程需要 `scp` 和标准 shell 执行远端发布脚本。应使用专用用户、目录权限、SSH key 和最小 sudo 权限控制风险。

3. **使用防火墙限制访问**
   ```bash
   # 只允许 GitHub Actions IP 访问 SSH（示例）
   sudo ufw allow from 192.30.252.0/22 to any port 22
   sudo ufw enable
   ```

## 📊 监控部署状态

### 查看 GitHub Actions 日志

1. 进入 GitHub 仓库
2. 点击 `Actions` 标签
3. 选择具体的 workflow 运行记录
4. 查看详细日志

### 查看服务器部署日志

```bash
# 查看版本信息
cat "$DEPLOY_DIR/VERSION.txt"

# 查看备份列表
ls -lt "$BACKUP_DIR/"
```

## 🛠️ 故障排查

### 部署失败

1. **检查 SSH 连接**
   ```bash
   # 本地测试 SSH 连接
   ssh -i github-actions-key user@your-server
   ```

2. **检查目录权限**
   ```bash
   ls -la "$DEPLOY_DIR"
   ls -la "$BACKUP_DIR"
   ```

3. **检查磁盘空间**
   ```bash
   df -h
   ```

### Nginx 403 错误

```bash
# 检查 SELinux（如果启用）
getenforce

# 临时关闭
sudo setenforce 0

# 或设置正确的 SELinux 上下文
sudo chcon -R -t httpd_sys_content_t "$DEPLOY_DIR"
```

## 📝 自定义配置

### 修改部署目录

在 GitHub Secrets 中更新 `DEPLOY_DIR` 和 `BACKUP_DIR`，不要把生产路径写入 workflow。

### 修改 Node.js 版本

```yaml
env:
  NODE_VERSION: '18'  # 或 '20', '22'
```

### 修改备份保留数量

在部署脚本的清理备份部分修改：

```bash
ls -t | tail -n +11 | xargs -r rm -f  # 改为 +21 保留 20 个备份
```

## 🎯 最佳实践

1. **使用分支保护**
   - 在 GitHub 设置中保护 `master` 分支
   - 要求 PR 审核后才能合并

2. **测试环境**
   - 创建 `staging` 分支
   - 配置独立的测试服务器

3. **监控告警**
   - 配置 GitHub Actions 通知
   - 使用 webhook 推送到钉钉/企业微信

4. **定期备份验证**
   - 定期测试备份恢复流程
   - 验证备份完整性

## 📞 支持

如有问题，请检查：
1. GitHub Actions 日志
2. 服务器 SSH 连接
3. 目录权限设置
4. Nginx 配置
