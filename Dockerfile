# 构建前端
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
RUN apk add --no-cache nginx

WORKDIR /app

# 复制后端代码和依赖
COPY server/ ./server/
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# 复制前端构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口（Nginx 80，Node 使用 Render 自动分配的 PORT）
EXPOSE 80

# 启动命令：后台运行 Nginx，前台运行 Node（使用 Render 提供的 PORT 环境变量）
CMD sh -c "nginx -g 'daemon off;' & cd /app/server && exec node index.js"