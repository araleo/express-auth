FROM node:16-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]