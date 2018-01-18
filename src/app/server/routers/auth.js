const express = require('express')
const passport = require('passport')
const request = require('@nudj/library/request')
const logger = require('@nudj/framework/logger')
const { cacheReturnTo } = require('@nudj/library/server')

async function fetchPerson (email) {
  try {
    const person = await request(`people/first?email=${encodeURIComponent(email)}`, {
      baseURL: `http://${process.env.API_HOST}:81`
    })
    if (!person) throw new Error('Person not found')
    if (person.error) throw new Error('Unable to fetch person')
    return person
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

async function fetchHirer (personId) {
  try {
    const hirer = await request(`hirers/first?person=${personId}`, {
      baseURL: `http://${process.env.API_HOST}:81`
    })
    if (!hirer) throw new Error('Not a registered hirer')
    if (hirer.error) throw new Error('Error fetching hirer')
    return hirer
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  // Perform session logout and redirect to last known page or homepage
  router.get('/logout', (req, res, next) => {
    req.logOut()
    delete req.session.data
    req.session.logout = true
    req.session.returnTo = req.query.returnTo
    res.clearCookie('connect.sid', {path: '/'})
    res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent(`${process.env.PROTOCOL_DOMAIN}/loggedout`)}&client_id=${process.env.AUTH0_CLIENT_ID}`)
  })

  router.get('/loggedout', (req, res, next) => {
    const returnTo = req.session.returnTo
    req.session.destroy(() => res.redirect(returnTo || '/'))
  })

  router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    async (req, res, next) => {
      if (!req.user) {
        logger.log('error', 'User not returned from Auth0')
        return next('Unable to login')
      }

      try {
        const user = await fetchPerson(req.user._json.email)
        await fetchHirer(user.id) // ensure hirer exists
        req.session.userId = user.id
        res.redirect(req.session.returnTo || '/')
      } catch (error) {
        logger.log('error', error)
        next('Unable to login')
      }
    }
  )

  router.get('/login', cacheReturnTo, passport.authenticate('auth0', {}), (req, res, next) => res.redirect(req.session.returnTo || '/'))

  return router
}
module.exports = Router
