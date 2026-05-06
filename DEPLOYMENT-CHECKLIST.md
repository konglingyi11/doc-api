# 🚀 CI/CD 部署清单

按照以下步骤完成 CI/CD 配置。

## ✅ 第一步：服务器准备

### 1.1 连接服务器

```bash
ssh user@your-server-ip
```

### 1.2 运行配置脚本

```bash
# 创建临时目录
mkdir -p /tmp/cicd-setup

# 创建配置脚本（复制 scripts/setup-server.sh 的内容）
# 或者从本地上传：
# scp scripts/setup-server.sh user@your-server:/tmp/cicd-setup/
```

### 1.3 执行配置

```bash
sudo bash /tmp/cicd-setup/setup-server.sh
```

按提示输入：
- 域名或 IP 地址
- 是否创建专用部署用户

完成后记录：
- ✅ 部署目录：`/var/www/doc-api`
- ✅ 备份目录：`/var/www/doc-api-backups`
- ✅ Nginx 配置完成

---

## ✅ 第二步：SSH 密钥配置

### 2.1 本地生成密钥对

```bash
# 在项目根目录执行
ssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key

# 查看公钥（稍后需要）
cat github-actions-key.pub

# 查看私钥（稍后需要）
cat github-actions-key
```

### 2.2 添加公钥到服务器

**方式1：使用 ssh-copy-id（推荐）**

```bash
ssh-copy-id -i github-actions-key.pub user@your-server-ip
```

**方式2：手动添加**

```bash
# 登录服务器
ssh user@your-server-ip

# 添加公钥
echo "你的公钥内容" >> ~/.ssh/authorized_keys

# 设置权限
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 2.3 测试连接

```bash
ssh -i github-actions-key user@your-server-ip
```

成功连接后退出：`exit`

---

## ✅ 第三步：GitHub Secrets 配置

### 3.1 进入 GitHub 仓库设置

1. 打开 https://github.com/konglingyi11/doc-api
2. 点击 `Settings` 标签
3. 左侧菜单选择 `Secrets and variables` → `Actions`

### 3.2 添加以下 Secrets

点击 `New repository secret`，逐个添加：

#### Secret 1: SERVER_HOST

- **Name**: `SERVER_HOST`
- **Value**: 你的服务器 IP 或域名
- **示例**: `192.168.1.100` 或 `example.com`

#### Secret 2: SERVER_USER

- **Name**: `SERVER_USER`
- **Value**: SSH 用户名
- **示例**: `root` 或 `deploy`

#### Secret 3: SERVER_SSH_KEY

- **Name**: `SERVER_SSH_KEY`
- **Value**: 私钥完整内容（包括 BEGIN 和 END 行）

**示例格式**：
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
（很多行）
...
-----END RSA PRIVATE KEY-----
```

#### Secret 4: SERVER_PORT（可选）

- **Name**: `SERVER_PORT`
- **Value**: SSH 端口
- **示例**: `22`（默认）

### 3.3 验证 Secrets

确认已添加 4 个 Secrets：
- ✅ SERVER_HOST
- ✅ SERVER_USER
- ✅ SERVER_SSH_KEY
- ✅ SERVER_PORT（可选）

---

## ✅ 第四步：推送代码触发部署

### 4.1 提交 CI/CD 配置

```bash
# 查看修改
git status

# 添加所有文件
git add .

# 提交
git commit -m "feat: add CI/CD configuration"
```

### 4.2 推送到 GitHub

```bash
# 推送到 GitHub（触发自动部署）
git push github master

# 或使用脚本同时推送到 Gitee 和 GitHub
bash scripts/push-all.sh
```

### 4.3 查看部署进度

1. 打开 https://github.com/konglingyi11/doc-api/actions
2. 查看最新的 workflow 运行
3. 点击进入查看详细日志

---

## ✅ 第五步：验证部署

### 5.1 检查部署状态

在 GitHub Actions 页面确认：
- ✅ 所有步骤显示绿色对勾
- ✅ 部署摘要显示版本号

### 5.2 服务器验证

```bash
# SSH 连接服务器
ssh user@your-server-ip

# 查看版本文件
cat /var/www/doc-api/VERSION.txt

# 查看文件列表
ls -la /var/www/doc-api/

# 查看备份
ls -lt /var/www/doc-api-backups/
```

### 5.3 访问测试

浏览器访问：`http://your-server-ip` 或 `http://your-domain.com`

确认文档站点正常显示。

---

## 🎉 完成！

恭喜！CI/CD 配置完成。后续每次推送代码到 master 分支都会自动部署。

## 📋 日常使用

### 自动部署

```bash
# 修改代码后推送
git add .
git commit -m "update: 修改内容"
git push github master
```

### 手动部署指定版本

1. 进入 GitHub Actions 页面
2. 选择 `Deploy Documentation` workflow
3. 点击 `Run workflow`
4. 输入版本号（如 `v1.0.0`）
5. 点击 `Run workflow`

### 回滚版本

```bash
# 在服务器上执行
bash /path/to/rollback.sh
```

---

## 🔍 故障排查

### 部署失败

1. **查看 GitHub Actions 日志**
   - 找到失败的步骤
   - 查看错误信息

2. **检查 SSH 连接**
   ```bash
   ssh -i github-actions-key user@your-server-ip
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

3. **查看错误日志**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

---

## 📞 获取帮助

- 详细配置：`docs/cicd-setup.md`
- 快速参考：`docs/cicd-quickstart.md`
- 双仓库说明：`README-CICD.md`