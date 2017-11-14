require('envkey')
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (
      filename.match(/@nudj/) ||
      filename.match(/app/) ||
      filename.match(/framework/)
    ) {
      return false
    }
    return true
  }
})
const path = require('path')
const server = require('@nudj/framework/server')

const App = require('./redux')
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
    require('./pages/import/router'),
    require('./pages/survey/router'),
    require('./pages/survey-section/router'),
    require('./pages/survey-question/router'),
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
server({
  App,
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
