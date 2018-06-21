FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install

#ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
