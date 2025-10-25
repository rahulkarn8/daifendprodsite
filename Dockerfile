# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package*.json ./
# Use ci if lockfile exists; otherwise install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
# Build only the SPA; your server.js serves dist/public
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app

# TLS to Neon & healthcheck tools
RUN apk add --no-cache ca-certificates curl

ENV NODE_ENV=production
ENV PORT=5000

# App runtime files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.js ./server.js

EXPOSE 5000
CMD ["node", "server.js"]
