#!/bin/bash

# 在服务器上创建 cicd 用户并配置权限

set -e

echo "🚀 开始创建 cicd 用户..."

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 root 用户或 sudo 运行此脚本"
    exit 1
fi

# 创建 cicd 用户
if id "cicd" &>/dev/null; then
    echo "⚠️  用户 cicd 已存在"
else
    useradd -m -s /bin/bash cicd
    echo "✅ 用户 cicd 已创建"
fi

# 设置密码（可选）
echo ""
read -p "是否为 cicd 用户设置密码？(y/N): " SET_PASSWORD
if [ "$SET_PASSWORD" = "y" ] || [ "$SET_PASSWORD" = "Y" ]; then
    passwd cicd
fi

# 添加到 www-data 组（用于访问网站文件）
usermod -aG www-data cicd

# 创建 SSH 目录
mkdir -p /home/cicd/.ssh
chmod 700 /home/cicd/.ssh

# 创建 authorized_keys 文件
touch /home/cicd/.ssh/authorized_keys
chmod 600 /home/cicd/.ssh/authorized_keys

# 设置所有者
chown -R cicd:cicd /home/cicd/.ssh

echo ""
echo "======================================"
echo "✅ cicd 用户创建完成！"
echo "======================================"
echo ""
echo "📋 接下来的步骤："
echo ""
echo "1. 将公钥添加到 cicd 用户的 authorized_keys："
echo "   编辑文件: /home/cicd/.ssh/authorized_keys"
echo "   粘贴公钥内容"
echo ""
echo "2. 设置部署目录权限："
echo "   chown -R cicd:www-data /var/www/doc-api"
echo "   chown -R cicd:www-data /var/www/doc-api-backups"
echo "   chmod -R 775 /var/www/doc-api"
echo "   chmod -R 775 /var/www/doc-api-backups"
echo ""
echo "3. 在 GitHub Secrets 中使用："
echo "   SERVER_USER: cicd"
echo "   SERVER_HOST: 1010101.asia"
echo ""