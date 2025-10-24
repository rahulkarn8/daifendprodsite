FROM node:20-alpine AS build
WORKDIR /app/client

# copy client manifest and the root lockfile
COPY client/package.json /app/client/package.json
COPY package-lock.json /app/package-lock.json

# install using root lockfile if present
WORKDIR /app
RUN if [ -f package-lock.json ]; then npm ci; else cd client && npm install; fi

# copy client source and build
WORKDIR /app/client
COPY client/ ./
RUN npm run build

FROM nginx:stable
COPY --from=build /app/client/dist /usr/share/nginx/html
RUN printf "ok" > /usr/share/nginx/html/healthz.txt
