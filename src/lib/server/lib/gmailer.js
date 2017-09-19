const google = require('googleapis')
const { Base64 } = require('js-base64')
const logger = require('../lib/logger')
const { emailBuilder } = require('@nudj/library/server')

const gmail = google.gmail('v1')
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK)

module.exports.getAccessTokenFromRefreshToken = (refreshToken) => {
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  })

  return new Promise((resolve, reject) => {
    oauth2Client.refreshAccessToken((error, tokens) => {
      if (error) {
        return reject(error)
      }
      resolve(tokens.access_token)
    })
  })
}

module.exports.send = (email, accessToken) => {
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
        raw: base64EncodedEmail
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
