const google = require('googleapis')
const { Base64 } = require('js-base64')
const logger = require('@nudj/framework/logger')
const { emailBuilder } = require('@nudj/library/server')
const request = require('@nudj/library/request')

const gmail = google.gmail('v1')
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK)

const verifyOrRefreshAccessToken = (accessToken, refreshToken) => {
  return request(`/oauth2/v1/tokeninfo?access_token=${accessToken}`, {
    baseURL: 'https://www.googleapis.com/'
  })
    .then(() => {
      return Promise.resolve(accessToken)
    })
    .catch(error => {
      logger.log('error', error)
      if (!refreshToken) {
        return Promise.reject(error)
      }
      return getAccessTokenFromRefreshToken(refreshToken)
    })
}

const getAccessTokenFromRefreshToken = (refreshToken) => {
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  })

  return new Promise((resolve, reject) => {
    oauth2Client.refreshAccessToken((error, tokens) => {
      if (error) {
        logger.log('error', 'Google authentication error', error)
        return reject(error)
      }
      resolve(tokens.access_token)
    })
  })
}

const getThread = ({ threadId, accessToken }) => {
  oauth2Client.setCredentials({
    access_token: accessToken
  })

  return new Promise((resolve, reject) => {
    gmail.users.threads.get({
      auth: oauth2Client,
      userId: 'me',
      id: threadId
    }, (error, response) => {
      if (error) {
        logger.log('error', 'Error retrieving Gmail thread', error)
        return reject(error)
      }
      resolve(response)
    })
  })
}

const sendGmail = ({ email, accessToken, threadId }) => {
  const mimeEmail = emailBuilder(email)
  const base64EncodedEmail = Base64.encodeURI(mimeEmail)
  oauth2Client.setCredentials({
    access_token: accessToken
  })

  return new Promise((resolve, reject) => {
    gmail.users.messages.send({
      auth: oauth2Client,
      userId: 'me',
      resource: {
        raw: base64EncodedEmail,
        threadId
      }
    }, (error, response) => {
      if (error) {
        logger.log('error', 'Error sending GMail', error)
        return reject(error)
      }
      resolve(response)
    })
  })
}

module.exports = {
  sendGmail,
  getThread,
  getAccessTokenFromRefreshToken,
  verifyOrRefreshAccessToken
}
