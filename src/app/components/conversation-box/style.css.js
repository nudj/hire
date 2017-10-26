const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  conversationBoxContainer: {
    padding: `${variables.padding.b} ${variables.padding.de}`,
    margin: `0 ${variables.padding.a}`,
    paddingBottom: '0px'
  },
  conversationBox: {
    backgroundColor: variables.colors.lighterGrey,
    borderRadius: variables.sizing.baseBorderRadius,
    minHeight: '70vh',
    position: 'relative'
  },
  nameSection: {
    padding: '15px 10px 0',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  messageDate: merge(mixins.headings.small, {
    padding: '0 10px 0'
  }),
  message: {
    display: 'inline-block',
    maxWidth: '60%',
    paddingBottom: '5px'
  },
  messageTextarea: merge(mixins.formElements.inputBoxBorderless, {
    height: '20rem',
    minHeight: '61px',
    padding: `${variables.padding.d}`,
    resize: 'none',
    display: 'inline',
    width: '100%'
  }),
  messageBody: merge(mixins.typography.p, {
    padding: '15px 20px 1px',
    borderRadius: variables.sizing.messageBorderRadius,
    boxShadow: `0px 5px 10px ${variables.colors.genericBoxShadow}`,
    margin: '5px',
    clear: 'both'
  }),
  name: merge(mixins.headings.small, {
    display: 'block'
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 auto',
    background: variables.colors.white,
    padding: `${variables.padding.de} ${variables.padding.d}`,
    height: variables.padding.b,
    width: '100%'
  },
  messageInputContainer: {
    display: 'flex',
    width: '100%',
    minHeight: '61px',
    backgroundColor: variables.colors.white,
    padding: `0 ${variables.padding.de}`,
    position: 'sticky',
    bottom: '0'
  },
  title: merge(mixins.headings.h6, {
    color: variables.colors.royalBlue,
    padding: `0 0 ${variables.padding.f} 0`
  }),
  subtitle: merge(mixins.headings.h8, {
    color: variables.colors.charcoal,
    textDecoration: 'none',
    margin: 0
  }),
  textareaContainer: {
    flex: 10
  },
  messageContainer: {
    padding: `${variables.padding.d}`,
    overflow: 'hidden'
  },
  conversationParagraph: mixins.typography.p,
  buttonContainer: {
    flex: 3,
    position: 'relative',
    alignContent: 'flex-end',
    padding: '10px',
    [mixins.breakpoints.l]: {
      flex: 2
    }
  },
  confirmButton: merge(mixins.button, {
    margin: '0 auto',
    position: 'absolute',
    bottom: '12px',
    right: '20px',
    [mixins.breakpoints.l]: {
      right: '50px'
    }
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
