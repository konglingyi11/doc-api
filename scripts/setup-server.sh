#!/bin/bash

# CI/CD 快速配置脚本
# 用于在服务器上快速设置部署环境

set -e

echo "🚀 开始配置 CI/CD 部署环境..."

# 配置变量
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/doc-api}"
BACKUP_DIR="${BACKUP_DIR:-/var/www/doc-api-backups}"
NGINX_CONF="/etc/nginx/sites-available/doc-api"

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 root 用户或 sudo 运行此脚本"
    exit 1
fi

# 1. 创建目录
echo "📁 创建部署目录..."
mkdir -p "$DEPLOY_DIR"
mkdir -p "$BACKUP_DIR"

# 2. 设置权限
echo "🔐 设置目录权限..."
chown -R www-data:www-data "$DEPLOY_DIR"
chown -R www-data:www-data "$BACKUP_DIR"
chmod -R 755 "$DEPLOY_DIR"
chmod -R 755 "$BACKUP_DIR"

# 3. 创建 Nginx 配置
echo "⚙️  创建 Nginx 配置..."
read -p "请输入域名或 IP（如 example.com 或 192.168.1.100）: " SERVER_NAME

cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    root $DEPLOY_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 访问日志
    access_log /var/log/nginx/doc-api-access.log;
    error_log /var/log/nginx/doc-api-error.log;
}
EOF

# 4. 启用站点配置
echo "🔗 启用站点配置..."
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/doc-api

# 5. 测试 Nginx 配置
echo "🧪 测试 Nginx 配置..."
if nginx -t; then
    echo "✅ Nginx 配置正确"
else
    echo "❌ Nginx 配置错误，请检查"
    exit 1
fi

# 6. 重载 Nginx
echo "🔄 重载 Nginx..."
systemctl reload nginx

# 7. 配置防火墙（如果使用 ufw）
if command -v ufw &> /dev/null; then
    echo "🔥 配置防火墙..."
    ufw allow 'Nginx Full'
    echo "✅ 防火墙已配置"
fi

# 8. 创建部署用户（可选）
read -p "是否创建专用部署用户？(y/N): " CREATE_USER
if [ "$CREATE_USER" = "y" ] || [ "$CREATE_USER" = "Y" ]; then
    read -p "请输入用户名（默认：deploy）: " DEPLOY_USER
    DEPLOY_USER="${DEPLOY_USER:-deploy}"

    if id "$DEPLOY_USER" &>/dev/null; then
        echo "⚠️  用户 $DEPLOY_USER 已存在"
    else
        useradd -m -s /bin/bash "$DEPLOY_USER"
        echo "✅ 用户 $DEPLOY_USER 已创建"

        # 添加到 www-data 组
        usermod -aG www-data "$DEPLOY_USER"

        # 设置目录权限
        chown -R "$DEPLOY_USER:www-data" "$DEPLOY_DIR"
        chown -R "$DEPLOY_USER:www-data" "$BACKUP_DIR"

        echo "📝 请为用户 $DEPLOY_USER 设置密码："
        passwd "$DEPLOY_USER"
    fi
fi

# 9. 显示配置摘要
echo ""
echo "======================================"
echo "✅ CI/CD 环境配置完成！"
echo "======================================"
echo ""
echo "📋 配置摘要："
echo "  - 部署目录: $DEPLOY_DIR"
echo "  - 备份目录: $BACKUP_DIR"
echo "  - 站点地址: http://$SERVER_NAME"
echo "  - Nginx 配置: $NGINX_CONF"
echo ""
echo "📝 接下来的步骤："
echo ""
echo "1. 在本地生成 SSH 密钥对："
echo "   ssh-keygen -t rsa -b 4096 -C 'github-actions' -f github-actions-key"
echo ""
echo "2. 将公钥添加到服务器："
echo "   cat github-actions-key.pub | ssh $USER@$(hostname -I | awk '{print $1}') 'cat >> ~/.ssh/authorized_keys'"
echo ""
echo "3. 将私钥内容添加到 GitHub Secrets (SERVER_SSH_KEY)"
echo ""
echo "4. 在 GitHub 添加以下 Secrets："
echo "   - SERVER_HOST: $(hostname -I | awk '{print $1}')"
echo "   - SERVER_USER: $USER"
echo "   - SERVER_SSH_KEY: [私钥内容]"
echo "   - SERVER_PORT: 22"
echo ""
echo "5. 推送代码到 master 分支触发自动部署"
echo ""
echo "🎉 配置完成！"