const some = require('lodash/some')
const filter = require('lodash/filter')
const isEmail = require('validator/lib/isEmail')
const { stripDelims } = require('.')

const tagRegex = /\{\{.*?\}\}/g

const isNotOfType = (type) => (value) => typeof value !== type // eslint-disable-line valid-typeof
const hasNoLength = (value) => !value.length
const isNotEmailList = (value) => some(filter(value.replace(/\s/g, '').split(','), (val) => val !== ''), (email) => !isEmail(email))
const containsUnpermittedTags = (value, permittedTags) => some(value.match(tagRegex), (tag) => !permittedTags.includes(stripDelims(tag)))

module.exports = {
  emails: {
    recipients: (value) => (
      isNotOfType('string')(value) ||
      hasNoLength(value) ||
      isNotEmailList(value)
    ) && 'Please enter at least one valid email',
    subject: (value) => (
      isNotOfType('string')(value) ||
      hasNoLength(value)
    ) && 'Please enter a subject',
    template: (value, { permittedTags }) => (
      isNotOfType('string')(value) ||
      hasNoLength(value) ||
      containsUnpermittedTags(value, permittedTags)
    ) && 'Please enter a message ensuring all tags are correct'
  }
}
