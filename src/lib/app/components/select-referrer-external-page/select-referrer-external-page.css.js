let { css, merge, mixins, variables } = require('../../lib/css')

const styles = {
  pageBody: {},
  pageHeadline: {},
  companyLink: mixins.deLink,
  pageContent: {},
  copy: mixins.typography.p,
  pageMain: {},
  pageMainNetwork: merge(mixins.pageLayout.pageMain, {
    paddingRight: `calc(${variables.sizing.sidebarWidth} + ${variables.padding.b})`
  }),
  network: merge(mixins.deList),
  networkSmall: merge({
    display: 'flex',
    flexWrap: 'wrap'
  }, mixins.deList),
  pageSidebar: {},
  nudjButton: mixins.button,
  continueButton: mixins.buttonSecondary
}

module.exports = css(merge(mixins.pageLayout, styles))
