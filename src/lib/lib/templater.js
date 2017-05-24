const get = require('lodash/get')
const identity = require('lodash/identity')
const escapeHtml = require('escape-html')

const stripDelims = (tag) => tag.slice(2, -2)

module.exports.render = ({ template, data, tagify = identity }) => {
  let tags = template.match(/\{\{.*?\}\}/g) || []
  let order = template.match(/\{\{.*?\}\}|((?!(\{\{.*?\}\}))[^])+/g) || []
  let result = order.map((chunk) => {
    if (tags.includes(chunk)) {
      let result = get(data, stripDelims(chunk))
      return tagify(result !== undefined ? result : escapeHtml(chunk), !!result)
    } else {
      return escapeHtml(chunk)
    }
  })
  .join('')
  .replace(/(.)\n{2}(.)/g, '$1</p><p>$2')
  .replace(/(.)\n{2}/g, '$1</p>\n')
  .replace(/\n{2}(.)/g, '\n<p>$1')
  .replace(/\n/g, '<br />')
  return `<p>${result}</p>`
}
