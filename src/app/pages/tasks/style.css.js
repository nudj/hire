const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

module.exports = css(merge(mixins.pageLayout, {
  jobs: listStyle,
  taskGroupTitle: mixins.typography.h6,
  taskGroupTitleHighlight: mixins.highlightColour,
  completedVisibleButton: mixins.buttonSecondary,
  incompleteEmpty: mixins.typography.p,
  pageSidebar: {
    [mixins.breakpoints.l]: {
      paddingTop: '40px'
    }
  }
}))
