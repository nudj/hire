let express = require('express')
let get = require('lodash/get')
// let _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

let logger = require('../lib/logger')
let request = require('../modules/request')
let jobs = require('../modules/jobs')
let app = require('../../app/server')
let router = express.Router()

function ensureLoggedIn (req, res, next) {
  req.session.data = {
    person: {
      firstName: 'David',
      lastName: 'Platt'
    },
    company: {
      id: '1',
      name: 'Johns PLC',
      slug: 'johns-plc'
    }
  }
  return next()
  // if (req.session.logout) {
  //   let url = req.originalUrl.split('/')
  //   url.pop()
  //   res.redirect(url.join('/'))
  // } else {
  //   _ensureLoggedIn(req, res, next)
  // }
  // delete req.session.logout
}

function getRenderDataBuilder (req) {
  return (data) => {
    data.csrfToken = req.csrfToken()
    if (req.session.data) {
      req.session.data.person = data.person || req.session.data.person
      data.person = req.session.data.person
    }
    if (req.session.message) {
      data.message = req.session.message
      delete req.session.message
    }
    data.url = {
      protocol: req.protocol,
      hostname: req.hostname,
      originalUrl: req.originalUrl
    }
    return {
      page: data
    }
  }
}

function getErrorHandler (req, res, next) {
  return (error) => {
    try {
      let data, errorMessage
      switch (error.message) {
        // redirects with message
        case 'Already referred':
        case 'Already applied':
          req.session.message = {
            code: 403,
            type: 'error',
            message: error.message
          }
          let destination = req.originalUrl.split('/')
          logger.log('error', error.message, req.method, req.params.companySlug, req.params.jobSlugRefId, destination.pop(), error)
          destination = destination.join('/')
          res.redirect(destination)
          break
        // renders with message
        case 'Invalid url':
          errorMessage = {
            code: 400,
            error: 'error',
            message: 'Form submission data invalid'
          }
          data = getRenderDataBuilder(req)({
            message: errorMessage
          })
          getRenderer(req, res, next)(data)
          break
        // full page errors
        default:
          logger.log('error', error.message, error)
          switch (error.message) {
            case 'Not found':
              errorMessage = {
                code: 404,
                type: 'error',
                message: 'Not found'
              }
              break
            default:
              errorMessage = {
                code: 500,
                type: 'error',
                message: 'Something went wrong'
              }
          }
          data = getRenderDataBuilder(req)({
            error: errorMessage
          })
          getRenderer(req, res, next)(data)
      }
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }
}

function getRenderer (req, res, next) {
  return (data) => {
    delete req.session.logout
    delete req.session.returnTo
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json(data)
    }
    let staticContext = app(data)
    if (staticContext.url) {
      res.redirect(staticContext.url)
    } else {
      let status = get(data, 'error.code', staticContext.status || 200)
      res.status(status).render('app', {
        data: JSON.stringify(data),
        html: staticContext.html,
        css: staticContext.css,
        helmet: staticContext.helmet
      })
    }
  }
}

function redirect (req, res, url) {
  if (req.accepts('json') && !req.accepts('html')) {
    return () => res.json({ redirect: url })
  } else {
    return () => res.redirect(url)
  }
}

function requestHandler (req, res, next) {
  request
    .send(req.body.first_name, req.body.last_name, req.body.email, req.body.company_name)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function jobsHandler (req, res, next) {
  jobs
    .getAll(Object.assign({}, req.session.data))
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function jobHandler (req, res, next) {
  jobs
    .get(Object.assign({}, req.session.data), req.params.jobSlug)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function archiveHandler (req, res, next) {
  jobs
    .patch(req.params.jobSlug, {
      status: 'Archived'
    })
    .then(redirect(req, res, req.get('Referrer')))
    .catch(getErrorHandler(req, res, next))
}

function publishHandler (req, res, next) {
  jobs
    .patch(req.params.jobSlug, {
      status: 'Published'
    })
    .then(redirect(req, res, req.get('Referrer')))
    .catch(getErrorHandler(req, res, next))
}

function composeHandler (req, res, next) {
  jobs
    .compose(Object.assign({}, req.session.data), req.params.jobSlug, [].concat(req.body.recipients || []))
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

router.post('/request', requestHandler)
router.get('/jobs', ensureLoggedIn, jobsHandler)
router.get('/jobs/:jobSlug', ensureLoggedIn, jobHandler)
router.post('/jobs/:jobSlug/archive', ensureLoggedIn, archiveHandler)
router.post('/jobs/:jobSlug/publish', ensureLoggedIn, publishHandler)
router.get('/jobs/:jobSlug/compose', (req, res) => res.redirect(`/jobs/${req.params.jobSlug}`))
router.post('/jobs/:jobSlug/compose', ensureLoggedIn, composeHandler)
router.get('*', (req, res) => {
  let data = getRenderDataBuilder(req)({})
  getRenderer(req, res)(data)
})

module.exports = router
