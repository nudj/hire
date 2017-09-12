const express = require('express')
const get = require('lodash/get')
const find = require('lodash/find')
const _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const getTime = require('date-fns/get_time')
const {
  merge,
  promiseMap
} = require('@nudj/library')

const logger = require('../lib/logger')
const mailer = require('../lib/mailer')
const intercom = require('../lib/intercom')
const tags = require('../../lib/tags')
const gmail = require('../modules/gmail')
const assets = require('../modules/assets')
const common = require('../modules/common')
const employees = require('../modules/employees')
const hirers = require('../modules/hirers')
const internalMessages = require('../modules/internal-messages')
const jobs = require('../modules/jobs')
const network = require('../modules/network')
const people = require('../modules/people')
const surveys = require('../modules/surveys')
const externalMessages = require('../modules/external-messages')
const surveyMessages = require('../modules/survey-messages')
const tasks = require('../modules/tasks')
const tokens = require('../modules/tokens')
const employeeSurveys = require('../modules/employee-surveys')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../modules/prismic')({accessToken, repo})

const app = require('../../app/server')
const router = express.Router()

function spoofLoggedIn (req, res, next) {
  const data = require('../../../mocks/api/dummy-data')
  req.session.data = req.session.data || {
    hirer: find(data.hirers, { id: 'hirer1' }),
    person: find(data.people, { id: 'person5' }),
    company: find(data.companies, { id: 'company1' })
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
    data.web = {
      protocol: req.protocol,
      hostname: process.env.WEB_HOSTNAME
    }

    data.tasksIncomplete = tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id)

    return promiseMap({
      page: promiseMap(data)
    })
  }
}

