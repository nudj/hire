const get = require('lodash/get')
const { distanceInWordsToNow, differenceInSeconds } = require('date-fns')

function formattedModifiedDate (modified) {
  const difference = differenceInSeconds(new Date(), modified)
  return (difference < 120) ? 'just now' : `${distanceInWordsToNow(modified)} ago`
}

module.exports.formattedModifiedDate = formattedModifiedDate

function personNameFromHirerId (hirerId, context) {
  const hirers = get(context, 'hirers', [])
  const people = get(context, 'people', [])
  const you = get(context, 'person.id')

  const hirer = hirers.find(hirer => hirer.id === hirerId)
  const person = people.find(person => person.id === hirer.person)

  const personName = get(person, 'id') === you ? 'You' : `${get(person, 'firstName', '')} ${get(person, 'lastName', '')}`
  return personName
}

module.exports.personNameFromHirerId = personNameFromHirerId
