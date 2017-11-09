const { Redirect } = require('@nudj/framework/errors')
const get = require('lodash/get')
const { createNotification } = require('../../lib')
const request = require('../../lib/requestGql')

async function ensureOnboarded (req, res, next) {
  const query = `
    query EnsureOnboarded ($userId: ID!) {
      user (id: $userId) {
        hirer {
          company {
            onboarded
          }
        }
      }
    }
  `
  const variables = {
    userId: req.session.userId
  }
  const responseData = await request(query, variables)
  if (!get(responseData, 'user.hirer.company.onboarded')) {
    next(new Redirect({
      url: '/',
      notification: createNotification('error', 'We\'re still getting your company set-up, so you can\'t access your jobs just yet. Need more information? Let us know.')
    }))
  }
  return next()
}

module.exports = {
  ensureOnboarded
}
