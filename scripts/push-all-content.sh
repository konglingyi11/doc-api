#!/bin/bash

# 同时推送所有分支和标签到两个仓库

set -e

echo "🚀 推送所有内容到远程仓库..."

# 推送所有分支
echo "📤 推送所有分支..."
git push origin --all
git push github --all

# 推送所有标签
echo "📤 推送所有标签..."
git push origin --tags
git push github --tags

echo "🎉 所有内容推送完成！"