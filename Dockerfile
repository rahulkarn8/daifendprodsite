# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
# build only the SPA; server.js will serve it
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app

# ✅ add CA bundle so TLS to Neon works
RUN apk add --no-cache ca-certificates

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.js ./server.js

EXPOSE 5000
CMD ["node", "server.js"]
