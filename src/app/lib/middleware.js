const { Redirect, NotFound } = require('@nudj/library/errors')
const logger = require('@nudj/framework/logger')
const get = require('lodash/get')
const { createNotification } = require('./')
const request = require('./requestGql')

async function ensureNoAccessRequestsPending (req, res, next) {
  const gql = `
    query ensureNoAccessRequestsPending ($personId: ID!) {
      accessRequest: accessRequestByFilters(filters: { person: $personId }) {
        id
        company {
          slug
        }
        acceptedBy {
          id
        }
      }
    }
  `
  const variables = {
    personId: req.session.userId
  }

  const data = await request(req.session.userId, gql, variables)

  // If access request exists and acceptedBy does not, then redirect to request page
  if (get(data, 'accessRequest') && !get(data, 'accessRequest.acceptedBy')) {
    return res.redirect(`/request-access/${data.accessRequest.company.slug}`)
  }
  next()
}

async function ensureValidCompanyHash (req, res, next) {
  const { hash } = req.params
  try {
    const query = `
      query validateCompanyHash ($hash: String!) {
        companyByFilters(filters: { hash: $hash }) {
          id
        }
      }
    `
    const responseData = await request(req.session.userId, query, { hash })
    if (get(responseData, 'companyByFilters.id')) {
      return next()
    }
  } catch (error) {
    logger.log('error', error)
  }

  return next(
    new NotFound({ log: ['User accessed an invalid invitation hash', hash] })
  )
}

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
    return next(error)
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
  ensureValidCompanyHash,
  ensureOnboarded,
  ensureAdmin,
  ensureNoAccessRequestsPending
}
