# 构建阶段
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
COPY nginx.conf /etc/nginx/http.d/default.conf

# 创建启动脚本，同时启动 Nginx 和 Node.js
RUN echo '#!/bin/sh\n\
nginx -g "daemon off;" &\n\
cd /app/server && exec node index.js' > /start.sh && chmod +x /start.sh

EXPOSE 80 3001

CMD ["/start.sh"]