FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run build:prod
WORKDIR /usr/app/dist
EXPOSE 8080
CMD ["node", "server.js"]