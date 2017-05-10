let request = require('../lib/request')

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
    company: request(`companies/${companySlug}`)
  })
}

function fetchCompanyAndJob (loggedInPerson, companySlug, jobSlug) {
  return promiseMap({
    person: loggedInPerson,
    company: request(`companies/${companySlug}`),
    job: request(`jobs/${jobSlug}`)
  })
}

function fetchJob (jobSlug) {
  return request(`jobs/${jobSlug}`)
}

function fetchJobs (data) {
  data.published = request(`jobs?companyId=${data.company.id}&status=Published`)
  data.archived = request(`jobs?companyId=${data.company.id}&status=Archived`)
  return promiseMap(data)
}

function fetchRecommendations (data) {
  data.recommendations = request(`recommendations?job=${data.job.id}`)
  return promiseMap(data)
}

function convertToPeople (key) {
  return (data) => {
    data[key] = Promise.all(data[key].map((rec) => request(`people/${rec.personId}`)))
    return promiseMap(data)
  }
}

function patchJobWith (patch) {
  return (job) => {
    return request(`jobs/${job.id}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    })
  }
}

module.exports.fetchJob = fetchJob

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
