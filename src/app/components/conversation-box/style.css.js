const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  conversationBox: {
    backgroundColor: variables.colors.white,
    borderRadius: variables.sizing.baseBorderRadius,
    height: '70vh',
    position: 'relative',
    padding: variables.padding.de,
    overflowY: 'scroll'
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
    border: '1px solid #000',
    boxShadow: `0px 5px 10px ${variables.colors.genericBoxShadow}`,
    margin: '5px',
    clear: 'both'
  }),
  name: merge(mixins.headings.small, {
    display: 'block'
  }),
  messageInputContainer: {
    display: 'flex',
    borderTop: '1px solid #000',
    width: '100%',
    minHeight: '61px',
    backgroundColor: variables.colors.white,
    position: 'sticky'
  },
  textareaContainer: {
    flex: 10
  },
  messageContainer: {
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
