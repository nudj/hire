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
const { setPage } = require('./actions/app')
const request = require('../lib/request')

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

StyleSheet.rehydrate(renderedClassNames)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} onChange={(dispatch, location) => {
      // only fetch new page data if...
      // - history action is not PUSH
      // - history action is PUSH and requested url is not already in page data (page data is stale)
      if (!(history.action === 'PUSH' && location.pathname === store.getState().page.url.originalUrl)) {
        request(location.pathname)
        .catch((error) => {
          switch (error.message) {
            case 'Unauthorized':
              // refresh the page to trigger a login redirection when Unauthorized
              window.location = ''
              break
            default:
              console.log(error)
          }
        })
        .then((data) => {
          // only update page state if it is the date for the page we are currently viewing
          if (data.page.url.originalUrl === store.getState().router.location.pathname) {
            return dispatch(setPage(data))
          }
        })
      }
    }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
