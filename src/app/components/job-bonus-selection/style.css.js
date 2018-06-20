const { StyleSheet, typography, sizes } = require('@nudj/components/lib/css')

const stylesheet = StyleSheet.create({
  cardInput: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: '100%'
  },
  presetInput: {
    marginTop: sizes.regular
  },
  valueInput: {
    marginTop: sizes.smallIi
  },
  input: {
    borderWidth: 0
  },
  currencyRadioWrapper: {
    flexBasis: '25%'
  },
  currencyIcon: {
    ...typography.type.largeI,
    fontWeight: typography.fontWeight.bold,
    display: 'block'
  },
  currencyLabel: {
    ...typography.type.smallIi,
    fontWeight: typography.fontWeight.bold,
    display: 'block',
    marginTop: sizes.smallIii
  },
  presetRadioWrapper: {
    flexBasis: '33.3333%'
  }
})

module.exports = stylesheet
