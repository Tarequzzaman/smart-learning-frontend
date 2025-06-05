FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g npm@11.4.1
RUN npm install --legacy-peer-deps && npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# 👇 This line is essential
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
