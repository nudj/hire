let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const tag = {
  color: variables.colors.royalBlue,
  background: variables.colors.grey,
  borderRadius: variables.sizing.baseBorderRadius,
  padding: `${variables.sizing.baseBorderWidth} calc(${variables.sizing.baseBorderWidth} * 4)`,
  whiteSpace: 'nowrap'
}
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
  jobLink: {
    color: variables.colors.royalBlue,
    textDecoration: 'none'
  },
  copy: merge(mixins.typography.p, {
    marginLeft: variables.padding.d,
    width: '75%'
  }),
  companyLink: mixins.deLink,
  submit: mixins.button,
  chunk: {},
  para: {
    lineHeight: variables.sizing.textEditorLineHeight,
    margin: `${variables.sizing.textEditorLineHeight} 0 0 0`,
    ':first-child': {
      marginTop: 0
    }
  },
  tagOk: tag,
  tagError: merge(tag, {
    background: variables.colors.lightPink,
    color: variables.colors.darkPink
  }),
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
