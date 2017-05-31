let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

module.exports = css(merge(mixins.pageLayout, {
  body: {
    flexGrow: 1,
    background: '#ececeb'
  },
  companyLink: mixins.deLink,
  recommendations: listStyle,
  content: {
    flex: 1,
    padding: `${variables.padding.e} ${variables.padding.d}`,
    display: 'flex'
  },
  main: {
    flex: 1
  },
  sidebar: mixins.pageLayout.pageSidebar
}))
