// @flow
const camelcase = require('camelcase')
const get = require('lodash/get')

type LinkedInContact = {
  'Email Address'?: string,
  'First Name'?: string,
  'Last Name'?: string,
  EmailAddress?: string,
  FirstName?: string,
  LastName?: string,
  Company?: string,
  Role?: string
}

const normaliseLinkedinContact = (contact: LinkedInContact) => {
  const normalisedContact = {}

  Object.keys(contact).forEach(key => {
    normalisedContact[camelcase(key)] = contact[key]
  })

  return normalisedContact
}

const linkedinToNudjPerson = (contact: LinkedInContact) => {
  const normalisedContact = normaliseLinkedinContact(contact)

  return {
    email: get(normalisedContact, 'emailAddress', ''),
    firstName: get(normalisedContact, 'firstName', ''),
    lastName: get(normalisedContact, 'lastName', ''),
    title: get(normalisedContact, 'position', ''),
    company: get(normalisedContact, 'company', '')
  }
}

const linkedinToNudjPeople = (contacts: Array<LinkedInContact>) =>
  contacts
    .map(linkedinToNudjPerson)
    .filter(person => person.email)
    .sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1
      } else {
        return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : 0
      }
    })

module.exports = {
  normaliseLinkedinContact,
  linkedinToNudjPerson,
  linkedinToNudjPeople
}
