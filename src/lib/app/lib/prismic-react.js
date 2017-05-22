const React = require('react')
const Prismic = require('prismic.io')
const omit = require('lodash/omit')

class PrismicModule {
  constructor (doc) {
    this.doc = this.convertDocument(doc)
  }

  createElement ({block, props, index}) {
    // `block.type` contains information about the element type
    if (typeof props.element === 'object' && props.element.$$typeof) {
      return (<props.element.type {...omit(props.element.props, ['element'])} {...omit(props, ['element'])} key={`${props.element.type}+${index}`}>{block.text}</props.element.type>)
    } else {
      return (<props.element {...omit(props, ['element'])} key={`${props.element}+${index}`}>{block.text}</props.element>)
    }
    // add a `key` property?
  }

  convertDocument (doc) {
    if (doc.get) {
      return doc
    }
    const {id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON} = doc
    const prismicDoc = new Prismic.Document(id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON)
    return prismicDoc
  }

  fragmentToReact ({fragment, props}) {
    const structuredText = this.doc.get(fragment)

    if (!structuredText.blocks || !Array.isArray(structuredText.blocks)) {
      console.log('HAS NO BLOCKS') // should return this?
      return []
    }

    const reactElements = structuredText.blocks.map((block, index) => this.createElement({block, props, index}))

    return reactElements
  }

  fragmentToText ({fragment}) {
    const prismicFragment = this.doc.get(fragment)

    if (!prismicFragment || !prismicFragment.blocks) {
      return ''
    }

    const text = prismicFragment.blocks.map(block => block.text || '')

    return text.join('\n\n')
  }
}

module.exports = PrismicModule
