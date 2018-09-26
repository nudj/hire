const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    position: 'relative',
    textAlign: 'left',
    overflow: 'hidden'
  },
  para: {
    '@media(min-width: 40.625rem)': {
      width: '100%',
      maxWidth: '66.66666%',
      marginLeft: 0,
      marginRight: 0
    }
  },
  image: {
    display: 'none',
    '@media(min-width: 50rem)': {
      display: 'block',
      position: 'absolute',
      right: sizes.largeIi,
      bottom: sizes.regular,
      left: 'auto',
      top: 'auto'
    }
  },
  action: {
    marginTop: sizes.regular
  },
  closeButton: {
    position: 'absolute',
    top: sizes.smallIi,
    right: sizes.smallIi,
    left: 'auto'
  }
})

module.exports = styleSheet
