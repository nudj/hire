let request = require('../../lib/request')
let { promiseMap } = require('../lib')
const common = require('./common')

function fetchJob (data, jobSlug) {
  data.job = request(`jobs/${jobSlug}`)
  return promiseMap(data)
}

function fetchJobAndRecipients (data, jobSlug, recipients) {
  data.job = request(`jobs/${jobSlug}`)
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
  data.jobs = request(`jobs/filter?companyId=${data.company.id}&status=Published`)
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
  return fetchJobApplications(data, jobId)
}

module.exports.getReferrals = function (data, jobId) {
  return fetchJobReferrals(data, jobId)
}
