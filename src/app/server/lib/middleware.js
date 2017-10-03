function ensureOnboarded (req, res, next) {
  if (!req.session.data.company.onboarded) {
    req.session.notification = {
      type: 'error',
      message: 'We\'re still getting your company set-up, so you can\'t access your jobs just yet. Need more information? Let us know.'
    }
    return res.redirect('/')
  }
  return next()
}

module.exports = {
  ensureOnboarded
}
