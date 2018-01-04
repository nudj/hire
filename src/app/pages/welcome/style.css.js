const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const breakpoint = '56.25rem'

const styleSheet = StyleSheet.create({
  list: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    [`@media(min-width: ${breakpoint})`]: {
      display: 'flex',
      marginLeft: `-${sizes.smallIi}`,
      marginRight: `-${sizes.smallIi}`,
      alignItems: 'stretch'
    }
  },
  listItem: {
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    },
    [`@media(min-width: ${breakpoint})`]: {
      flexBasis: '33.33333%',
      paddingLeft: sizes.smallIi,
      paddingRight: sizes.smallIi,
      ':nth-child(1) ~ *': {
        marginTop: 0
      }
    }
  },
  card: {
    height: '100%'
  },
  listItemImage: {
    display: 'block',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '10.625rem',
    maxWidth: '10.625rem',
    width: '100%'
  },
  listItemHeading: {
    color: colors.primary,
    marginTop: sizes.regular
  },
  listItemBody: {
    marginTop: sizes.regular
  },
  button: {
    marginTop: sizes.largeIi
  }
})

module.exports = styleSheet
