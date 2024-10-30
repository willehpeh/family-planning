FROM node:20.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nx build family-planning
FROM node:20.15.0-alpine AS built
COPY --from=builder /app/dist/apps/family-planning ./
RUN npm install --omit=dev
EXPOSE 3000
ENTRYPOINT ["node", "main.js"]
