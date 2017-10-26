const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const baseNameSection = {
  padding: '15px 10px 0',
  textAlign: 'center',
  verticalAlign: 'middle'
}

const baseMessageDate = merge(mixins.headings.small, {
  padding: '0 10px 0'
})

const baseMessage = {
  display: 'inline-block',
  maxWidth: '60%',
  paddingBottom: '5px'
}

const baseMessageBubble = merge(mixins.typography.p, {
  padding: '15px 20px 1px',
  borderRadius: variables.sizing.messageBorderRadius,
  boxShadow: `0px 5px 10px ${variables.colors.genericBoxShadow}`,
  margin: '5px',
  clear: 'both'
})

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
  hirerNameSection: merge(baseNameSection, {
    float: 'right'
  }),
  recipientNameSection: merge(baseNameSection, {
    float: 'left'
  }),
  hirerMessageDate: merge(baseMessageDate, {
    float: 'right'
  }),
  recipientMessageDate: merge(baseMessageDate, {
    float: 'left'
  }),
  hirerMessage: merge(baseMessage, {
    float: 'right'
  }),
  recipientMessage: merge(baseMessage, {
    float: 'left'
  }),
  messageTextarea: merge(mixins.formElements.inputBoxBorderless, {
    height: '20rem',
    minHeight: '61px',
    padding: `${variables.padding.d}`,
    resize: 'none',
    display: 'inline',
    width: '100%'
  }),
  hirerMessageBubble: merge(baseMessageBubble, {
    backgroundColor: '#0B1D27'
  }),
  recipientMessageBubble: merge(baseMessageBubble, {
    backgroundColor: '#E9E9E8'
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
  messageLink: {
    textDecoration: 'none',
    color: variables.colors.pink
  },
  textareaContainer: {
    flex: 10
  },
  messageContainer: {
    padding: `${variables.padding.d}`,
    overflow: 'hidden'
  },
  hirerParagraph: merge(mixins.typography.p, {
    color: '#FFF'
  }),
  recipientParagraph: merge(mixins.typography.p, {
    color: '#000'
  }),
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
