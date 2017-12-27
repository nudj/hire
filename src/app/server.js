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
const http = require('http')
const path = require('path')
const Server = require('@nudj/framework/server')

const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingComponent = require('./components/loading/loading')
const expressRouters = {
  insecure: [],
  secure: [
    require('./server/routers/auth'),
    require('./server/routers/google-oauth'),
    require('./pages/tasks/router'),
    require('./pages/jobs/router'),
    require('./pages/connections/router'),
    require('./pages/import-upload/router'),
    require('./pages/survey/router'),
    require('./pages/survey-section/router'),
    require('./pages/survey-question/router'),
    require('./pages/survey-complete/router'),
    require('./pages/conversations/router'),
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

const app = Server({
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
  LoadingComponent
})

// TODO: Hot reloading for mock APIs?
const server = http.createServer(app)
let currentApp = app

server.listen(80, () => {
  console.log('info', 'App running')
})

if (module.hot) {
  module.hot.accept('./redux', () => {
    console.log('\n\nCHANGE\n\n')
    const newReactApp = require('./redux')

    server.removeListener('request', currentApp)
    const newApp = Server({
      App: newReactApp,
      reduxRoutes,
      reduxReducers,
      mockData,
      expressAssetPath,
      buildAssetPath,
      expressRouters,
      spoofLoggedIn,
      errorHandlers,
      gqlFragments,
      LoadingComponent
    })

    server.on('request', newApp)
    currentApp = newApp
  })
}
