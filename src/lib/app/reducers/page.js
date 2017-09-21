const RouteParser = require('route-parser')
const { externalMessagesReducer } = require('./external-messages')

const newExternalMessageRoute = new RouteParser('/jobs/:jobSlug/external/:recipientId')
const savedExternalMessageRoute = new RouteParser('/jobs/:jobSlug/external/:recipientId/:messageId')

const pageReducer = (data) => {
  const externalMessages = externalMessagesReducer(data)
  return (state, action) => {
    switch (true) {
      case !!newExternalMessageRoute.match(data.app.url.originalUrl):
      case !!savedExternalMessageRoute.match(data.app.url.originalUrl):
        return externalMessages(state, action)
      default:
        return {}
    }
  }
}

module.exports = {
  pageReducer
}
