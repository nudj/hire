const React = require('react')

const {
  Input,
  InputField,
  Textarea,
  Button,
  Link
} = require('@nudj/components')
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
    recipients,
    mailto
  } = props

  return (
    <form method='post' onSubmit={onSend}>
      {recipients && (
        <InputField
          htmlFor='recipients'
          label='To'
          styleSheet={{ root: style.field }}
        >
          <Input
            id='recipients'
            name='recipients'
            value={recipients.join(', ')}
            styleSheet={{ input: style.recipients }}
            disabled
          />
        </InputField>
      )}
      <InputField
        htmlFor='subject'
        label='Subject'
        styleSheet={{ root: style.field }}
      >
        <Input
          id='subject'
          name='subject'
          value={subject}
          onChange={onSubjectChange}
        />
      </InputField>
      <InputField
        htmlFor='body'
        label='Body'
        styleSheet={{ root: style.field }}
      >
        <Textarea
          id='body'
          name='body'
          value={message}
          onChange={onMessageChange}
          styleSheet={{ input: style.messageInput }}
          autosize
        />
      </InputField>
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