function getErrorHandler (req, res, next) {
  return (error) => {
    try {
      const response = {}
      let responded
      logger.log('error', error.message, error)
      switch (error.message) {
        // renders with message
        case 'Invalid url':
          response.message = {
            code: 400,
            error: 'error',
            message: 'Form submission data invalid'
          }
          break
        // full page errors
        case 'Not found':
          response.error = {
            code: 404,
            type: 'error',
            message: 'Not found'
          }
          break
        case 'Unauthorized Google':
          res.status(401).send('Unauthorized Google')
          responded = true
          break
        default:
          response.error = {
            code: 500,
            type: 'error',
            message: 'Something went wrong'
          }
      }
      if (!responded) {
        Promise.resolve(merge(req.session.data, response))
          .then(getRenderDataBuilder(req, res, next))
          .then(getRenderer(req, res, next))
          .catch(error => next(error))
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
      res.set('Cache-Control', 'no-store')
      return res.json(data)
    }
    let staticContext = app(data)
    if (staticContext.url) {
      res.redirect(staticContext.url)
    } else {
      let status = get(data, 'page.error.code', staticContext.status || 200)
      let person = get(data, 'page.person')
      res.status(status).render('app', {
        data: JSON.stringify(data),
        css: staticContext.css,
        html: staticContext.html,
        helmet: staticContext.helmet,
        intercom_app_id: `'${process.env.INTERCOM_APP_ID}'`,
        fullname: person && person.firstName && person.lastName && `'${person.firstName} ${person.lastName}'`,
        email: person && `'${person.email}'`,
        created_at: person && (getTime(person.created) / 1000)
      })
    }
  }
}

function jobHasSent (data, hirer, jobId) {
  return Promise.all([
    externalMessages.getAll({}, hirer, jobId),
    internalMessages.getAll({}, hirer, jobId)
  ])
    .then(sentResults => {
      const externalMessages = sentResults[0].externalMessages
      const internalMessages = sentResults[1].internalMessages
      return Boolean(externalMessages.length || internalMessages.length)
    })
    .then(hasSent => merge(data, {hasSent}))
}

function jobsHaveSent (data) {
  data.jobs = Promise.all(data.jobs.map(job => jobHasSent(merge({}, job), data.hirer.id, job.id)))
  return promiseMap(data)
}

function jobsHandler (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['jobsDashboard']
  }

  jobs
    .getAll(merge(req.session.data))
    .then(data => jobsHaveSent(data))
    .then(data => {
      data.tooltip = prismic.fetchContent(prismicQuery, true)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function compoundCount ({accumulator, current, compoundKey}) {
  if (!current || !current[compoundKey]) {
    return accumulator
  }

  const index = current[compoundKey]
  const existing = accumulator[index]
  accumulator[index] = existing ? existing + 1 : 1
  return accumulator
}

function reduceChildrenFromParent ({accumulator, current, parentKey}) {
  const parentId = current[parentKey]
  if (!parentId) {
    return accumulator
  }
  if (!accumulator[parentId]) {
    accumulator[parentId] = []
  }
  accumulator[parentId].push(current.id)
  accumulator[parentId].sort()
  return accumulator
}

function childCompoundCounting (children, applicationCounts, referralCounts, family, initial) {
  return (children || []).reduce((accumulator, child) => {
    return childCompoundCounting(family[child], applicationCounts, referralCounts, family, {
      applications: accumulator.applications + (applicationCounts[child] || 0),
      referrals: accumulator.referrals + (referralCounts[child] || 0)
    })
  }, initial)
}

function compoundCounting ({family, familyTotals, parent, applicationCounts, referralCounts}) {
  const children = family[parent]
  const initial = {
    applications: applicationCounts[parent] || 0,
    referrals: referralCounts[parent] || 0
  }
  const totals = childCompoundCounting(children, applicationCounts, referralCounts, family, initial)
  familyTotals[parent] = totals
}

function aggregateSent (data) {
  const compoundKey = 'parent'

  // Get the parent -> children relationships
  const family = data.referrals.reduce((accumulator, current) => reduceChildrenFromParent({accumulator, current, parentKey: compoundKey}), {})

  // Count the total applications and referrals for each referralId
  const applicationCounts = data.applications.reduce((accumulator, current) => compoundCount({accumulator, current, compoundKey: 'referral'}), {})
  const referralCounts = data.referrals.reduce((accumulator, current) => compoundCount({accumulator, current, compoundKey}), {})

  // Count the compound number of referrals and applications for each referralId (include the counts of their decendents)
  const familyTotals = {}
  Object.keys(family).forEach(parent => compoundCounting({family, familyTotals, parent, applicationCounts, referralCounts}))

  const externalMessagesComplete = data.externalMessagesComplete.map(sent => {
    return merge(sent, {source: 'external'})
  })

  // All internal messages are complete
  const internalMessages = data.internalMessages.map(sent => {
    return merge(sent, {source: 'internal'})
  })

  // Concat and sort external and external
  const sentComplete = [].concat(externalMessagesComplete, internalMessages)
  sentComplete.sort(common.sortByModified)

  data.sentComplete = sentComplete.map(complete => {
    // there should be only one person per referral
    const referral = data.referrals.find(referral => referral.person === complete.id)
    const referralAggregate = referral && familyTotals[referral.id] ? familyTotals[referral.id] : {}
    const totalApplications = referralAggregate.applications || 0
    const totalReferrals = referralAggregate.referrals || 0
    return merge(complete, {totalApplications, totalReferrals})
  })

  return promiseMap(data)
}

function jobHandler (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['jobDashboard']
  }

  jobs
    .get(merge(req.session.data), req.params.jobSlug)
    .then(data => externalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => internalMessages.getAll(data, data.hirer.id, data.job.id))
    .then(data => jobs.getReferrals(data, data.job.id))
    .then(data => jobs.getApplications(data, data.job.id))
    .then(data => aggregateSent(data))
    .then(data => {
      if (!data.sentComplete.length) {
        return res.redirect(`/jobs/${data.job.slug}/nudj`)
      }
      data.activities = jobs.getJobActivities(data, data.job.id)
      return promiseMap(data)
        .then(data => {
          data.tooltip = prismic.fetchContent(prismicQuery, true)
          return promiseMap(data)
        })
        .then(getRenderDataBuilder(req, res, next))
        .then(getRenderer(req, res, next))
        .catch(getErrorHandler(req, res, next))
    })
    .catch(getErrorHandler(req, res, next))
}

function nudjHandler (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['jobDashboard']
  }

  jobs
    .get(merge(req.session.data), req.params.jobSlug)
    .then(data => externalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => internalMessages.getAll(data, data.hirer.id, data.job.id))
    .then(data => jobs.getReferrals(data, data.job.id))
    .then(data => jobs.getApplications(data, data.job.id))
    .then(data => {
      // Add internal later
      data.sentInternalComplete = []
      return promiseMap(data)
    })
    .then(data => aggregateSent(data))
    .then(data => {
      data.activities = jobs.getJobActivities(data, data.job.id)
      return promiseMap(data)
    })
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

function fetchExternalPrismicContent (data) {
  const dialogQuery = {
    'document.type': 'dialog',
    'document.tags': ['sendExternal']
  }
  const composeExternalTooltips = {
    'document.type': 'tooltip',
    'document.tags': ['sendExternal']
  }
  const composeExternalMessages = {
    'document.type': 'composemessage',
    'document.tags': ['external']
  }

  data.tooltips = prismic.fetchContent(composeExternalTooltips)
  data.messages = prismic.fetchContent(composeExternalMessages)
  data.dialog = prismic.fetchContent(dialogQuery, true)
  return promiseMap(data)
}

function internalMessageCreateAndMailUniqueLinkToRecipients (data, company, job, person, hirer, recipients, subject, template, type) {
  const sendMessages = recipients.map(recipient => internalMessageCreateAndMailUniqueLinkToRecipient(person, hirer, recipient, company, job, subject, template, type))
  data.messages = Promise.all(sendMessages)

  return promiseMap(data)
}

function internalMessageCreateAndMailUniqueLinkToRecipient (sender, hirer, recipient, company, job, subject, template, type) {
  const mailContent = {
    recipients: recipient,
    subject,
    template
  }
  const data = merge(mailContent, {
    company,
    job,
    hirer
  })
  // Find or create person from email
  // Create employee relation for this person
  // Get or create referral for this person
  // Append referral id to link
  return people.getByEmail(data, recipient)
    .then(data => employees.getOrCreateByPerson(data, data.person.id, company.id))
    .then(data => jobs.getReferralForPersonAndJob(data, data.person.id, job.id))
    .then(data => data.referral ? data : jobs.addReferral(data, job.id, data.person.id))
    .then(data => network.getRecipient(data, data.person.id))
    .then(data => people.get(data, sender.id))
    .then(data => {
      if (type === 'GMAIL') {
        return gmail.send(data, data.person.id, tags.internal)
      }
      return network.send(data, mailContent, tags.internal)
    })
}

function internalMessageHandler (req, res, next) {
  Promise.resolve(merge(req.session.data))
    .then(data => jobs.get(data, req.params.jobSlug))
    .then(fetchInternalPrismicContent)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function sendSavedInternalMessageHandler (req, res, next) {
  Promise.resolve(merge(req.session.data))
    .then(data => internalMessages.getById(data, req.params.messageId))
    .then(data => jobs.get(data, req.params.jobSlug))
    .then(data => internalMessages.getRecipientsEmailAdresses(data, data.internalMessage.recipients))
    .then(data => {
      const { subject, message, type } = data.internalMessage
      return internalMessageCreateAndMailUniqueLinkToRecipients(data, data.company, data.job, data.person, data.hirer, data.recipients, subject, message, type)
    })
    .then(data => {
      if (data.messages) {
        // successful send
        return tasks
          .completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
          .then(() => {
            req.session.notification = {
              type: 'success',
              message: 'That’s the way, aha aha, I like it! 🎉'
            }
            return res.redirect(`/jobs/${req.params.jobSlug}`)
          })
      }
      return fetchInternalPrismicContent(data)
        .then(getRenderDataBuilder(req, res, next))
        .then(getRenderer(req, res, next))
        .catch(getErrorHandler(req, res, next))
    })
    .catch(getErrorHandler(req, res, next))
}

function internalMessageSaveHandler (req, res, next) {
  const recipients = req.body.recipients.replace(/\s/g, '').split(',')
  const {
    subject,
    template,
    type
  } = req.body

  Promise.resolve(merge(req.session.data))
    .then(data => internalMessages.populateRecipients(data, recipients))
    .then(data => jobs.get(data, req.params.jobSlug))
    .then(data => internalMessages.post(data, data.hirer.id, data.job.id, data.recipients, subject, template, type))
    .then(data => {
      req.session.returnTo = `/jobs/${req.params.jobSlug}/internal/${data.savedMessage.id}`
      return internalMessageCreateAndMailUniqueLinkToRecipients(data, data.company, data.job, data.person, data.hirer, recipients, subject, template, type)
    })
    .then(data => {
      if (data.messages) {
      // successful send
        return tasks
          .completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
          .then(() => {
            req.session.notification = {
              type: 'success',
              message: 'That’s the way, aha aha, I like it! 🎉'
            }
            return res.redirect(`/jobs/${req.params.jobSlug}`)
          })
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
    .get(merge(req.session.data), req.params.jobSlug)
    .then(data => network.get(data, data.hirer.id, data.job.id))
    .then(data => externalMessages.getAll(data, data.hirer.id, data.job.id))
    .then(data => externalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => {
      data.networkSaved = data.externalMessages.map(person => person.id)
      data.networkSent = data.externalMessagesComplete.map(person => person.id)

      const referrerType = data.externalMessages.length ? 'notFirstTime' : 'firstTime'
      selectReferrersQuery['document.tags'].push(referrerType)

      data.tooltips = prismic.fetchContent(selectReferrersQuery)

      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function getExternalMessageProperties (data, messageId) {
  const composeExternalTooltips = {
    'document.type': 'tooltip',
    'document.tags': ['sendExternal']
  }
  const composeExternalMessages = {
    'document.type': 'composemessage',
    'document.tags': ['external']
  }

  return Promise.resolve(data)
    .then(data => {
      data.recipient = common.fetchPersonFromFragment(data.recipient.id)
      data.tooltips = prismic.fetchContent(composeExternalTooltips)
      data.messages = prismic.fetchContent(composeExternalMessages)
      return promiseMap(data)
    })
    .then(data => jobs.getReferralForPersonAndJob(data, data.recipient.id, data.job.id))
    .then(data => {
      if (!data.referral) {
        data.referral = jobs.addReferral(data, data.job.id, data.recipient.id)
      }
      return promiseMap(data)
    })
    .then(data => externalMessages.getById(data, messageId))
    .catch(error => {
      logger.log('error', error)
      throw new Error('Not found')
    })
}

function newExternalMessageHandler (req, res, next) {
  const recipient = req.params.recipientId

  Promise.resolve(merge(req.session.data))
    .then(data => jobs.get(merge(req.session.data), req.params.jobSlug))
    .then(data => network.getRecipient(data, recipient))
    .then(fetchExternalPrismicContent)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function getExternalMessageHandler (req, res, next) {
  const person = get(req, 'session.data.person.id')
  const recipient = req.params.recipientId

  jobs
    .get(merge(req.session.data), req.params.jobSlug)
    .then(data => network.getRecipient(data, recipient))
    .then(data => getExternalMessageProperties(data, req.params.messageId))
    .then(data => {
      if (data.externalMessage.sendMessage === 'GMAIL' && !data.externalMessage.sent) {
        return gmail.send(data, person, tags.external)
          .then(data => externalMessages.patch(data, data.externalMessage.id, {sent: true}))
      }
      return promiseMap(data)
    })
    .then(fetchExternalPrismicContent)
    .then(data => {
      let active = 0
      if (data.externalMessage.sendMessage) {
        active = 4
      } else if (data.externalMessage.composeMessage) {
        active = 3
      } else if (data.externalMessage.selectStyle) {
        active = 2
      } else if (data.externalMessage.selectLength) {
        active = 1
      }
      data.active = active
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function saveExternalMessageHandler (req, res, next) {
  const recipient = req.params.recipientId
  const composeMessage = req.body.composeMessage
  const selectStyle = req.body.selectStyle
  const selectLength = req.body.selectLength
  const sendMessage = req.body.sendMessage
  const externalMessage = {recipient, composeMessage, selectStyle, selectLength, sendMessage}

  Promise.resolve(merge(req.session.data))
    .then(data => jobs.get(data, req.params.jobSlug))
    .then(data => network.getRecipient(data, recipient))
    .then(data => externalMessages.post(data, data.hirer, data.job, data.recipient, externalMessage))
    .then(data => {
      if (!data.externalMessage) {
        throw new Error('No message saved!')
      }
      return res.redirect(`/jobs/${data.job.slug}/external/${data.recipient.id}/${data.externalMessage.id}`)
    })
    .catch(getErrorHandler(req, res, next))
}

function patchExternalMessageHandler (req, res, next) {
  const recipient = req.params.recipientId
  const composeMessage = req.body.composeMessage
  const selectStyle = req.body.selectStyle
  const selectLength = req.body.selectLength
  const sendMessage = req.body.sendMessage
  const messageId = req.params.messageId
  const externalMessage = {recipient, composeMessage, selectStyle, selectLength, sendMessage}
  const person = get(req, 'session.data.person.id')

  Promise.resolve(merge(req.session.data))
    .then(data => jobs.get(data, req.params.jobSlug))
    .then(data => network.getRecipient(data, recipient))
    .then(data => externalMessages.patch(data, messageId, externalMessage))
    .then(data => jobs.getOrCreateReferralForPersonAndJob(data, data.recipient.id, data.job.id))
    .then(data => {
      if (data.externalMessage.sendMessage === 'GMAIL' && !data.externalMessage.sent) {
        return gmail.send(data, person, tags.external)
          .then(data => externalMessages.patch(data, data.externalMessage.id, {sent: true}))
      }
      return promiseMap(data)
    })
    .then(data => {
      if (sendMessage) {
        return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
      }
      return promiseMap(data)
    })
    .then(fetchExternalPrismicContent)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function importContactsLinkedInHandler (req, res, next) {
  const data = merge(req.session.data)

  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['importContacts', 'linkedIn']
  }

  data.tooltip = prismic.fetchContent(prismicQuery, true)

  promiseMap(data)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function sendImportEmail (data) {
  const name = `${get(data, 'person.firstName', '')} ${get(data, 'person.lastName', '')}`
  const company = get(data, 'company.name', '')
  const location = get(data, 'asset.location', '')

  const subject = `${name} @ ${company} has uploaded their connections`
  const html = `You can download it from ${location}`
  const from = 'hello@nudj.co'
  const to = process.env.NUDJ_INTERNAL_NOTIFICATION_EMAIL

  mailer.send({from, to, subject, html})

  return promiseMap(data)
}

function importContactsLinkedInSaveHandler (req, res, next) {
  const data = merge(req.session.data)

  const assetType = 'CONTACTS_LINKEDIN'
  const person = data.person.id
  const asset = req.files.file.data
  const fileName = req.body.name

  const taskType = 'UNLOCK_NETWORK_LINKEDIN'
  const eventName = 'linkedin network uploaded'

  assets.post({data, asset, assetType, fileName, person})
    .then(data => sendImportEmail(data))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      return intercom.logEvent({
        event_name: eventName,
        email: data.person.email,
        metadata: {
          category: 'onboarding'
        }
      }).then(() => {
        req.session.notification = {
          type: 'success',
          message: 'Nice. We\'ll let you know as soon as we find someone worth asking.'
        }
        return res.redirect('/')
      })
    })
}

function fetchSurveyPrismicContent (data) {
  const composeQuery = {
    'document.type': 'composemessage',
    'document.tags': ['survey']
  }
  const dialogQuery = {
    'document.type': 'dialog',
    'document.tags': ['survey']
  }
  const tooltipQuery = {
    'document.type': 'tooltip',
    'document.tags': ['survey']
  }
  data.compose = prismic.fetchContent(composeQuery, true)
  data.dialog = prismic.fetchContent(dialogQuery, true)
  data.tooltip = prismic.fetchContent(tooltipQuery, true)
  return promiseMap(data)
}

function surveyPageHandler (req, res, next) {
  Promise.resolve(merge(req.session.data))
    .then(surveys.getSurveyForCompany)
    .then(fetchSurveyPrismicContent)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function surveyCreateAndMailUniqueLinkToRecipient (sender, recipient, company, subject, template, type, survey) {
  const recipients = recipient
  const mailContent = {recipients, subject, template}

  // Find person from email
  // Create employee relation for this person
  // Create token for `SURVEY_TYPEFORM_COMPLETE`
  // Append token to link
  return people.getOrCreateByEmail(mailContent, recipient)
    .then(data => employees.getOrCreateByPerson(data, data.person.id, company.id))
    .then(data => employeeSurveys.post(data, data.employee.id, survey.id))
    .then(data => network.getRecipient(data, data.employee.person))
    .then(data => {
      const tokenData = {
        employeeSurvey: data.newEmployeeSurvey.id
      }
      const tokenType = 'SURVEY_TYPEFORM_COMPLETE'
      return tokens.post(data, tokenType, tokenData)
    })
    .then(data => {
      const token = data.newToken
      const link = `${survey.link}?token=${token.token}`
      data.survey = merge({}, survey, {link})
      data.person = sender
      return promiseMap(data)
    })
    .then(data => {
      if (type === 'GMAIL') {
        return gmail.send(data, data.person.id, tags.survey)
      }
      return network.send(data, mailContent, tags.survey)
    })
}

function surveyCreateAndMailUniqueLinkToRecipients (data, recipients, subject, template, type) {
  const company = data.company
  const survey = data.survey

  const sendMessages = recipients.map(recipient => surveyCreateAndMailUniqueLinkToRecipient(data.person, recipient, company, subject, template, type, survey))

  data.messages = Promise.all(sendMessages)
    .then(messageResults => [].concat.apply([], messageResults || []))

  return promiseMap(data)
}

function sendSavedSurveyPageHandler (req, res, next) {
  const taskType = 'SEND_SURVEY_INTERNAL'
  const eventName = 'Survey sent'

  Promise.resolve(merge(req.session.data))
    .then(data => surveys.getSurveyForCompany(data))
    .then(data => surveyMessages.getById(data, req.params.messageId))
    .then(data => surveyMessages.getRecipientsEmailAdresses(data, data.surveyMessage.recipients))
    .then(data => {
      const { subject, message, type } = data.surveyMessage
      if (data.surveyMessage.sent) {
        req.session.notification = {
          type: 'error',
          message: 'You\'ve already sent this message.'
        }
        return res.redirect(`/survey-page`)
      }
      return surveyCreateAndMailUniqueLinkToRecipients(data, data.recipients, subject, message, type)
    })
    .then(data => surveyMessages.patch(data, data.surveyMessage.id, {sent: true}))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      if (data.messages && data.messages.length) {
        // successful send
        return intercom.logEvent({
          event_name: eventName,
          email: data.person.email,
          metadata: {
            category: 'onboarding'
          }
        }).then(() => {
          req.session.notification = {
            type: 'success',
            message: 'Great job! We’ll be in touch as soon as we hear back from your team.'
          }
          return res.redirect('/')
        })
      }
      return fetchSurveyPrismicContent(data)
        .then(getRenderDataBuilder(req, res, next))
        .then(getRenderer(req, res, next))
        .catch(getErrorHandler(req, res, next))
    })
    .catch(getErrorHandler(req, res, next))
}

function surveyPageSendHandler (req, res, next) {
  const taskType = 'SEND_SURVEY_INTERNAL'
  const eventName = 'Survey sent'
  const { subject, template, type } = req.body
  const recipients = req.body.recipients.replace(/\s/g, '').split(',')

  Promise.resolve(merge(req.session.data))
    .then(data => surveys.getSurveyForCompany(data))
    .then(data => surveyMessages.populateRecipients(data, recipients))
    .then(data => surveyMessages.post(data, data.hirer.id, data.survey.id, data.recipients, subject, template, type))
    .then(data => {
      req.session.returnTo = `/survey-page/${data.surveyMessage.id}`
      return promiseMap(data)
    })
    .then(data => surveyCreateAndMailUniqueLinkToRecipients(data, recipients, subject, template, type))
    .then(data => surveyMessages.patch(data, data.surveyMessage.id, {sent: true}))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      if (data.messages && data.messages.length) {
        // successful send
        return intercom.logEvent({
          event_name: eventName,
          email: data.person.email,
          metadata: {
            category: 'onboarding'
          }
        }).then(() => {
          req.session.notification = {
            type: 'success',
            message: 'Great job! We’ll be in touch as soon as we hear back from your team.'
          }
          return res.redirect('/')
        })
      }
      return fetchSurveyPrismicContent(data)
        .then(getRenderDataBuilder(req, res, next))
        .then(getRenderer(req, res, next))
        .catch(getErrorHandler(req, res, next))
    })
    .catch(getErrorHandler(req, res, next))
}

function tasksListHander (req, res, next) {
  const prismicQuery = {
    'document.type': 'tooltip',
    'document.tags': ['taskList']
  }

  const data = merge(req.session.data)

  tasks.getAllByHirerAndCompany(data, data.hirer.id, data.company.id)
    .then(data => hirers.getAllByCompany(data, data.company.id))
    .then(data => {
      data.people = common.fetchPeopleFromFragments(data.hirers)
      return promiseMap(data)
    })
    .then(data => {
      data.tooltip = prismic.fetchContent(prismicQuery, true)
      return promiseMap(data)
    })
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function ensureOnboarded (req, res, next) {
  if (!req.session.data.company.onboarded) {
    req.session.notification = {
      type: 'error',
      message: 'We\'re still getting your company set-up, so you can\'t access your jobs just yet. Need more information? Let us know.'
    }
    return res.redirect('/')
  }
  return next()
}

router.use(ensureLoggedIn)

router.get('/', tasksListHander)

router.get('/import-contacts', importContactsLinkedInHandler)
router.post('/import-contacts', importContactsLinkedInSaveHandler)

router.get('/survey-page', surveyPageHandler)
router.post('/survey-page', surveyPageSendHandler)
router.get('/survey-page/:messageId', sendSavedSurveyPageHandler)

router.get('/jobs', ensureOnboarded, jobsHandler)

router.get('/jobs/:jobSlug', ensureOnboarded, jobHandler)
router.get('/jobs/:jobSlug/nudj', ensureOnboarded, nudjHandler)

router.get('/jobs/:jobSlug/internal', ensureOnboarded, internalMessageHandler)
router.post('/jobs/:jobSlug/internal', ensureOnboarded, internalMessageSaveHandler)
router.get('/jobs/:jobSlug/internal/:messageId', ensureOnboarded, sendSavedInternalMessageHandler)

router.get('/jobs/:jobSlug/external', ensureOnboarded, externalHandler)
router.get('/jobs/:jobSlug/external/:recipientId', ensureOnboarded, newExternalMessageHandler)
router.post('/jobs/:jobSlug/external/:recipientId', ensureOnboarded, saveExternalMessageHandler)
router.get('/jobs/:jobSlug/external/:recipientId/:messageId', ensureOnboarded, getExternalMessageHandler)
router.patch('/jobs/:jobSlug/external/:recipientId/:messageId', ensureOnboarded, patchExternalMessageHandler)

router.get('*', (req, res) => {
  let data = getRenderDataBuilder(req)(merge(req.session.data))
  getRenderer(req, res)(data)
})

module.exports = router
