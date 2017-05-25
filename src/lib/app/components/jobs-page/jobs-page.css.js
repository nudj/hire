let {
  css,
  merge,
  mixins
} = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

module.exports = css(merge(mixins.pageLayout, {
  upload: mixins.buttonSecondary,
  jobs: listStyle,
  nudj: mixins.button,
  tip: {
    background: '#fff',
    padding: '30px'
  },
  tipTitle: {
    color: '#002d72',
    marginTop: 0
  },
  tipParagraph: {
    margin: 0,
    marginTop: '1rem',
    ':first-child': {
      marginTop: 0
    }
  }
}))
