FROM node:20.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nx build family-planning
FROM node:20.15.0-alpine AS built
COPY --from=builder /app/dist/apps/family-planning ./
COPY --from=builder /app/dist/out-tsc ./dist/out-tsc
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/type-orm.data-source.prod.js ./type-orm.data-source.prod.js
RUN npm install --omit=dev
EXPOSE 3000
