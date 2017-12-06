const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')

const multiplySizeVar = (size, multipler) => `${parseInt(size.replace('rem', ''), 10) * multipler}rem`

const styleSheet = StyleSheet.create({
  root: {
    backgroundColor: colors.greyLightest,
    height: '100%',
    textAlign: 'center',
    '@media (min-width: 37.5rem)': {
      textAlign: 'left'
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
    marginRight: 'auto',
    padding: sizes.largeIi
  },
  title: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.largeI,
    lineHeight: 1,
    color: colors.royalBlue
  },
  subtitle: {
    textAlign: 'center',
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.largeIi
  },
  stepCounter: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    '@media (min-width: 37.5rem)': {
      paddingBottom: sizes.largeI
    }
  },
  addCounter: {
    fontWeight: typography.fontWeight.bold
  },
  subheading: {
    marginTop: sizes.regular
  },
  body: {
    width: '100%'
  },
  actionBar: {
    backgroundColor: colors.white,
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    paddingTop: sizes.regular,
    paddingBottom: sizes.regular
  }
})

module.exports = styleSheet
