let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const fieldStyle = {
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'flex-start'
}

const labelStyle = merge(mixins.headings.h7, {
  color: variables.colors.royalBlue,
  flexShrink: '0',
  paddingRight: variables.padding.d,
  width: variables.padding.a,
  alignSelf: 'center'
})

module.exports = css(merge(mixins.pageLayout, {
  inputWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  recipientsWrap: merge(mixins.cardStyle, fieldStyle, {
    minHeight: variables.padding.b,
    border: '0',
    margin: `0 0 ${variables.padding.e}`
  }),
  addLabel: labelStyle,
  messageLabel: merge(labelStyle, {
    alignSelf: 'flex-start'
  }),
  recipients: merge({
    flexGrow: '1'
  }, mixins.formElements.inputBoxBorderless),
  email: merge(mixins.cardStyle, {
  }),
  subjectWrap: merge(fieldStyle, {
    borderBottom: `${variables.sizing.baseBorderWidth} solid ${variables.colors.grey}`,
    paddingBottom: variables.padding.d,
    alignItems: 'center'
  }),
  subject: merge(mixins.formElements.inputBoxBorderless, mixins.headings.h4, {
    color: variables.colors.royalBlue,
    flexGrow: '1'
  }),
  editButton: mixins.buttonTertiary,
  doneButton: mixins.button,
  templateWrap: merge(fieldStyle, {
    alignItems: 'flex-start',
    paddingTop: variables.padding.d
  }),
  template: merge(mixins.formElements.inputBoxBorderless, {
    flexGrow: '1',
    padding: 0,
    lineHeight: variables.sizing.textEditorLineHeight
  }),
  errorLabel: {
    color: variables.colors.midRed,
    paddingBottom: variables.padding.e
  }
}))
