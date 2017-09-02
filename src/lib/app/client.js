/* global data renderedClassNames */

const React = require('react')
const ReactDOM = require('react-dom')
const { createStore, combineReducers, applyMiddleware } = require('redux')
const { Provider } = require('react-redux')
const { createBrowserHistory } = require('history')
const { ConnectedRouter, routerMiddleware, routerReducer } = require('@nudj/react-router-redux')
const thunkMiddleware = require('redux-thunk').default
const { StyleSheet } = require('aphrodite/no-important')

const App = require('./components/index')
const { pageReducer } = require('./reducers/page')
const { externalMessagesReducer } = require('./reducers/external-messages')
const { setPage, showLoading } = require('./actions/app')
const request = require('../lib/request')

const history = createBrowserHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    router: routerReducer,
    page: pageReducer,
    externalMessages: externalMessagesReducer
  }),
  data,
  applyMiddleware(thunkMiddleware, historyMiddleware)
)

let latestRequestCache
function makeRequest (location, hash, dispatch) {
  return request(location)
  .catch((error) => {
    switch (error.message) {
      case 'Unauthorized':
        // refresh the page to trigger a login redirection when Unauthorized
        window.location = ''
        break
      default:
        console.error(error)
    }
  })
  .then((data) => {
    // only update page state if this is the latest request
    console.log('feature/gmail-auth', 'response', hash, latestRequestCache.hash, hash === latestRequestCache.hash)
    if (data && hash === latestRequestCache.hash) {
      dispatch(setPage(data))
    }
  })
}

StyleSheet.rehydrate(renderedClassNames)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} onChange={(dispatch, location) => {
      let response = Promise.resolve()
      // only fetch new page data if...
      // - history action is not PUSH
      // - history action is PUSH and requested url is not already in page data (page data is stale)
      const url = location.pathname
      const hash = location.key
      const oldUrl = store.getState().page.url.originalUrl
      if (url === '/logout') {
        window.location = `${url}?returnTo=${encodeURIComponent(oldUrl)}`
      } else {
        if (latestRequestCache) {
          dispatch(showLoading())
          latestRequestCache = { hash, url }
          console.log('feature/gmail-auth', 'request', hash)
          response = makeRequest(url, hash, dispatch)
        }
      }
      // initialise latestRequestCache only after first location change has been ignored
      latestRequestCache = latestRequestCache || {}
      return response
    }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
