const express = require('express')
const passport = require('passport')
const request = require('../../lib/request')
const logger = require('@nudj/framework/logger')
const { cacheReturnTo } = require('@nudj/library/server')

async function fetchPerson (email) {
  try {
    const person = await request(`people/first?email=${encodeURIComponent(email)}`)
    if (!person) throw new Error('Person not found')
    if (person.error) throw new Error('Unable to fetch person')
    return person
  } catch (error) {
    throw new Error('Error fetching person')
  }
}

async function fetchHirer (personId) {
  try {
    const hirer = await request(`hirers/first?person=${personId}`)
    if (!hirer) throw new Error('Not a registered hirer')
    if (hirer.error) throw new Error('Error fetching hirer')
    return hirer
  } catch (error) {
    throw new Error('Error fetching hirer')
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
        const person = await fetchPerson(req.user._json.email)
        await fetchHirer(person.id) // ensure hirer exists
        req.session.userEmail = req.user._json.email
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
