let {
  css,
  merge,
  mixins
} = require('../../lib/css')

module.exports = css({
  tooltip: mixins.cardStyle,
  tooltipTitle: merge(mixins.typography.h5),
  tooltipText: merge(mixins.typography.p),
  tooltipIntercomButton: merge(mixins.button)
})
