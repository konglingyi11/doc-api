#!/bin/bash

# 在服务器上创建 cicd 用户并配置权限

set -e

echo "🚀 开始创建 cicd 用户..."

DEPLOY_DIR="${DEPLOY_DIR:-/srv/doc-api/current}"
BACKUP_DIR="${BACKUP_DIR:-/srv/doc-api/backups}"

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

# 创建部署目录并限制权限
mkdir -p "$DEPLOY_DIR" "$BACKUP_DIR"
chown -R cicd:www-data "$DEPLOY_DIR" "$BACKUP_DIR"
chmod -R 775 "$DEPLOY_DIR" "$BACKUP_DIR"

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
echo "2. 部署目录权限已设置："
echo "   DEPLOY_DIR=$DEPLOY_DIR"
echo "   BACKUP_DIR=$BACKUP_DIR"
echo ""
echo "3. 在 GitHub Secrets 中使用："
echo "   SERVER_USER: cicd"
echo "   SERVER_HOST: [你的服务器域名或 IP]"
echo "   DEPLOY_DIR: $DEPLOY_DIR"
echo "   BACKUP_DIR: $BACKUP_DIR"
echo ""
echo "4. 不建议将 cicd 切换为 restricted shell；scp/ssh 部署需要标准 shell。"
echo "   请通过专用用户、目录权限、SSH key 和最小 sudo 权限控制风险。"
echo ""
