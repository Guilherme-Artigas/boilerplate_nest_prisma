FROM node:20

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

USER node

EXPOSE 3333

CMD ["npm", "run", "start:prod"]