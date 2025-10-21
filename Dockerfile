FROM node:20-alpine
WORKDIR /app

COPY . /app/
RUN npm install
ENV NODE_ENV=production
EXPOSE 5003

CMD [ "npm", "start"]
