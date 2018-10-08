const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  card: {
    padding: '0'
  },
  title: {
    ...typography.type.largeI,
    textAlign: 'left',
    color: colors.greyDarker,
    borderBottom: `1px solid ${colors.greyLight}`,
    paddingTop: sizes.regular,
    paddingLeft: sizes.largeI,
    paddingBottom: sizes.regular
  },
  body: {
    textAlign: 'left',
    paddingTop: sizes.largeI,
    paddingRight: sizes.largeI,
    paddingBottom: sizes.largeI,
    paddingLeft: sizes.largeI
  }
})

module.exports = styleSheet
