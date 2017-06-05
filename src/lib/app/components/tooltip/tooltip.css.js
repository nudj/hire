let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

module.exports = css({
  tooltip: merge(mixins.cardStyle, {
    zIndex: variables.zIndicies.tooltip
  }),
  tooltipTitle: merge(mixins.typography.h5),
  tooltipText: merge(mixins.typography.p),
  tooltipIntercomButton: merge(mixins.button)
})
