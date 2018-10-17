require('envkey')
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (
      filename.match(
        /\/usr\/src\/((?=.*@nudj)(?!.*\/node_modules).*)|\/usr\/src\/app/
      )
    ) {
      return false
    }
    return true
  }
})

const http = require('http')
const path = require('path')
const createNudjApps = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')
const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const LoadingPage = require('./pages/loading')
const getAnalytics = require('./server/lib/getAnalytics')

// The order of the routes is significant
const expressRouters = {
  insecure: [
    require('./server/routers/health-check')
  ],
  secure: [
    require('./server/routers/auth'),
    require('./server/routers/google-oauth'),
    require('./pages/check-device-wrapper/router'),
    require('./pages/root/router'),
    require('./pages/contacts/router'),
    require('./pages/messages/router'),
    require('./pages/favourites/router'),
    require('./pages/setup-linkedin/router'),
    require('./pages/survey-complete/router'),
    require('./pages/survey-question/router'),
    require('./pages/survey/router'),
    require('./pages/notification-sent/router'),
    require('./pages/applications/router'),
    require('./pages/invite/router'),
    require('./pages/intros/router'),
    require('./pages/edit-intro/router'),
    require('./pages/intro/router'),
    require('./pages/team/router'),
    require('./pages/welcome/router'),
    require('./pages/share-jobs/router'),
    require('./pages/share-with-team/router'),
    require('./pages/setup-company/router'),
    require('./pages/company-settings/router'),
    require('./pages/add-jobs/router'),
    require('./pages/add-jobs/set-bonus/router'),
    require('./pages/edit-jobs/router'),
    require('./pages/request-access/router'),
    require('./pages/access-request/router'),
    require('./pages/invitation-accept/router'),
    require('./pages/hirer/router'),
    require('./pages/hirer-edit/router'),
    require('./server/routers/catch-all')
  ]
}

const expressAssetPath = path.resolve('./app/server/assets')
const buildAssetPath = path.resolve('./app/server/build')

const spoofLoggedIn = (req, res, next) => {
  req.session.userId = process.env.SPOOF_USER_ID
  next()
}

const errorHandlers = {}
const gqlFragments = require('./lib/graphql')

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'snap.licdn.com',
        'widget.intercom.io',
        'tagmanager.google.com',
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'js.intercomcdn.com',
        'www.fullstory.com'
      ],
      connectSrc: [
        "'self'",
        'api-iam.intercom.io',
        'www.google-analytics.com',
        'nexus-websocket-a.intercom.io',
        'wss://nexus-websocket-a.intercom.io',
        'nexus-websocket-b.intercom.io',
        'wss://nexus-websocket-b.intercom.io',
        'rs.fullstory.com',
        'api.mixpanel.com'
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'cdnjs.cloudflare.com'
      ],
      fontSrc: [
        "'self'",
        'js.intercomcdn.com'
      ],
      imgSrc: [
        "'self'",
        'www.google-analytics.com',
        'https://static.intercomassets.com'
      ]
    }
  }
}

const app = createNudjApps({
  App: reactApp,
  reduxRoutes,
  reduxReducers,
  expressAssetPath,
  buildAssetPath,
  expressRouters,
  spoofLoggedIn,
  errorHandlers,
  gqlFragments,
  LoadingComponent: LoadingPage,
  helmetConfig,
  getAnalytics
})

http
  .createServer(app)
  .listen(process.env.APP_PORT, () => logger.log('info', 'Application running'))
