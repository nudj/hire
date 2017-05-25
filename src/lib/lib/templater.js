const React = require('react')
const get = require('lodash/get')
const without = require('lodash/without')
const identity = require('lodash/identity')
const escapeHtml = require('escape-html')

const stripDelims = (tag) => tag.slice(2, -2)

const tagifyParagraph = (para, data, tagify) => {
  let tags = para.match(/\{\{.*?\}\}/g) || []
  let order = para.match(/\{\{.*?\}\}|((?!(\{\{.*?\}\}))[^])+/g) || []
  let result = order.map((chunk, index) => {
    if (tags.includes(chunk)) {
      let result = get(data, stripDelims(chunk))
      return tagify(result !== undefined ? result : chunk, !!result, index)
    } else {
      return <span key={`chunk${index}`}>{chunk}</span>
    }
  })
  return result
}

module.exports.render = ({
  template,
  data,
  tagify = identity,
  pify
}) => {
  return without(template.split('\n'), '')
    .map((para) => tagifyParagraph(para, data, tagify))
    .map(pify)
}
