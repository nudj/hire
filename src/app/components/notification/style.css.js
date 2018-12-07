const { merge } = require('@nudj/library')

const {
  StyleSheet,
  colors,
  sizes,
  utilities,
  typography
} = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.grey,
    visibility: 'hidden',
    transition: 'visibility 150ms, transform 150ms ease-in-out',
    transform: 'translate3d(0, -100%, 0)',
    overflow: 'hidden',
    textAlign: 'center',
    borderTopLeftRadius: utilities.borderRadius,
    borderTopRightRadius: utilities.borderRadius,
    borderBottomLeftRadius: utilities.borderRadius,
    borderBottomRightRadius: utilities.borderRadius,
    marginBottom: sizes.regular,
    // TODO: Scalable zIndex implementation
    zIndex: 10
  },
  info: {
    backgroundColor: colors.primary
  },
  warn: {
    backgroundColor: colors.warning
  },
  error: {
    backgroundColor: colors.danger
  },
  success: {
    backgroundColor: colors.success
  },
  message: merge(typography.type.regular, {
    flex: 1,
    paddingTop: sizes.smallI,
    paddingBottom: sizes.smallI,
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    color: colors.white,
    '@media(min-width: 30rem)': merge(typography.type.regular, {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    })
  }),
  close: {
    backgroundColor: 'transparent',
    border: 0,
    display: 'block',
    cursor: 'pointer',
    color: colors.white,
    alignSelf: 'stretch',
    paddingTop: sizes.smallI,
    paddingBottom: sizes.smallI,
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    ':active': {
      outline: 'none',
      border: 'none'
    },
    ':focus': {
      outline: 'none',
      border: 'none'
    },
    '@media(min-width: 30rem)': merge(typography.type.regular, {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    })
  },
  closeIcon: {
    display: 'block'
  },
  visible: {
    visibility: 'visible',
    transform: 'translate3d(0, 0, 0)',
    boxShadow: utilities.boxShadow[10].narrow
  }
})

module.exports = styleSheet
