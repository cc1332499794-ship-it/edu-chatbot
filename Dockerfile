# Стадия сборки
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Стадия production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs /etc/nginx/certs
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]