FROM node:16 As development

WORKDIR /usr/src/nest-app-gateway

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/nest-app-gateway

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/nest-app-gateway/dist ./dist

CMD ["node", "dist/main"]