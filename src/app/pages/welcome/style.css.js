const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const breakpoint = '56.25rem'

const styleSheet = StyleSheet.create({
  card: {
    height: '100%'
  },
  list: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    [`@media(min-width: ${breakpoint})`]: {
      marginTop: `-${sizes.smallIi}`,
      marginBottom: `-${sizes.smallIi}`,
      alignItems: 'stretch'
    }
  },
  listItem: {
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    },
    [`@media(min-width: ${breakpoint})`]: {
      paddingTop: sizes.smallIi,
      paddingBottom: sizes.smallIi,
      ':nth-child(1) ~ *': {
        marginTop: 0
      }
    }
  },
  listItemContainer: {
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left'
  }
})

module.exports = styleSheet
