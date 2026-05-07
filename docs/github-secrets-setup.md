# GitHub Secrets 配置指南

## 问题：SSH 私钥格式错误

错误信息：`ssh: no key found`

这通常是因为在 GitHub Secrets 中粘贴私钥时格式不正确。

## 解决方法

### 1. 查看完整私钥

在本地执行：
```bash
cat github-actions-key
```

### 2. 正确复制私钥

**重要：** 必须包含完整的私钥，包括：
- `-----BEGIN OPENSSH PRIVATE KEY-----` 开头
- 中间的所有内容（很多行）
- `-----END OPENSSH PRIVATE KEY-----` 结尾

### 3. 在 GitHub Secrets 中添加

1. 访问：https://github.com/konglingyi11/doc-api/settings/secrets/actions
2. 找到 `SERVER_SSH_KEY`
3. 点击 **Update** 或删除后重新添加
4. 粘贴私钥时注意：
   - ✅ 每行都要包含
   - ✅ 不要有多余的空格或换行
   - ✅ 不要有缩进
   - ✅ 完整复制从 BEGIN 到 END 的所有内容

### 4. 正确格式示例

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAgEAsyyc+UMGE+rD9B6YWG7u/7o0uNlEs3OxWJyjvA1h9K7p0fCzDeUc
（中间还有很多行...）
...
-----END OPENSSH PRIVATE KEY-----
```

### 5. 验证其他 Secrets

确保所有 Secrets 都正确配置：

| Secret | 值 | 说明 |
|--------|---|------|
| `SERVER_HOST` | `your-server.example` | 你的服务器域名或 IP |
| `SERVER_USER` | `cicd` | SSH 用户名 |
| `SERVER_SSH_KEY` | （完整私钥） | 必须包含 BEGIN 和 END 行 |
| `SERVER_PORT` | `22` | SSH 端口 |
| `DEPLOY_DIR` | `/srv/doc-api/current` | 服务器部署目录 |
| `BACKUP_DIR` | `/srv/doc-api/backups` | 服务器备份目录 |
| `SITE_URL` | `https://your-domain.example` | 可选，部署后健康检查 URL |

### 6. 测试本地连接

在本地测试 SSH 连接是否正常：
```bash
ssh -i github-actions-key cicd@your-server
```

如果本地能连接成功，说明密钥正确，问题出在 GitHub Secrets 的格式上。

## 常见错误

❌ **错误示例1：缺少开头或结尾**
```
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
...
-----END OPENSSH PRIVATE KEY-----
```
（缺少 BEGIN 行）

❌ **错误示例2：有额外空格或缩进**
```
  -----BEGIN OPENSSH PRIVATE KEY-----
  b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
  ...
```
（每行前面有空格）

✅ **正确格式：**
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
...
-----END OPENSSH PRIVATE KEY-----
```

## 重新部署

更新 Secrets 后，重新运行 workflow：
1. 访问 https://github.com/konglingyi11/doc-api/actions
2. 点击失败的 workflow
3. 点击 **Re-run all jobs**
