const { StyleSheet, sizes, typography } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  basketContainer: {
    verticalAlign: 'middle'
  },
  fullBasket: {
    display: 'none',
    '@media(min-width: 45.125rem)': {
      display: 'inline'
    }
  },
  smallBasket: {
    fontWeight: typography.fontWeight.bold,
    '@media(min-width: 45.125rem)': {
      display: 'none'
    }
  },
  buttonContainer: {
    alignSelf: 'center',
    textAlign: 'right',
    whiteSpace: 'nowrap'
  },
  basketItem: {
    maxWidth: '8.25rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    ':nth-child(n+2)': {
      marginLeft: sizes.smallIi
    }
  }
})

module.exports = styleSheet
