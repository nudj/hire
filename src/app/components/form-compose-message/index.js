const React = require('react')

const { Input, Textarea, Button, Link } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')

const Loader = require('../staged-loader')
const style = require('./style.css')

const ComposeMessageForm = props => {
  const {
    onSend,
    onSubjectChange,
    onMessageChange,
    subject,
    message,
    emailPreference,
    csrfToken,
    loading,
    mailto
  } = props

  return (
    <form method='post' onSubmit={onSend}>
      <Input
        name='subject'
        value={subject}
        onChange={onSubjectChange}
        styleSheet={{ input: style.subjectInput }}
      />
      <Textarea
        name='body'
        value={message}
        onChange={onMessageChange}
        styleSheet={{ input: style.messageInput }}
        autosize
      />
      <input name='_csrf' value={csrfToken} type='hidden' />
      <div className={css(mss.center)}>
        {emailPreference === emailPreferences.GOOGLE ? (
          <Button
            type='submit'
            volume='cheer'
            style={mss.mtReg}
            disabled={loading}
          >
            { loading
                ? <Loader messages={['Sending']} ellipsis />
                : 'Send message'
            }
          </Button>
        ) : (
          <Link
            volume='cheer'
            style={mss.mtReg}
            href={mailto}
          >
            Send message
          </Link>
        )}
      </div>
    </form>
  )
}

ComposeMessageForm.defaultProps = {
  onSend: () => {},
  onSubjectChange: () => {},
  onMessageChange: () => {},
  loading: false,
  message: '',
  subject: ''
}

module.exports = ComposeMessageForm
