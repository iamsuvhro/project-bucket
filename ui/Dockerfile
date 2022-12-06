FROM node:18.6.0

WORKDIR /ui

COPY ./package.json .
COPY . .

RUN yarn install
RUN yarn build
RUN yarn start