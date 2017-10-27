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
  margin: '5px',
  clear: 'both'
})

const recipientAlign = { float: 'left' }

const hirerAlign = { float: 'right' }

const styles = {
  conversationBoxContainer: {
    padding: `${variables.padding.b} ${variables.padding.de}`,
    margin: `0 ${variables.padding.c}`,
    paddingBottom: '0px',
    [mixins.breakpoints.l]: {
      margin: `0 ${variables.padding.a}`
    }
  },
  conversationBox: {
    backgroundColor: variables.colors.lighterGrey,
    borderRadius: variables.sizing.baseBorderRadius,
    overflow: 'hidden',
    minHeight: '70vh',
    position: 'relative'
  },
  hirerNameSection: merge(baseNameSection, hirerAlign),
  recipientNameSection: merge(baseNameSection, recipientAlign),
  hirerMessageDate: merge(baseMessageDate, hirerAlign),
  recipientMessageDate: merge(baseMessageDate, recipientAlign),
  hirerMessage: merge(baseMessage, hirerAlign),
  recipientMessage: merge(baseMessage, recipientAlign),
  messageTextarea: merge(mixins.formElements.inputBoxBorderless, {
    margin: '12px 0',
    border: `${variables.sizing.detailSeparatorWidth} solid ${variables.colors.lightGrey}`,
    maxHeight: '300px',
    borderRadius: variables.sizing.baseBorderRadius,
    padding: `${variables.padding.de}`,
    resize: 'none',
    display: 'inline',
    width: '100%',
    ':focus': {
      border: '1px solid grey'
    }
  }),
  hirerMessageBubble: merge(baseMessageBubble, {
    backgroundColor: '#0B1D27'
  }),
  recipientMessageBubble: merge(baseMessageBubble, {
    backgroundColor: '#E9E9E8'
  }),
  name: merge(mixins.headings.p2, {
    display: 'block'
  }),
  headerContainer: {
    display: 'flex',
    borderRadius: `${variables.sizing.baseBorderRadius} ${variables.sizing.baseBorderRadius} 0 0`,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 auto',
    position: 'sticky',
    top: '80px',
    borderTop: `40px solid ${variables.colors.grey}`,
    height: '120px',
    width: '100%',
    zIndex: '10',
    background: variables.colors.grey
  },
  header: {
    backgroundColor: variables.colors.white,
    padding: `${variables.padding.de} ${variables.padding.d}`,
    borderRadius: `${variables.sizing.baseBorderRadius} ${variables.sizing.baseBorderRadius} 0 0`,
    width: '100%',
    height: '100%'
  },
  inputContainer: {
    backgroundColor: variables.colors.white,
    padding: `5px ${variables.padding.de}`,
    borderRadius: `0 0 ${variables.sizing.baseBorderRadius} ${variables.sizing.baseBorderRadius}`,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  messageInputContainer: {
    display: 'flex',
    width: '100%',
    minHeight: '120px',
    alignItems: 'center',
    backgroundColor: variables.colors.grey,
    position: 'sticky',
    bottom: '0',
    borderBottom: `40px solid ${variables.colors.grey}`
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
    color: variables.colors.midRed
  },
  textareaContainer: {
    height: '100%',
    flex: 10
  },
  messageContainer: {
    padding: `${variables.padding.d}`,
    overflow: 'hidden'
  },
  hirerParagraph: merge(mixins.typography.p2, {
    color: variables.colors.white
  }),
  recipientParagraph: merge(mixins.typography.p2, {
    color: '#000'
  }),
  buttonContainer: {
    flex: 3,
    minHeight: '60px',
    position: 'relative',
    alignItems: 'center',
    padding: '10px',
    [mixins.breakpoints.l]: {
      flex: 2
    }
  },
  confirmButton: merge(mixins.button, {
    display: 'block',
    margin: '0 auto'
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
