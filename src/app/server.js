require('envkey')
require('babel-register')({
  ignore: function (filename) {
    if (
      filename.match(
        /\/usr\/src\/((?=.*@nudj)(?!.*\/node_modules).*)|\/usr\/src\/app/
      )
    ) {
      return false
    }
    return true
  }
})
const http = require('http')
const path = require('path')
const createNudjApps = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')

const mockData = require('./mocks/data')
const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingPage = require('./pages/loading')

const expressRouters = {
  insecure: [],
  secure: [
    require('./server/routers/auth'),
    require('./server/routers/google-oauth'),
    require('./pages/check-device-wrapper/router'),
    require('./pages/contacts/router'),
    require('./pages/messages/router'),
    require('./pages/favourites/router'),
    require('./pages/setup-linkedin/router'),
    require('./pages/survey-complete/router'),
    require('./pages/survey-question/router'),
    require('./pages/survey/router'),
    require('./pages/notification-sent/router'),
    require('./pages/dashboard/router'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.join(__dirname, 'server/assets')
const buildAssetPath = path.join(__dirname, 'server/build')
const spoofLoggedIn = (req, res, next) => {
  req.session.userId = process.env.SPOOF_USER_ID
  next()
}
const errorHandlers = {}
const gqlFragments = require('./lib/graphql')
const { app, getMockApiApps } = createNudjApps({
  App: reactApp,
  reduxRoutes,
  reduxReducers,
  expressAssetPath,
  buildAssetPath,
  expressRouters,
  spoofLoggedIn,
  errorHandlers,
  gqlFragments,
  LoadingComponent: LoadingPage
})

const server = http.createServer(app)

server.listen(80, () => {
  logger.log('info', 'Application running')
})

if (process.env.USE_MOCKS === 'true') {
  const mockExternalRequests = require('./mocks')
  const { jsonServer: jsonServerApp, gqlServer: gqlServerApp } = getMockApiApps({ data: mockData })

  const jsonServer = http.createServer(jsonServerApp)
  const gqlServer = http.createServer(gqlServerApp)

  jsonServer.listen(81, () => {
    logger.log('info', 'JSONServer running')
  })

  gqlServer.listen(82, () => {
    logger.log('info', 'Mock GQL running')
  })

  mockExternalRequests(() => {
    logger.log('info', 'Mocking external requests')
  })
}
