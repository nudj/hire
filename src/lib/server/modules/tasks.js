const request = require('../../lib/request')
const { merge } = require('../../lib')
const { promiseMap } = require('../lib')

function fetchTaskById (id) {
  return request(`tasks/filter?id=${id}`)
    .then(results => results.pop())
}

function fetchTasksByHirer (hirer) {
  return request(`tasks/filter?hirer=${hirer}`)
}

function fetchTasksByCompany (company) {
  return request(`tasks/filter?company=${company}`)
}

function fetchIncompleteTasksByHirerAndType (hirer, type) {
  return request(`tasks/filter?hirer=${hirer}&type=${type}`)
    .then(results => results.filter(result => !result.completed) || [])
}

function editTask (data) {
  const method = 'patch'
  return request(`tasks/${data.id}`, { data, method })
}

function completeTask (task, hirer) {
  const completed = hirer
  return editTask(merge(task, {completed}))
}

module.exports.getAllByCompany = function (data, company) {
  data.tasks = fetchTasksByCompany(company)
  return promiseMap(data)
}

module.exports.getAllByHirer = function (data, hirer) {
  data.tasks = fetchTasksByHirer(hirer)
  return promiseMap(data)
}

module.exports.getAllByHirerAndCompany = function (data, hirer, company) {
  data.tasks = Promise.all([
    fetchTasksByHirer(hirer),
    fetchTasksByCompany(company)
  ]).then(taskResults => [].concat.apply([], taskResults || []))

  return promiseMap(data)
}

module.exports.get = function (data, task) {
  data.task = fetchTaskById(task)
  return promiseMap(data)
}

module.exports.completeTaskByHirerAndType = function (data, hirer, type) {
  data.completedTasks = fetchIncompleteTasksByHirerAndType(hirer, type)
    .then(tasks => Promise.all(tasks.map(task => completeTask(task, hirer))))
  return promiseMap(data)
}
