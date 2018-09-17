const Intercom = require('intercom-client')
const format = require('date-fns/format')
const logger = require('@nudj/framework/logger')
const libIntercom = require('@nudj/library/lib/analytics/intercom')
const intercom = new Intercom.Client({
  token: process.env.INTERCOM_ACCESS_TOKEN
})

function getBody ({ status, statusCode, body }) {
  const code = status || statusCode
  if (code !== 200) {
    throw new Error(`Intercom gone done broke: ${code}`)
  }
  return body
}

function getFirstFromResult (result) {
  return result.contacts[0]
}

function fetchLeadBy (filter) {
  return intercom.leads
    .listBy(filter)
    .then(getBody)
    .then(getFirstFromResult)
}

function createLead (data) {
  return intercom.leads
    .create(data)
    .then(getBody)
}

function updateUser (patch) {
  logger.log('info', 'updateUser', patch)
  return intercom.users
    .update(patch)
    .then(response => {
      logger.log('info', 'User updated', patch)
      return getBody(response)
    })
    .catch((error) => logger.log('error', 'Intercom', 'updateUser', patch, error))
}

function tagUser (user, tag) {
  return intercom.tags
    .tag({
      name: tag,
      users: [{
        id: user.id
      }]
    })
    .then(getBody)
    .then(() => user)
}

function createUniqueLeadAndTag (data, tag) {
  logger.log('info', 'createUniqueLeadAndTag', data, tag)
  return fetchLeadBy({ email: data.email })
    .then((user) => user || createLead(data))
    .then((user) => tagUser(user, tag))
    .then((user) => {
      logger.log('info', 'User created and tagged', data, tag)
      return user
    })
    .catch((error) => logger.log('error', 'Intercom', 'createUniqueLeadAndTag', data, tag, error))
}

const getTimestampInSeconds = () => format(new Date(), 'X')

function logEvent ({ event_name, email, metadata }) {
  logger.log('info', 'logEvent', event_name, email, metadata)
  return intercom.events.create({
    created_at: getTimestampInSeconds(),
    event_name,
    email,
    metadata
  })
  .catch((error) => logger.log('error', 'Intercom', 'logEvent', event_name, email, metadata, error))
}

const logNewJobToIntercom = async (data, body) => {
  try {
    const user = await libIntercom.user.getBy({
      email: data.user.email
    })

    await libIntercom.user.logEvent({
      user,
      event: {
        name: 'added job',
        metadata: {
          title: body.title
        }
      }
    })
  } catch (error) {
    logger.log('error', error)
  }
}

module.exports = {
  createUniqueLeadAndTag,
  logNewJobToIntercom,
  logEvent,
  updateUser
}
