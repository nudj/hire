let express = require('express')
let passport = require('passport')
let fetch = require('../lib/fetch')
let logger = require('../lib/logger')

function cacheReturnTo (req, res, next) {
  if (!req.session.returnTo) {
    req.session.returnTo = req.get('Referrer')
  }
  next()
}

let router = express.Router()

// Perform session logout and redirect to last known page or homepage
router.get('/logout', (req, res, next) => {
  req.logout()
  delete req.session.person
  req.session.logout = true
  res.redirect(req.get('Referrer') || '/')
})

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res, next) => {
    if (!req.user) {
      throw new Error('user null')
    }

    fetch(`people/first?email=${req.user._json.email}`)
    .then((person) => {
      if (!person) {
        return fetch(`people`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: req.user._json.email
          })
        })
      } else {
        return person
      }
    })
    .then((person) => {
      if (person.error) {
        throw new Error('Unable to login')
      } else {
        req.session.person = person
        res.redirect(req.session.returnTo || '/')
      }
    })
    .catch((error) => {
      logger.log('error', error)
      next('Unable to login')
    })
  }
)

router.get('/login', cacheReturnTo, passport.authenticate('auth0', {}), (req, res, next) => res.redirect(req.session.returnTo || '/'))

module.exports = router
