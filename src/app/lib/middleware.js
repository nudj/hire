const { Redirect } = require('@nudj/library/errors')
const logger = require('@nudj/framework/logger')
const get = require('lodash/get')
const { createNotification } = require('./')
const request = require('./requestGql')

async function ensureCompanyOnboarded (req, res, next) {
  try {
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
    if (get(responseData, 'user.hirer.company.onboarded')) {
      return next()
    }
  } catch (error) {
    logger.log('error', error)
  }
  next(
    new Redirect({
      url: '/',
      notification: createNotification(
        'error',
        "We're still getting your company set-up, so you can't access this page just yet. Need more information? Let us know."
      )
    })
  )
}

module.exports = {
  ensureCompanyOnboarded
}
