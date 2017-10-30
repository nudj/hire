const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const baseHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: '0 0 auto',
  background: variables.colors.white,
  padding: `0 ${variables.padding.d}`,
  height: variables.padding.b,
  width: '100%'
}

const baseSub = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end'
}

module.exports = css({
  header: baseHeader,
  fixedHeader: merge(baseHeader, {
    position: 'fixed',
    zIndex: variables.zIndicies.header
  }),
  main: {

  },
  title: merge(mixins.headings.h6, {
    color: variables.colors.royalBlue,
    padding: `0 0 ${variables.padding.f} 0`
  }),
  subtitle: merge(mixins.headings.h8, {
    color: variables.colors.charcoal,
    textDecoration: 'none',
    margin: 0
  }),
  sub: baseSub,
  fixedSub: merge(baseSub, {
    position: 'relative',
    right: variables.sizing.buttonMinWidth
  })
})
