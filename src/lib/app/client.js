/* global data renderedClassNames */

const React = require('react')
const ReactDOM = require('react-dom')
const {
  createStore,
  combineReducers,
  applyMiddleware
} = require('redux')
const { Provider } = require('react-redux')
const { createBrowserHistory } = require('history')
const {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
  replace
} = require('@nudj/react-router-redux')
const thunkMiddleware = require('redux-thunk').default
const { StyleSheet } = require('aphrodite/no-important')

const App = require('./components/index')
const { pageReducer } = require('./reducers/page')
const { externalMessagesReducer } = require('./reducers/external-messages')
const {
  setPage,
  showLoading,
  showError
} = require('./actions/app')
const request = require('../lib/request')

const history = createBrowserHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    router: routerReducer,
    page: pageReducer,
    externalMessages: externalMessagesReducer(data)
  }),
  data,
  applyMiddleware(thunkMiddleware, historyMiddleware)
)
const latestRequest = {}

function fetchData (location, hash, dispatch) {
  return request(location)
    .then((data) => {
      if (data) {
        // only update page state if this is the latest request
        if (hash === latestRequest.hash) {
          dispatch(setPage(data))
        }
        // if the url inside the data does not match the original request it means a redirect has been followed by the browser so the url needs to be updated to match
        if (data.page.url.originalUrl !== window.location.pathname) {
          dispatch(replace(data.page.url.originalUrl))
        }
      }
    })
    .catch((error) => {
      console.error(error)
      if (error.message === 'Unauthorized') {
        // refresh the page to trigger a login redirection
        window.location = ''
        return
      }
      dispatch(showError())
    })
}

StyleSheet.rehydrate(renderedClassNames)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} onChange={(dispatch, location, historyAction) => {
      const url = location.pathname
      const hash = location.key
      // ignore replace actions to reserve them for updating the url only
      if (historyAction !== 'REPLACE') {
        dispatch(showLoading())
        latestRequest.hash = hash
        latestRequest.url = url
        return fetchData(url, hash, dispatch)
      }
      return Promise.resolve()
    }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
