const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const pageSetup = {
  height: '100%',
  backgroundColor: colors.greyLightest
}

const styleSheet = StyleSheet.create({
  html: pageSetup,
  pageBody: pageSetup,
  root: {
    height: '100%',
    textAlign: 'left'
  },
  wrapper: {
    maxWidth: '60rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    height: '100%'
  },
  body: {
    alignSelf: 'flex-end',
    width: '100%'
  },
  heading: {
    color: colors.primary
  },
  subheading: {
    marginTop: sizes.regular
  }
})

module.exports = styleSheet
