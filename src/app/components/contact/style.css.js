const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center'
  },
  details: {
    flexBasis: '100%',
    flexGrow: 1
  },
  children: {
    flexShrink: 1,
    marginLeft: sizes.regular
  },
  name: {
    color: colors.primary
  },
  job: {
    display: 'inline-block',
    fontWeight: typography.fontWeight.bold,
    color: colors.midRed,
    marginRight: sizes.regular
  },
  email: {
    display: 'inline-block',
    color: colors.text
  },
  tagContainer: {
    marginTop: sizes.smallIi
  },
  metaTitle: {
    ...typography.type.smallIi,
    fontWeight: typography.fontWeight.bold,
    color: colors.text
  },
  tagGroup: {
    paddingTop: sizes.smallIii
  }
})

module.exports = styleSheet
