FROM node:20.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nx build family-planning-web
FROM nginx:latest AS server
COPY --from=builder /app/dist/apps/family-planning-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
