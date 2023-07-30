FROM node:16.2.0-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN npm run build
