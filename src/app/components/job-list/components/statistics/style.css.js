const { StyleSheet, sizes } = require('@nudj/components/styles')

const breakpoint = '41.176470588rem'

const styleSheet = StyleSheet.create({
  statisticsList: {
    [`@media(min-width: ${breakpoint})`]: {
      display: 'flex',
      marginLeft: `-${sizes.smallIi}`,
      marginRight: `-${sizes.smallIi}`,
      alignItems: 'stretch'
    }
  },
  statisticItem: {
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    },
    [`@media(min-width: ${breakpoint})`]: {
      flexBasis: '33.33333%',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':nth-child(1) ~ *': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
