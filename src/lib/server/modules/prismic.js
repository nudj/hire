const Prismic = require('prismic.io')

class PrismicModule {
  constructor ({accessToken, repo}) {
    this.accessToken = accessToken
    this.repo = repo
    this.repoUrl = `https://${this.repo}.prismic.io/api`
  }

  fetchContent (documentQuery = {}) {
    const request = Prismic.api(this.repoUrl, {accessToken: this.accessToken})
      .then(api => this.queryDocuments({api, documentQuery}))
      .then(response => {
        // Just returns the first one - works ok for now, but not so great
        // Also need to work out what happens if no results
        // look at using lodash?
        return response.results[0]
      })
      .catch(error => this.handleErrors(error))

    return request
  }

  handleErrors (error) {
    console.error('error', error)
    // DO ERROR HANDLING
    // throw new Error(error)
  }

  queryDocuments ({api, documentQuery}) {
    // An empty query SHOULD return all the documents // need to make sure this still happens // ?
    const prismicQuery = Object.keys(documentQuery).map(key => Prismic.Predicates.at(key, documentQuery[key]))
    // calling api.query('') will return all documents
    return api.query(prismicQuery)
  }
}

module.exports = (...args) => new PrismicModule(...args)
