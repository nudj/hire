const express = require('express')
const get = require('lodash/get')
const merge = require('lodash/merge')
const _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

const logger = require('../lib/logger')
const common = require('../modules/common')
const jobs = require('../modules/jobs')
const network = require('../modules/network')
const sentExternal = require('../modules/sent-external')
const { promiseMap } = require('../lib')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../modules/prismic')({accessToken, repo})

const app = require('../../app/server')
const router = express.Router()

const clone = (obj) => Object.assign({}, obj)

function spoofLoggedIn (req, res, next) {
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
}

function doEnsureLoggedIn (req, res, next) {
  if (req.session.logout) {
    let url = req.originalUrl.split('/')
    url.pop()
    res.redirect(url.join('/'))
  } else {
    if (req.xhr) {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send()
      }
    }
    _ensureLoggedIn(req, res, next)
  }
  delete req.session.logout
}

const spoofUser = process.env.SPOOF_USER === 'true'
const ensureLoggedIn = spoofUser ? spoofLoggedIn : doEnsureLoggedIn

function getRenderDataBuilder (req) {
  return (data) => {
    data.csrfToken = req.csrfToken()
    if (req.session.data) {
      req.session.data.person = data.person || req.session.data.person
      data.person = req.session.data.person
    }
    if (req.session.notification) {
      data.notification = req.session.notification
      delete req.session.notification
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

function fetchInternalPrismicContent (data) {
  const composeQuery = {
    'document.type': 'composemessage',
    'document.tags': ['internal']
  }
  const dialogQuery = {
    'document.type': 'dialog',
    'document.tags': ['sendInternal']
  }
  const tooltipQuery = {
    'document.type': 'tooltip',
    'document.tags': ['sendInternal']
  }
  data.compose = prismic.fetchContent(composeQuery, true)
  data.dialog = prismic.fetchContent(dialogQuery, true)
  data.tooltip = prismic.fetchContent(tooltipQuery, true)
  return promiseMap(data)
}

function internalHandler (req, res, next) {
  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(fetchInternalPrismicContent)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function internalSendHandler (req, res, next) {
  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then((data) => network.send(data, req.body))
    .then(data => {
      if (data.messages) {
        // successful send
        req.session.notification = {
          type: 'success',
          message: 'That’s the way, aha aha, I like it! 🎉'
        }
        return res.redirect(`/${req.params.jobSlug}`)
      }
      return fetchInternalPrismicContent(data)
        .then(getRenderDataBuilder(req, res, next))
        .then(getRenderer(req, res, next))
        .catch(getErrorHandler(req, res, next))
    })
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
    .then(data => sentExternal.getAll(data, data.person.id, data.job.id))
    .then(data => sentExternal.getAllComplete(data, data.person.id, data.job.id))
    .then(data => {
      data.networkSaved = data.sentExternal.map(person => person.id)
      data.networkSent = data.sentExternalComplete.map(person => person.id)

      const referrerType = data.sentExternal.length ? 'notFirstTime' : 'firstTime'
      selectReferrersQuery['document.tags'].push(referrerType)

      data.tooltips = prismic.fetchContent(selectReferrersQuery)

      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function getExternalComposeProperties (data) {
  const composeExternalTooltips = {
    'document.type': 'tooltip',
    'document.tags': ['sendExternal']
  }
  const composeExternalMessages = {
    'document.type': 'composemessage',
    'document.tags': ['external']
  }

  return network.getById(data, data.person.id, data.job.id, data.personId)
    .then(data => {
      data.recipient = common.fetchPersonFromFragment(data.personId)
      data.sentMessage = sentExternal.get(data, data.person.id, data.job.id, data.personId)
      data.tooltips = prismic.fetchContent(composeExternalTooltips)
      data.messages = prismic.fetchContent(composeExternalMessages)
      return promiseMap(data)
    })
}

function externalComposeHandler (req, res, next) {
  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(data => {
      data.personId = req.params.personId
      return promiseMap(data)
    })
    .then(data => getExternalComposeProperties(data))
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function externalSaveHandler (req, res, next) {
  const hirerId = req.session.data.person
  const personId = req.params.personId

  const composeMessage = req.body.composeMessage
  const selectStyle = req.body.selectStyle
  const selectLength = req.body.selectLength
  const sendMessage = req.body.sendMessage

  const sentMessage = {composeMessage, selectStyle, selectLength, sendMessage}
  const data = {hirerId, personId, sentMessage}

  jobs
    .get(clone(req.session.data), req.params.jobSlug)
    .then(job => promiseMap(merge(data, job)))
    .then(data => sentExternal.post(data.person.id, data.job.id, data.personId, data.sentMessage))
    .then(result => getExternalComposeProperties(data))
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

router.get('/', ensureLoggedIn, jobsHandler)
router.get('/:jobSlug', ensureLoggedIn, jobHandler)
router.get('/:jobSlug/internal', ensureLoggedIn, internalHandler)
router.post('/:jobSlug/internal', ensureLoggedIn, internalSendHandler)
router.get('/:jobSlug/external', ensureLoggedIn, externalHandler)
router.get('/:jobSlug/external/:personId', ensureLoggedIn, externalComposeHandler)
router.post('/:jobSlug/external/:personId', ensureLoggedIn, externalSaveHandler)
router.get('*', (req, res) => {
  let data = getRenderDataBuilder(req)({})
  getRenderer(req, res)(data)
})

module.exports = router
