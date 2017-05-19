const React = require('react')

class PrismicModule {
  constructor ({document}) {
    this.document = document
  }

  createElement ({block, props}) {
    // `block.type` contains information about the element type
    if (typeof props.element === 'object' && props.element.$$typeof) {
      return (<props.element.type {...props.element.props} {...props}>{block.text}</props.element.type>)
    } else {
      return (<props.element {...props}>{block.text}</props.element>)
    }
    // add a `key` property?
  }

  fragmentToReact ({fragment, props}) {
    const structuredText = this.document.get(fragment)

    if (!structuredText.blocks || !Array.isArray(structuredText.blocks)) {
      console.log('HAS NO BLOCKS') // should return this?
      return []
    }

    const reactElements = structuredText.blocks.map(block => this.createElement({block, props}))

    return reactElements
  }

  fragmentToText ({fragment}) {
    const prismicFragment = this.document.get(fragment)

    if (!prismicFragment || !prismicFragment.blocks) {
      return ''
    }

    const text = prismicFragment.blocks.map(block => block.text || '')

    return text.join('\n\n')
  }
}

module.exports = PrismicModule
