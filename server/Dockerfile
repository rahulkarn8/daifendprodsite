FROM node:20-alpine
WORKDIR /app/server

# copy server manifest and the root lockfile
COPY server/package.json /app/server/package.json
COPY package-lock.json /app/package-lock.json

# install using the root lockfile if present
WORKDIR /app
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else cd server && npm install --omit=dev; fi

# copy server source
WORKDIR /app/server
COPY server/ ./

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000
CMD ["npm","start"]
