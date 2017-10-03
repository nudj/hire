const Prismic = require('prismic.io')
const mapValues = require('lodash/mapValues')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const repoUrl = `https://${repo}.prismic.io/api`

function fetchContent ({
  type,
  tags = ['default'],
  keys = {}
}) {
  const query = {
    'document.type': type,
    'document.tags': tags
  }
  const request = Prismic.api(repoUrl, { accessToken })
    .then(api => queryDocuments({api, query}))
    .then(response => response.results.map(doc => {
      return mapValues(keys, value => fragmentToText(doc.get(`${type}.${value}`)))
    }))
    .catch(error => handleErrors(error))

  return request
}

function fragmentToText (fragment) {
  if (!fragment) {
    return ''
  }

  if (fragment.value && !fragment.blocks) {
    return fragment.value.toString()
  }

  if (!fragment.blocks) {
    return ''
  }

  const text = fragment.blocks.map(block => block.text || '')

  return text.join('\n\n')
}

function handleErrors (error) {
  console.error('error', error)
  // DO ERROR HANDLING
  // throw new Error(error)
}

function predicatesOperator (key) {
  switch (key) {
    case 'document.tags':
      return Prismic.Predicates.any
    default:
      return Prismic.Predicates.at
  }
}

function queryDocuments ({api, query}) {
  // An empty query SHOULD return all the documents // need to make sure this still happens // ?
  const prismicQuery = Object.keys(query).map(key => predicatesOperator(key)(key, query[key]))
  // calling api.query('') will return all documents
  return api.query(prismicQuery)
}

module.exports = { fetchContent }
