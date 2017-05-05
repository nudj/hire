/* global data */

let React = require('react')
let ReactDOM = require('react-dom')
let { createStore, combineReducers, applyMiddleware } = require('redux')
let { Provider } = require('react-redux')
let { createBrowserHistory } = require('history')
let { ConnectedRouter, routerReducer, routerMiddleware } = require('react-router-redux')

let App = require('./components/index')
let { pageReducer } = require('./reducers/page')

const history = createBrowserHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    page: pageReducer,
    router: routerReducer
  }),
  data,
  applyMiddleware(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
