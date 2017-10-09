const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const mainNetworkPaddingRight = `calc(${variables.sizing.sidebarWidth} + ${variables.padding.b} + ${variables.padding.e})`

const styles = {
  pageBody: {},
  pageHeadline: {},
  companyLink: mixins.deLink,
  pageContent: {},
  copy: mixins.typography.p,
  pageMain: {},
  pageMainNetwork: merge(mixins.pageLayout.pageMain, {
    [mixins.breakpoints.l]: {
      paddingRight: mainNetworkPaddingRight
    }
  }),
  network: merge(mixins.deList),
  networkSmall: merge({
    display: 'flex',
    flexWrap: 'wrap'
  }, mixins.deList),
  pageSidebar: {
    [mixins.breakpoints.l]: {
      paddingBottom: variables.padding.a
    }
  },
  nudjButton: mixins.button,
  continueButton: mixins.buttonSecondary,
  sectionDivider: merge(mixins.sectionDivider, {
    [mixins.breakpoints.l]: {
      margin: `0 ${mainNetworkPaddingRight} 0 ${variables.padding.d}`
    }
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
