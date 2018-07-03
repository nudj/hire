const createHash = require('hash-generator')

const { render } = require('./templater')

const brify = () => '\n\n'

const compilePrismicTemplate = (template, data) => render({
  template,
  splitter: createHash(16),
  brify,
  data
})[0].join('')

module.exports = compilePrismicTemplate
