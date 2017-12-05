const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const multiplySizeVar = (size, multipler) =>
  `${parseInt(size.replace('rem', ''), 10) * multipler}rem`

const styleSheet = StyleSheet.create({
  root: {
    backgroundColor: colors.greyLightest,
    height: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      textAlign: 'center'
    }
  },
  wrapper: {
    maxWidth: '60rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    height: '100%',
    '@media (min-width: 37.5rem)': {
      paddingTop: multiplySizeVar(sizes.largeIii, 2),
      paddingBottom: multiplySizeVar(sizes.largeIii, 2)
    }
  },
  header: {
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heading: {
    color: colors.primary
  },
  subheading: {
    marginTop: sizes.regular
  },
  body: {
    width: '100%'
  }
})

module.exports = styleSheet
