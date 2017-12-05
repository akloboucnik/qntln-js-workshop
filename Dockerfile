FROM node:8

RUN mkdir -p /usr/src/app /usr/src/appdata

COPY package.json /usr/src/appdata
COPY yarn.lock /usr/src/appdata

WORKDIR /usr/src/appdata

RUN yarn

WORKDIR /usr/src/app
