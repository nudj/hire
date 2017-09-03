const express = require('express')
const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const get = require('lodash/get')
const find = require('lodash/find')
const { actionMapAssign } = require('@nudj/library')
const { cacheReturnTo } = require('@nudj/library/server')

const accounts = require('../modules/accounts')
const router = express.Router()

const addProviderToAccountForPerson = (name, data, account, person) => {
  account = account || {}
  account.person = person.id
  account.providers = account.providers || {}
  account.providers[name] = data
  return accounts.createOrUpdate(account)
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
  passReqToCallback: true
},
(req, accessToken, refreshToken, profile, cb) => {
  const email = get(find(profile.emails, { type: 'account' }), 'value')
  return actionMapAssign(
    {
      account: () => accounts.getByFilters({ person: req.session.data.person.id })
    },
    {
      account: data => addProviderToAccountForPerson(
        'google',
        { accessToken, email },
        data.account,
        req.session.data.person
      )
    }
  )
  .then(data => cb(null, data.account))
}))

router.get('/auth/google', cacheReturnTo, passport.authorize('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.send'
  ]
}))

router.get('/auth/google/callback', passport.authorize('google', { failureRedirect: '/login' }), (req, res) => res.redirect(req.session.returnTo || '/'))

module.exports = router