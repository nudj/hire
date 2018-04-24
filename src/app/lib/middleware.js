const { Redirect } = require('@nudj/library/errors')
const logger = require('@nudj/framework/logger')
const get = require('lodash/get')
const { createNotification } = require('./')
const request = require('./requestGql')

async function ensureOnboarded (req, res, next) {
  try {
    const query = `
      query {
        user {
          hirer {
            onboarded
          }
        }
      }
    `
    const responseData = await request(req.session.userId, query)
    if (get(responseData, 'user.hirer.onboarded')) {
      return next()
    }
  } catch (error) {
    logger.log('error', error)
  }

  next(
    new Redirect({
      url: '/welcome',
      notification: req.originalUrl !== '/' ? createNotification(
        'error',
        "We're still setting up your account, so you can't complete on-boarding just yet."
      ) : null
    })
  )
}

module.exports = {
  ensureOnboarded
}
