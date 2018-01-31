const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const createRouter = require('@nudj/framework/router')

const requestGql = require('../../lib/requestGql')
const { emailPreferences } = require('../../lib/constants')
const { createNotification } = require('../../lib')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, cb) => {
  const query = `
    mutation createGoogleAccount ($data: Data! $type: AccountType! $userId: ID! $personData: PersonUpdateInput!) {
      updatePerson(id: $userId, data: $personData) {
        id
      }
      user (id: $userId) {
        account: createOrUpdateAccount(type: $type data: $data) {
          id
        }
      }
    }
  `
  const variables = {
    userId: req.session.userId,
    type: 'GOOGLE',
    personData: {
      emailPreference: emailPreferences.GOOGLE
    },
    data: {
      accessToken,
      refreshToken
    }
  }
  await requestGql(query, variables)
  return cb(null, {})
}))

const googleAuthentication = passport.authorize('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
  ],
  accessType: 'offline',
  approvalPrompt: 'force'
})

const authenticationFailureHandler = (req, res, next) => {
  req.session.notification = createNotification('error', 'Something went wrong during authentication.')
  const failureRoute = req.session.returnFail || '/'
  delete req.session.returnTo
  delete req.session.returnFail
  res.redirect(failureRoute)
}

const Router = ({
  ensureLoggedIn
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/auth/google', googleAuthentication)
  router.getHandlers('/auth/google/failure', authenticationFailureHandler)
  router.getHandlers(
    '/auth/google/callback',
    passport.authorize('google', { failureRedirect: '/auth/google/failure' }),
    (req, res) => {
      req.session.notification = createNotification(
        'success',
        'We have successfully synced your Gmail account'
      )
      res.redirect(req.session.returnTo || '/')
    }
  )

  return router
}

module.exports = Router
