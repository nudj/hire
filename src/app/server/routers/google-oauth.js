const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const createRouter = require('@nudj/framework/router')
const { cacheReturnTo } = require('@nudj/library/server')
const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')

let account
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
  passReqToCallback: true
},
(req, accessToken, refreshToken, profile, cb) => {
  account = { accessToken, refreshToken }
  return cb(null, {})
}))

const saveGoogleAccount = ({ session }) => {
  const { accessToken, refreshToken } = account
  const gql = `
    mutation createGoogleAccount ($data: Data! $type: AccountType! $userId: ID!) {
      user (id: $userId) {
        account: createAccount(type: $type data: $data)
      }
    }
  `
  const variables = {
    userId: session.userId,
    type: 'GOOGLE',
    data: {
      accessToken,
      refreshToken
    }
  }
  const respond = () => {
    throw new Redirect({
      url: session.returnTo || '/'
    })
  }
  return { gql, variables, respond }
}

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
  delete req.session.gmailSecret
  delete req.session.returnFail
  res.redirect(failureRoute)
}

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/auth/google', cacheReturnTo, googleAuthentication)
  router.getHandlers('/auth/google/failure', authenticationFailureHandler)
  router.getHandlers(
    '/auth/google/callback',
    passport.authorize('google', { failureRedirect: '/auth/google/failure' }),
    respondWithGql(saveGoogleAccount)
  )

  return router
}

module.exports = Router
