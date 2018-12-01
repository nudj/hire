const { StyleSheet, colors, typography, sizes } = require('@nudj/components/styles')

const stylesheet = StyleSheet.create({
  form: {
    textAlign: 'center',
    marginTop: 0
  },
  card: {
    textAlign: 'left'
  },
  fieldLabel: {
    ...typography.type.largeI,
    color: colors.primary
  },
  field: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  textarea: {
    minHeight: '12rem',
    width: '100%',
    height: '100%'
  },
  modalWindow: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  modalPara: {
    marginTop: '1rem',
    ':first-child': {
      marginTop: 0
    }
  },
  buttonList: {
    marginTop: '2rem'
  },
  button: {
    marginLeft: '1rem',
    ':first-child': {
      marginLeft: 0
    }
  }
})

module.exports = stylesheet
