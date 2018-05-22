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
    require('./pages/applications/router'),
    require('./pages/invite/router'),
    require('./pages/invite-team/router'),
    require('./pages/welcome/router'),
    require('./pages/share-jobs/router'),
    require('./server/routers/catch-all')
  ]
}

const useDevServer = process.env.USE_DEV_SERVER === 'true'

const expressAssetPath = path.resolve('./app/server/assets')
const buildAssetPath = !useDevServer && path.resolve('./app/server/build')

const spoofLoggedIn = (req, res, next) => {
  req.session.userId = process.env.SPOOF_USER_ID
  next()
}

const errorHandlers = {}
const gqlFragments = require('./lib/graphql')
let app = createNudjApps({
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

if (module.hot) {
  module.hot.accept([
    './redux',
    './redux/routes',
    './redux/reducers',
    path.resolve('./pages'),
    path.resolve('./components'),
    './server/routers/auth',
    './server/routers/google-oauth',
    './pages/check-device-wrapper/router',
    './pages/contacts/router',
    './pages/messages/router',
    './pages/favourites/router',
    './pages/setup-linkedin/router',
    './pages/survey-complete/router',
    './pages/survey-question/router',
    './pages/survey/router',
    './pages/invite/router',
    './pages/invite-team/router',
    './pages/notification-sent/router',
    './pages/dashboard/router',
    './pages/applications/router',
    './pages/welcome/router',
    './pages/share-jobs/router',
    './server/routers/catch-all'
  ], () => {
    const updatedReactApp = require('./redux')
    const updatedReduxRoutes = require('./redux/routes')
    const updatedReduxReducers = require('./redux/reducers')
    const updatedLoadingPage = require('./pages/loading')
    const updatedExpressRouters = {
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
        require('./pages/applications/router'),
        require('./pages/invite/router'),
        require('./pages/invite-team/router'),
        require('./pages/welcome/router'),
        require('./pages/share-jobs/router'),
        require('./server/routers/catch-all')
      ]
    }

    server.removeListener('request', app)
    const newApp = createNudjApps({
      App: updatedReactApp,
      reduxRoutes: updatedReduxRoutes,
      reduxReducers: updatedReduxReducers,
      expressAssetPath,
      buildAssetPath,
      expressRouters: updatedExpressRouters,
      spoofLoggedIn,
      errorHandlers,
      gqlFragments,
      LoadingComponent: updatedLoadingPage
    })

    server.on('request', newApp)
    app = newApp
  })
}
