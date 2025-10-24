# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# add this line to improve binary compatibility on alpine
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build   # vite build + esbuild server bundle

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.js ./server.js

EXPOSE 5000
CMD ["node", "server.js"]
