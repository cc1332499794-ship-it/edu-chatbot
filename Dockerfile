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

# 复制 Nginx 配置到正确位置（Alpine 默认配置目录）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80 3001

# 直接使用 shell 命令启动，不使用外部脚本
CMD sh -c 'nginx -g "daemon off;" & cd /app/server && exec node index.js'