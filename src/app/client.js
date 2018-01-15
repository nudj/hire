const client = require('@nudj/framework/client')

const App = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingPage = require('./pages/loading')

client({
  App,
  reduxRoutes,
  reduxReducers,
  LoadingComponent: LoadingPage
})
