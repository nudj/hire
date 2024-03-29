const initialiseClient = require('@nudj/framework/client')
const createReactRoutes = require('@nudj/framework/lib/redux/create-react-routes')

const App = require('./redux')
const routes = createReactRoutes(require('./redux/routes'))
const reducers = require('./redux/reducers')
const LoadingPage = require('./pages/loading')

const { render } = initialiseClient(reducers)
render(App, routes, LoadingPage)
