const express = require('express')
const get = require('lodash/get')
// const _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

const logger = require('../lib/logger')
const request = require('../modules/request')
const jobs = require('../modules/jobs')
const network = require('../modules/network')
const { promiseMap } = require('../lib')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO

const prismic = require('../modules/prismic')({accessToken, repo})

const app = require('../../app/server')
const router = express.Router()

const clone = (obj) => Object.assign({}, obj)

function ensureLoggedIn (req, res, next) {
  req.session.data = {
    person: {
      id: '21',
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
  //   if (req.xhr) {
  //     if (!req.isAuthenticated || !req.isAuthenticated()) {
  //       return res.status(401).send()
  //     }
  //   }
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
    if (req.xhr) {
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

// function redirect (req, res, url) {
//   if (req.xhr) {
//     return () => res.json({ redirect: url })
//   } else {
//     return () => res.redirect(url)
//   }
// }

function requestHandler (req, res, next) {
  request
    .send(req.body.first_name, req.body.last_name, req.body.email, req.body.company_name)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function jobsHandler (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['jobsDashboard']
  }

  jobs
    .getAll(clone(req.session.data))
    .then(data => {
      data.tooltip = prismic.fetchContent(prismicQuery, true)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function jobHandler (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['jobDashboard']
  }

  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(data => {
      data.tooltip = prismic.fetchContent(prismicQuery, true)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function internalHandler (req, res, next) {
  const composeQuery = {
    'document.type': 'composemessage',
    'document.tags': ['internal']
  }
  const dialogQuery = {
    'document.type': 'dialog',
    'document.tags': ['sendInternal']
  }

  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(data => {
      data.compose = prismic.fetchContent(composeQuery, true)
      data.dialog = prismic.fetchContent(dialogQuery, true)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function internalSendHandler (req, res, next) {
  const composeQuery = {
    'document.type': 'composemessage',
    'document.tags': ['internal']
  }
  const dialogQuery = {
    'document.type': 'dialog',
    'document.tags': ['sendInternal']
  }

  network
    .send(clone(req.session.data), req.params.jobSlug, req.body)
    .then(data => {
      data.compose = prismic.fetchContent(composeQuery)
      data.dialog = prismic.fetchContent(dialogQuery)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function externalHandler (req, res, next) {
  const selectReferrersQuery = {
    'document.type': 'tooltip',
    'document.tags': ['selectReferrers', 'external']
  }

  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(data => network.get(data, data.person.id, data.job.id))
    .then(data => {
      data.networkSent = data.sentExternal.map(person => person.id)

      const referrerType = data.sentExternal.length ? 'notFirstTime' : 'firstTime'
      selectReferrersQuery['document.tags'].push(referrerType)

      data.tooltips = prismic.fetchContent(selectReferrersQuery)

      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function externalComposeHandler (req, res, next) {
  const composeExternalTooltips = {
    'document.type': 'tooltip',
    'document.tags': ['sendExternal']
  }
  const composeExternalMessages = {
    'document.type': 'composemessage',
    'document.tags': ['external']
  }

  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(data => network.getById(data, data.person.id, data.job.id, data.personId))
    .then(data => {
      data.tooltips = prismic.fetchContent(composeExternalTooltips)
      data.messages = prismic.fetchContent(composeExternalMessages)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

// function archiveHandler (req, res, next) {
//   jobs
//     .patch(req.params.jobSlug, {
//       status: 'Archived'
//     })
//     .then(redirect(req, res, req.get('Referrer')))
//     .catch(getErrorHandler(req, res, next))
// }
//
// function publishHandler (req, res, next) {
//   jobs
//     .patch(req.params.jobSlug, {
//       status: 'Published'
//     })
//     .then(redirect(req, res, req.get('Referrer')))
//     .catch(getErrorHandler(req, res, next))
// }
//
// function composeHandler (req, res, next) {
//   jobs
//     .compose(clone(req.session.data), req.params.jobSlug, [].concat(req.body.recipients || []))
//     .then(getRenderDataBuilder(req, res, next))
//     .then(getRenderer(req, res, next))
//     .catch(getErrorHandler(req, res, next))
// }

router.post('/request', requestHandler)
router.get('/jobs', ensureLoggedIn, jobsHandler)
router.get('/jobs/:jobSlug', ensureLoggedIn, jobHandler)
router.get('/jobs/:jobSlug/internal', ensureLoggedIn, internalHandler)
router.post('/jobs/:jobSlug/internal', ensureLoggedIn, internalSendHandler)
router.get('/jobs/:jobSlug/external', ensureLoggedIn, externalHandler)
router.get('/jobs/:jobSlug/external/compose/:personId', ensureLoggedIn, externalComposeHandler)
// router.post('/jobs/:jobSlug/archive', ensureLoggedIn, archiveHandler)
// router.post('/jobs/:jobSlug/publish', ensureLoggedIn, publishHandler)
// router.get('/jobs/:jobSlug/compose', (req, res) => res.redirect(`/jobs/${req.params.jobSlug}`))
// router.post('/jobs/:jobSlug/compose', ensureLoggedIn, composeHandler)
// router.get('*', (req, res) => {
//   let data = getRenderDataBuilder(req)({})
//   getRenderer(req, res)(data)
// })

module.exports = router
