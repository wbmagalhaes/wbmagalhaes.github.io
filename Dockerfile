FROM node:lts

WORKDIR /app

COPY . .
RUN npm i

EXPOSE 4321

CMD [ "npm", "run", "dev" ]
