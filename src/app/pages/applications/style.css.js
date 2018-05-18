const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  listHeading: {
    display: 'flex',
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    flexDirection: 'column',
    textAlign: 'left',
    '@media(min-width: 37.5rem)': {
      paddingLeft: 0,
      paddingRight: 0,
      flexDirection: 'row'
    }
  },
  listTitle: {
    alignSelf: 'flex-start',
    '@media(min-width: 37.5rem)': {
      alignSelf: 'center'
    }
  },
  listMeta: {
    alignSelf: 'flex-start',
    marginTop: sizes.smallIii,
    '@media(min-width: 37.5rem)': {
      marginTop: 0,
      alignSelf: 'center'
    }
  }
})

module.exports = styleSheet
