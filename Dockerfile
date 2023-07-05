FROM node:14.21.3-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 80

CMD ["node", "src/server.js", "production"]