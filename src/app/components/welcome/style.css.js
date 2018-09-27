const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const breakpoint = '48.75rem'

const styleSheet = StyleSheet.create({
  body: {
    display: 'flex'
  },
  image: {
    display: 'none',
    [`@media(min-width: ${breakpoint})`]: {
      display: 'block',
      flexBasis: '50%',
      flexGrow: 1,
      marginRight: sizes.regular
    }
  },
  card: {
    textAlign: 'left',
    [`@media(min-width: ${breakpoint})`]: {
      flexBasis: '50%',
      flexGrow: 1,
      marginLeft: sizes.regular
    }
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: sizes.regular,
    alignItems: 'flex-end'
  },
  help: {
    textAlign: 'left',
    [`@media(min-width: ${breakpoint})`]: {
      width: '50%',
      flexGrow: 1,
      paddingLeft: sizes.regular
    }
  },
  subheading: {
    color: colors.primary,
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    }
  },
  questions: {
    paddingLeft: sizes.largeIi
  },
  questionsList: {
    marginTop: sizes.smallIi,
    marginBottom: 0,
    paddingLeft: 0,
    listStyleType: 'none'
  },
  questionsListItem: {
    display: 'inline',
    marginRight: sizes.regular
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-left'
  },
  optionTitle: {
    whiteSpace: 'nowrap'
  }
})

module.exports = styleSheet
