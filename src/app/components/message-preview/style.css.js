const { StyleSheet, colors, sizes, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: sizes.regular,
    paddingTop: sizes.regular,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    textAlign: 'left',
    textDecoration: 'none',
    ':hover': {
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    }
  },
  leftContainer: {
    flexShrink: 0,
    paddingRight: sizes.regular
  },
  centerContainer: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  rightContainer: {
    paddingLeft: sizes.regular,
    flexShrink: 0
  },
  indicator: {
    backgroundColor: 'transparent',
    borderRadius: '100%',
    height: sizes.smallIi,
    width: sizes.smallIi
  },
  unreadIndicator: {
    backgroundColor: colors.success
  },
  unreadText: {
    fontWeight: typography.fontWeight.bold
  },
  recipient: {
    lineHeight: 1,
    color: colors.primary,
    fontWeight: typography.fontWeight.regular
  },
  subject: {
    lineHeight: 1,
    color: colors.text,
    marginTop: sizes.smallIi
  },
  body: {
    lineHeight: 1,
    color: colors.text,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: sizes.smallIi
  },
  chevron: {
    transform: 'rotate(90deg)',
    color: colors.grey
  }
})

module.exports = styleSheet
