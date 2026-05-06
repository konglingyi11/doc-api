#!/bin/bash

# 同时推送到 Gitee 和 GitHub

set -e

echo "🚀 推送代码到远程仓库..."

# 获取当前分支
CURRENT_BRANCH=$(git branch --show-current)

if [ -z "$CURRENT_BRANCH" ]; then
    echo "❌ 无法获取当前分支"
    exit 1
fi

echo "📍 当前分支: $CURRENT_BRANCH"
echo ""

# 推送到 Gitee
echo "📤 推送到 Gitee (origin)..."
git push origin "$CURRENT_BRANCH"
echo "✅ Gitee 推送完成"
echo ""

# 推送到 GitHub
echo "📤 推送到 GitHub (github)..."
git push github "$CURRENT_BRANCH"
echo "✅ GitHub 推送完成"
echo ""

echo "🎉 所有仓库推送完成！"