FROM node:8-alpine
ARG NPM_TOKEN
ARG NODE_ENV
ARG DEBUG
RUN mkdir -p /usr/src && apk add --no-cache ca-certificates
WORKDIR /usr/src
COPY src /usr/src
RUN npm --production=false i \
  && ./node_modules/.bin/webpack --config ./webpack.dll.js --bail --hide-modules \
  && ./node_modules/.bin/webpack --config ./webpack.config.js --bail --hide-modules \
  && npm prune --production
EXPOSE 80
CMD ["node", "."]
