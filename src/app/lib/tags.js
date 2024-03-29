const get = require('lodash/get')
const { merge } = require('@nudj/library')

function getDataBuilderFor (tags, props) {
  return Object.keys(tags).reduce((data, tag) => {
    const keys = tag.split('.')
    const path = tags[tag]
    const getter = typeof path === 'string' ? data => get(data, path, '') : path
    let target = data
    keys.forEach((key, index) => {
      if (index + 1 === keys.length) {
        target[key] = getter(props)
      } else {
        target[key] = target[key] || {}
        target = target[key]
      }
    })
    return data
  }, {})
}

const internal = {
  'company.name': 'company.name',
  'job.bonus': 'job.bonus',
  'job.link': data => {
    const companySlug = get(data, 'company.slug', '')
    const jobSlug = get(data, 'job.slug', '')
    const referralId = get(data, 'referral.id', '')
    const link = `https://${get(data, 'web.hostname')}/jobs/${companySlug}+${jobSlug}`
    return referralId ? `${link}+${referralId}` : link
  },
  'job.title': 'job.title',
  'sender.firstname': 'person.firstName',
  'sender.lastname': 'person.lastName'
}

const external = merge(internal, {
  'recipient.firstname': 'recipient.firstName',
  'recipient.lastname': 'recipient.lastName'
})

const survey = {
  'company.name': 'company.name',
  'survey.link': 'survey.link',
  'sender.firstname': 'person.firstName',
  'sender.lastname': 'person.lastName'
}

module.exports = {
  getDataBuilderFor,
  internal,
  external,
  survey
}
