const client = require('@nudj/framework/client')

const App = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingComponent = require('./components/loading/loading')

client({
  App,
  reduxRoutes,
  reduxReducers,
  LoadingComponent
})
