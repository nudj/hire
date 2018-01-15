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
// TODO: Establish good pattern for this (maybe move to framework?)
process.on('unhandledRejection', error => {
  console.log(error.log, ...(error.log || []))
})
const path = require('path')
const server = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')

const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingPage = require('./pages/loading')
const expressRouters = {
  insecure: [],
  secure: [
    require('./server/routers/auth'),
    require('./server/routers/google-oauth'),
    require('./pages/tasks/router'),
    require('./pages/jobs/router'),
    require('./pages/connections/router'),
    require('./pages/setup-network/linkedin/router'),
    require('./pages/survey/router'),
    require('./pages/survey-section/router'),
    require('./pages/survey-question/router'),
    require('./pages/survey-complete/router'),
    require('./pages/conversations/router'),
    require('./pages/contacts/router'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.join(__dirname, 'server/assets')
const buildAssetPath = path.join(__dirname, 'server/build')
const mockData = require('./mock-data')
const spoofLoggedIn = (req, res, next) => {
  req.session.userId = 'person5'
  next()
}
const errorHandlers = {}
const gqlFragments = require('./lib/graphql')
const { app, getMockApiApps } = server({
  App: reactApp,
  reduxRoutes,
  reduxReducers,
  mockData,
  expressAssetPath,
  buildAssetPath,
  expressRouters,
  spoofLoggedIn,
  errorHandlers,
  gqlFragments,
  LoadingComponent: LoadingPage
})

app.listen(80, () => {
  logger.log('info', 'Application running')
})

if (process.env.USE_MOCKS === 'true') {
  const { jsonServer, gqlServer } = getMockApiApps({ data: mockData })

  jsonServer.listen(81, () => {
    logger.log('info', 'JSONServer running')
  })

  gqlServer.listen(82, () => {
    logger.log('info', 'Mock GQL running')
  })
}
