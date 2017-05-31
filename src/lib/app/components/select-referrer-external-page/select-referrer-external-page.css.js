let { css, merge, mixins, variables } = require('../../lib/css')

const styles = {
  pageBody: {},
  pageHeadline: {},
  companyLink: mixins.deLink,
  pageContent: {},
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
  nudjButton: mixins.button
}

module.exports = css(merge(mixins.pageLayout, styles))
