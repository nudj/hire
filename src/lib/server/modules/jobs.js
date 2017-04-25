let isURL = require('validator/lib/isURL')
let logger = require('../lib/logger')
let fetch = require('../lib/fetch')

function promiseMap (promiseObj) {
  let promiseArr = []
  let keyMap = {}
  Object.keys(promiseObj).forEach((key, i) => {
    keyMap[i] = key
    promiseArr[i] = promiseObj[key]
  })
  return Promise.all(promiseArr).then((resolvedArr) => {
    return resolvedArr.reduce((resolvedObj, v, i) => {
      resolvedObj[keyMap[i]] = v
      return resolvedObj
    }, {})
  })
}

function fetchCompany (loggedInPerson, companySlug) {
  return promiseMap({
    person: loggedInPerson,
    company: fetch(`companies/${companySlug}`)
  })
}

function fetchCompanyAndJob (loggedInPerson, companySlug, jobSlug) {
  return promiseMap({
    person: loggedInPerson,
    company: fetch(`companies/${companySlug}`),
    job: fetch(`jobs/${jobSlug}`)
  })
}

function fetchJob (jobSlug) {
  return fetch(`jobs/${jobSlug}`)
}

function fetchJobs (data) {
  data.published = fetch(`jobs?companyId=${data.company.id}&status=Published`)
  data.archived = fetch(`jobs?companyId=${data.company.id}&status=Archived`)
  return promiseMap(data)
}

function fetchRecommendations (data) {
  data.recommendations = fetch(`recommendations?job=${data.job.id}`)
  return promiseMap(data)
}

function convertToPeople (key) {
  return (data) => {
    data[key] = Promise.all(data[key].map((rec) => fetch(`people/${rec.personId}`)))
    return promiseMap(data)
  }
}

function patchJobWith (patch) {
  return (job) => {
    return fetch(`jobs/${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    })
  }
}

module.exports.get = function (loggedInPerson, companySlug, jobSlug) {
  return fetchCompanyAndJob(loggedInPerson, companySlug, jobSlug)
  .then(fetchRecommendations)
  .then(convertToPeople('recommendations'))
}

module.exports.getAllForCompany = function (loggedInPerson, companySlug) {
  return fetchCompany(loggedInPerson, companySlug)
  .then(fetchJobs)
}

module.exports.patch = function (jobSlug, patch) {
  return fetchJob(jobSlug)
  .then(patchJobWith(patch))
}

module.exports.compose = function (loggedInPerson, companySlug, jobSlug, recipients) {
  return fetchCompanyAndJob(loggedInPerson, companySlug, jobSlug)
  .then((data) => Object.assign(data, { recipients: recipients.map((id) => ({ personId: id })) }))
  .then(convertToPeople('recipients'))
}
