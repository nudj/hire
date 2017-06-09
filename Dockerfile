FROM node:6.10.0-alpine
ARG NPM_TOKEN
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY src /usr/src
RUN apk add --no-cache --virtual .gyp python make g++ \
  && npm i -g torus-cli \
  && apk del .gyp
RUN npm i \
  && ./node_modules/.bin/webpack --config ./webpack.dll.js --bail --hide-modules \
  && ./node_modules/.bin/webpack --config ./webpack.config.js --bail --hide-modules \
  && npm prune --production
EXPOSE 80
CMD torus run -o nudj -p hire -e local -- node .
