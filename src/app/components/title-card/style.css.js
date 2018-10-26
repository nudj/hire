const { StyleSheet, sizes, colors, typography } = require('@nudj/components/styles')

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
    paddingRight: sizes.largeI,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.largeI
  },
  body: {
    textAlign: 'left',
    paddingTop: sizes.largeI,
    paddingRight: sizes.largeI,
    paddingBottom: sizes.largeI,
    paddingLeft: sizes.largeI
  },
  actionList: {
    paddingTop: 0
  },
  actionListActions: {
    marginTop: 0
  }
})

module.exports = styleSheet
