const get = require('lodash/get')
const without = require('lodash/without')
const identity = require('lodash/identity')
const { stripDelims } = require('.')

const tagifyParagraph = (para, data, tagify, chunkify) => {
  let tags = para.match(/\{\{.*?\}\}/g) || []
  let order = para.match(/\{\{.*?\}\}|((?!(\{\{.*?\}\}))[^])+/g) || []
  let result = order.map((chunk, index) => {
    if (tags.includes(chunk)) {
      let result = get(data, stripDelims(chunk))
      return tagify(result !== undefined ? result : chunk, !!result, index)
    } else {
      return chunkify(chunk, index)
    }
  })
  return result
}

module.exports.render = ({
  template,
  data,
  tagify = identity,
  pify = identity,
  chunkify = identity,
  splitter = '\n'
}) => {
  return without(template.split(splitter), '')
    .map((para) => tagifyParagraph(para, data, tagify, chunkify))
    .map(pify)
}
