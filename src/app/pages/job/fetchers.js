const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const { ErrorThenRedirect } = require('@nudj/framework/errors')

const common = require('../../server/modules/common')
const jobs = require('../../server/modules/jobs')
const externalMessages = require('../../server/modules/external-messages')
const internalMessages = require('../../server/modules/internal-messages')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../../server/modules/prismic')({accessToken, repo})
const prismicQuery = {
  'document.type': 'tooltip',
  'document.tags': ['jobsDashboard']
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

  const internalMessagesComplete = data.internalMessagesComplete.map(sent => {
    return merge(sent, {source: 'internal'})
  })

  // Concat and sort external and external
  const sentComplete = [].concat(externalMessagesComplete, internalMessagesComplete)
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

function compoundCount ({accumulator, current, compoundKey}) {
  if (!current || !current[compoundKey]) {
    return accumulator
  }

  const index = current[compoundKey]
  const existing = accumulator[index]
  accumulator[index] = existing ? existing + 1 : 1
  return accumulator
}

const get = ({
  data,
  params
}) => {
  return jobs.get(data, params.jobSlug)
    .then(data => externalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => internalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => jobs.getReferrals(data, data.job.id))
    .then(data => jobs.getApplications(data, data.job.id))
    .then(aggregateSent)
    .then(data => {
      if (!data.sentComplete.length) {
        throw new ErrorThenRedirect('No nudj\'s sent yet', `/jobs/${data.job.slug}/nudj`, 'for', data.company.name, '-', data.job.title)
      }
      return data
    })
    .then(addDataKeyValue('activities', data => jobs.getJobActivities(data, data.job.id)))
    .then(addDataKeyValue('tooltip', () => prismic.fetchContent(prismicQuery, true)))
}

module.exports = {
  get
}
