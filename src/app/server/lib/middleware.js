const { Redirect } = require('@nudj/framework/errors')
const { createNotification } = require('../../lib')

function ensureOnboarded (req, res, next) {
  if (!req.session.data.company.onboarded) {
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
