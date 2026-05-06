FROM nginx:alpine

# 复制构建好的静态文件到 nginx 目录
COPY docs/.vitepress/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
