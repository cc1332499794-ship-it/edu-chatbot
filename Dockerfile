# 构建前端
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 最终镜像
FROM node:18-alpine
RUN apk add --no-cache nginx

WORKDIR /app

# 复制后端
COPY server/ ./server/
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# 复制前端构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/http.d/default.conf

# 启动脚本：后台运行 Nginx，前台运行 Node（保证日志输出）
RUN echo '#!/bin/sh\n\
nginx -g "daemon off;" &\n\
cd /app/server && exec node index.js' > /start.sh && chmod +x /start.sh

EXPOSE 80 3001

CMD ["/start.sh"]