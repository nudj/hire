/* global data */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import App from './components/index'
import { errorReducer } from './reducers/error'
import { userReducer } from './reducers/user'
import { messageReducer } from './reducers/message'
import { pageReducer } from './reducers/page'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    error: errorReducer,
    user: userReducer,
    page: pageReducer,
    message: messageReducer,
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
