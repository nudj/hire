const isThisWeek = require('date-fns/is_this_week')
const differenceInCalendarWeeks = require('date-fns/difference_in_calendar_weeks')
const {
  merge,
  promiseMap
} = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')

function fetchJob (data, jobSlug) {
  data.job = request(`jobs/filter?slug=${jobSlug}`).then(jobs => jobs[0])
  return promiseMap(data)
}

function fetchJobAndRecipients (data, jobSlug, recipients) {
  data.job = request(`jobs/filter?slug=${jobSlug}`).then(jobs => jobs[0])
  data.recipients = common.fetchPeopleFromFragments(recipients)
  return promiseMap(data)
}

function fetchJobApplications (data, job) {
  data.applications = request(`applications/filter?job=${job}`)
  return promiseMap(data)
}

function fetchJobReferrals (data, job) {
  data.referrals = request(`referrals/filter?job=${job}`)
  return promiseMap(data)
}

function saveJobReferral (job, person) {
  const data = {job, person}
  const method = 'post'
  return request('referrals', { data, method })
}

function fetchJobs (data) {
  data.jobs = request(`jobs/filter?company=${data.company.id}&status=PUBLISHED`)
  return promiseMap(data)
}

function patchJobWith (patch) {
  return (data) => {
    data.job = request(`jobs/${data.job.id}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      data: patch
    })
    return promiseMap(data)
  }
}

function getJobActivity (dataCall, dataActivityKey) {
  const today = new Date()

  const activity = {
    lastWeek: 0,
    thisWeek: 0,
    total: 0,
    trend: 0
  }

  return dataCall.then(dataActivity => {
    const data = dataActivity[dataActivityKey]

    activity.total = data.length
    activity.thisWeek = data.filter(entry => isThisWeek(entry.created)).length
    activity.lastWeek = data.filter(entry => differenceInCalendarWeeks(entry.created, today) === -1).length

    if (activity.thisWeek < activity.lastWeek) {
      activity.trend = -1
    } else if (activity.thisWeek > activity.lastWeek) {
      activity.trend = 1
    }
    return activity
  })
}

function getJobActivities (data, job) {
  const applications = getJobActivity(fetchJobApplications({}, data.job.id), 'applications')
  const referrers = getJobActivity(fetchJobReferrals({}, data.job.id), 'referrals')

  // This is mocked for now
  const pageViews = {
    lastWeek: 0,
    thisWeek: 0,
    total: 0,
    trend: 0
  }

  const activities = { applications, referrers, pageViews }
  return promiseMap(activities)
}

module.exports.get = function (data, jobSlug) {
  return fetchJob(data, jobSlug)
}

module.exports.getAll = function (data) {
  return fetchJobs(data)
}

module.exports.patch = function (data, jobSlug, patch) {
  return fetchJob(data, jobSlug)
  .then(patchJobWith(patch))
}

module.exports.compose = function (data, jobSlug, recipients) {
  return fetchJobAndRecipients(data, jobSlug, recipients)
}

module.exports.getApplications = function (data, job) {
  data.applications = request(`applications/filter?job=${job}`)
    .then(applications => Promise.all(applications.map(application => {
      return common.fetchPersonFromFragment(application.person)
        .then(person => {
          const personDetails = {
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email
          }
          return merge(application, personDetails)
        })
    })))

  return promiseMap(data)
}

function transformReferralFragment (referral) {
  return common.fetchPersonFromFragment(referral.person)
    .then(person => {
      const personDetails = {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email
      }
      return merge(referral, personDetails)
    })
}

module.exports.getReferrals = function (data, job) {
  data.referrals = request(`referrals/filter?job=${job}`)
    .then(referrals => Promise.all(referrals.map(transformReferralFragment)))

  return promiseMap(data)
}

module.exports.getReferralsForPerson = function (data, person) {
  data.referrals = request(`referrals/filter?person=${person}`)
    .then(referrals => Promise.all(referrals.map(transformReferralFragment)))

  return promiseMap(data)
}

module.exports.getReferralForPersonAndJob = function (data, person, job) {
  data.referral = request(`referrals/filter?person=${person}&job=${job}`)
    .then(referrals => Promise.all(referrals.map(transformReferralFragment)))
    .then(referrals => referrals.pop())

  return promiseMap(data)
}

module.exports.getJobActivities = function (data, job) {
  return getJobActivities(data, job)
}

module.exports.addReferral = function (data, job, person) {
  data.referral = saveJobReferral(job, person)
  return promiseMap(data)
}

module.exports.getOrCreateReferralForPersonAndJob = function (data, person, job) {
  data.referral = request(`referrals/filter?person=${person}&job=${job}`)
    .then(referrals => Promise.all(referrals.map(transformReferralFragment)))
    .then(referrals => referrals.pop() || saveJobReferral(job, person))
  return promiseMap(data)
}
