const { Redirect, NotFound } = require('@nudj/library/errors')
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
        'Your account hasn\'t been fully set up just yet!'
      ) : null
    })
  )
}

async function ensureAdmin (req, res, next) {
  try {
    const query = `
      query {
        user {
          hirer {
            type
          }
        }
      }
    `
    const responseData = await request(req.session.userId, query)
    if (get(responseData, 'user.hirer.type') === 'ADMIN') {
      return next()
    }
  } catch (error) {
    logger.log('error', error)
  }

  next(new NotFound({ log: ['Unauthorised access of admin-only page'] }))
}

async function ensureNotOnboarded (req, res, next) {
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
    if (!get(responseData, 'user.hirer.onboarded')) {
      return next()
    }
  } catch (error) {
    logger.log('error', error)
  }

  logger.log('info', 'Signed-up hirer attempted to access onboarding flow')
  next(
    new Redirect({
      url: '/'
    })
  )
}

module.exports = {
  ensureNotOnboarded,
  ensureOnboarded,
  ensureAdmin
}
