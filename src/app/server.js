require('envkey')
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (filename.match(/@nudj/) || filename.match(/app/) || filename.match(/framework/)) {
      return false
    }
    return true
  }
})
const path = require('path')
const server = require('@nudj/framework/server')
const find = require('lodash/find')

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
    require('./pages/import-contacts/router'),
    require('./pages/survey-compose/router'),
    require('./pages/survey/router'),
    require('./pages/jobs/router'),
    require('./pages/job/router'),
    require('./pages/nudj/router'),
    require('./pages/internal-compose/router'),
    require('./pages/external-select/router'),
    require('./pages/external-compose/router'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.join(__dirname, 'server/assets')
const buildAssetPath = path.join(__dirname, 'server/build')
const mockData = require('./mock-data')
const spoofLoggedIn = (req, res, next) => {
  req.session.data = req.session.data || {
    user: {
      email: find(mockData.people, { id: 'person5' }).email,
      type: 'HIRER'
    }
  }
  next()
}
const errorHandlers = {}
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
  LoadingComponent
})
