const some = require('lodash/some')
const filter = require('lodash/filter')
const isEmail = require('validator/lib/isEmail')

const tagRegex = /\{\{.*?\}\}/g
const permittedTags = [
  '{{refereeName}}',
  '{{job.title}}',
  '{{job.bonus}}',
  '{{companyName}}',
  '{{link}}',
  '{{personName}}'
]

const isNotOfType = (type) => (value) => typeof value !== type
const hasNoLength = (value) => !value.length
const isNotEmailList = (value) => some(filter(value.replace(' ', '').split(','), (val) => val !== ''), (email) => !isEmail(email))
const containsUnpermittedTags = (value) => some(value.match(tagRegex), (tag) => !permittedTags.includes(tag))

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
    message: (value) => (
      isNotOfType('string')(value) ||
      hasNoLength(value) ||
      containsUnpermittedTags(value)
    ) && 'Please enter a message ensuring all tags are correct'
  }
}
