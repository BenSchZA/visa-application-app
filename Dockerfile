FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN yarn install

RUN yarn run build

EXPOSE 3000
CMD [ "npm", "start" ]
