#!/bin/bash

# 部署回滚脚本
# 用于快速回滚到之前的版本

set -e

DEPLOY_DIR="${DEPLOY_DIR:-/var/www/doc-api}"
BACKUP_DIR="${BACKUP_DIR:-/var/www/doc-api-backups}"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 部署回滚工具${NC}"
echo "================================"

# 检查备份目录
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${RED}❌ 备份目录不存在: $BACKUP_DIR${NC}"
    exit 1
fi

# 列出可用备份
echo ""
echo "📦 可用的备份版本："
echo ""
ls -lth "$BACKUP_DIR" | head -n 10
echo ""

# 选择备份
read -p "请输入要回滚的备份文件名（或输入 'q' 退出）: " BACKUP_FILE

if [ "$BACKUP_FILE" = "q" ]; then
    echo "已取消回滚"
    exit 0
fi

BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILE"

# 验证文件
if [ ! -f "$BACKUP_PATH" ]; then
    echo -e "${RED}❌ 备份文件不存在: $BACKUP_PATH${NC}"
    exit 1
fi

# 确认回滚
echo ""
echo -e "${YELLOW}⚠️  即将回滚到: $BACKUP_FILE${NC}"
echo -e "${YELLOW}⚠️  当前版本将被备份${NC}"
echo ""
read -p "确认回滚？(y/N): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "已取消回滚"
    exit 0
fi

# 创建当前版本的备份
CURRENT_BACKUP="backup-$(date +'%Y%m%d-%H%M%S')-pre-rollback.tar.gz"
echo ""
echo "📦 备份当前版本..."
if [ "$(ls -A $DEPLOY_DIR 2>/dev/null)" ]; then
    tar -czf "$BACKUP_DIR/$CURRENT_BACKUP" -C "$DEPLOY_DIR" .
    echo -e "${GREEN}✅ 当前版本已备份: $CURRENT_BACKUP${NC}"
else
    echo -e "${YELLOW}⚠️  部署目录为空，跳过备份${NC}"
fi

# 清空部署目录
echo ""
echo "🗑️  清空部署目录..."
rm -rf "$DEPLOY_DIR"/*

# 解压备份
echo ""
echo "📦 解压备份文件..."
tar -xzf "$BACKUP_PATH" -C "$DEPLOY_DIR"

# 设置权限
echo ""
echo "🔐 设置权限..."
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"

# 完成
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ 回滚完成！${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "📋 回滚详情："
echo "  - 回滚到: $BACKUP_FILE"
echo "  - 当前备份: $CURRENT_BACKUP"
echo "  - 部署目录: $DEPLOY_DIR"
echo ""
echo "🌐 请访问站点验证回滚结果"
echo ""