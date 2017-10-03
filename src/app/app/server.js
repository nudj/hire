let React = require('react')
let ReactDOMServer = require('react-dom/server')
let { StaticRouter } = require('react-router-dom')
let { Provider } = require('react-redux')
let { createStore, combineReducers, applyMiddleware } = require('redux')
let { Helmet } = require('react-helmet')
let { StyleSheetServer } = require('aphrodite/no-important')
let thunkMiddleware = require('redux-thunk').default

let { appReducer } = require('./reducers/app')
const { externalMessagesReducer } = require('./reducers/external-messages')

module.exports = (data) => {
  const store = createStore(
    combineReducers({
      app: appReducer,
      externalMessagePage: externalMessagesReducer(data)
    }),
    data,
    applyMiddleware(thunkMiddleware)
  )
  const context = {}
  const { html, css } = StyleSheetServer.renderStatic(() => {
    const App = require('./components/index')
    return ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={data.app.url.originalUrl}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    )
  })
  context.html = html
  context.css = css
  context.helmet = Helmet.renderStatic()
  return context
}