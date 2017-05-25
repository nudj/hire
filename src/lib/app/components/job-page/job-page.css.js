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
  recommendations: listStyle,
  content: {
    flex: 1,
    padding: '10px 20px',
    display: 'flex'
  },
  main: {
    flex: 1
  },
  sidebar: {
    width: '420px',
    padding: '0 60px'
  },
  copyLink: mixins.buttonSecondary
}))
