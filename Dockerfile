FROM node:6.10.0-alpine
ARG NPM_TOKEN
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY src /usr/src
RUN npm i && ./node_modules/.bin/webpack --config ./webpack.client.js --bail --hide-modules && ./node_modules/.bin/webpack --config ./webpack.server.js --bail --hide-modules && npm prune --production
EXPOSE 80
CMD node .
