const {
  StyleSheet,
  sizes,
  colors,
  typography
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  main: {
    position: 'relative'
  },
  instructionPanel: {
    backgroundColor: colors.white,
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0,
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    display: 'flex',
    alignItems: 'center'
  },
  instructionContent: {
    ...typography.type.largeIi,
    flexGrow: 1,
    paddingLeft: sizes.largeI,
    paddingRight: sizes.largeI,
    paddingTop: sizes.largeI,
    paddingBottom: sizes.largeI
  },
  instructionActionsContainer: {
    flexGrow: 0,
    paddingLeft: sizes.largeI,
    paddingRight: sizes.largeI,
    paddingTop: sizes.largeI,
    paddingBottom: sizes.largeI
  },
  video: {
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

module.exports = styleSheet
