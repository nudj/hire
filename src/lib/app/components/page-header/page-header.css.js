let {
  css,
  variables,
  mixins,
  merge
} = require('../../lib/css')

module.exports = css({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 auto',
    background: variables.colors.white,
    padding: `0 ${variables.padding.d}`,
    height: variables.padding.b
    width: '100%' // ?
  },
  main: {

  },
  title: merge(mixins.headings.h6, {
    color: variables.colors.royalBlue
  }),
  subtitle: merge(mixins.headings.h8, {
    color: variables.colors.charcoal,
    textDecoration: 'none',
    margin: 0
  }),
  sub: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})
