# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Server (Node.js Realtime & Static Delivery)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY server.js package.json ./
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
