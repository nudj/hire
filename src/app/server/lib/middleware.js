const { Redirect } = require('@nudj/framework/errors')
const get = require('lodash/get')
const { createNotification } = require('../../lib')
const request = require('../../lib/request')

async function ensureOnboarded (req, res, next) {
  const query = `
    query EnsureOnboarded ($userEmail: String) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          company {
            onboarded
          }
        }
      }
    }
  `
  const variables = {
    userEmail: req.session.data.user.email
  }
  const responseData = await request('/', {
    baseURL: `http://${process.env.API_HOST}:82`,
    method: 'post',
    data: {
      query,
      variables
    }
  })
  if (!get(responseData, 'data.person.hirer.company.onboarded')) {
    throw new Redirect({
      url: '/',
      notification: createNotification('error', 'We\'re still getting your company set-up, so you can\'t access your jobs just yet. Need more information? Let us know.')
    })
  }
  return next()
}

module.exports = {
  ensureOnboarded
}
