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
    padding: '0 20px',
    height: '80px',
    width: '100%'
  },
  main: {

  },
  title: merge(mixins.headings.h6, {
    color: variables.colors.royalBlue,
    margin: '0 0 3px'
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
