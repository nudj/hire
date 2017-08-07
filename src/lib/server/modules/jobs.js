const isThisWeek = require('date-fns/is_this_week')
const differenceInCalendarWeeks = require('date-fns/difference_in_calendar_weeks')

const { merge } = require('../../lib')
let request = require('../../lib/request')
let { promiseMap } = require('../lib')
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

function fetchJobApplications (data, jobId) {
  data.applications = request(`applications/filter?jobId=${jobId}`)
  return promiseMap(data)
}

function fetchJobReferrals (data, jobId) {
  data.referrals = request(`referrals/filter?jobId=${jobId}`)
  return promiseMap(data)
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

  dataCall.then(dataActivity => {
    const data = dataActivity[dataActivityKey]

    activity.total = data.length
    activity.thisWeek = data.filter(entry => isThisWeek(entry.created)).length
    activity.lastWeek = data.filter(entry => differenceInCalendarWeeks(entry.created, today) === -1).length

    if (activity.thisWeek < activity.lastWeek) {
      activity.trend = -1
    } else if (activity.thisWeek > activity.lastWeek) {
      activity.trend = 1
    }
  })

  return activity
}

function getJobActivities (data, jobId) {
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

module.exports.getApplications = function (data, jobId) {
  data.applications = request(`applications/filter?jobId=${jobId}`)
    .then(applications => Promise.all(applications.map(application => {
      return common.fetchPersonFromFragment(application.personId)
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

module.exports.getReferrals = function (data, jobId) {
  data.referrals = request(`referrals/filter?jobId=${jobId}`)
    .then(referrals => Promise.all(referrals.map(referral => {
      return common.fetchPersonFromFragment(referral.personId)
        .then(person => {
          const personDetails = {
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email
          }
          return merge(referral, personDetails)
        })
    })))

  return promiseMap(data)
}

module.exports.getJobActivities = function (data, jobId) {
  return getJobActivities(data, jobId)
}
