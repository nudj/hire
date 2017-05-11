/* global data */

let React = require('react')
let ReactDOM = require('react-dom')
let { createStore, combineReducers, applyMiddleware } = require('redux')
let { Provider } = require('react-redux')
let { createBrowserHistory } = require('history')
let { ConnectedRouter, routerMiddleware, routerReducer } = require('@nudj/react-router-redux')
let thunkMiddleware = require('redux-thunk').default

let App = require('./components/index')
let { pageReducer } = require('./reducers/page')
let { fetchPage } = require('./actions/app')

const history = createBrowserHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    router: routerReducer,
    page: pageReducer
  }),
  data,
  applyMiddleware(thunkMiddleware),
  applyMiddleware(historyMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} onChange={(dispatch, location) => {
      // only fetch new page data if...
      // - REPLACE action called on the history (forcing a refresh)
      // - requested url is not already in page data (page data is stale)
      if (history.action === 'REPLACE' || location.pathname !== store.getState().page.url.originalUrl) {
        dispatch(fetchPage(location.pathname))
      }
    }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
