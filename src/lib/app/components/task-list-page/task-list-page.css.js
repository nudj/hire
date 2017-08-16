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
  jobs: listStyle,
  taskGroupTitle: merge(mixins.typography.h6, {
    padding: `0 0 0 ${variables.padding.d}`
  }),
  taskGroupTitleHighlight: mixins.highlightColour,
  completedVisibleButton: merge(mixins.buttonSecondary, {
    margin: `0 0 0 ${variables.padding.d}`
  })
}))
