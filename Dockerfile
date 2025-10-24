# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# For native modules compatibility
RUN apk add --no-cache libc6-compat

# Copy dependency manifests first for caching
COPY package*.json ./

# Use lockfile if present; fallback to normal install if missing
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy rest of the code
COPY . .

# Build (Vite + Express)
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Copy only the build output and runtime deps
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.js ./server.js

EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
