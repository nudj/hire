const React = require('react')

const { Button, Text } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const { emailPreferences } = require('../../lib/constants')
const style = require('./style.css')

const EmailAuthenticationForm = props => {
  const { action, method, onSubmit, csrfToken } = props

  return (
    <form
      action={action}
      method={method}
      onSubmit={onSubmit}
      className={css(style.root)}
    >
      <div>
        <img
          className={css(style.gmailLogo)}
          src='/assets/images/New_Logo_Gmail.svg'
          alt=''
        />
        <Text nonsensitive element='div' size='largeI' style={style.heading}>
          Send your messages using Gmail
        </Text>
        <Text nonsensitive element='p' style={style.body}>
          Sync with your Gmail account to send all your messages directly from
          your personal email address instantly.
        </Text>
        <input name='_csrf' value={csrfToken} type='hidden' />
      </div>
      <div className={css(style.buttonGroup)}>
        <Button
          nonsensitive
          style={style.button}
          name='emailProvider'
          type='submit'
          value={emailPreferences.OTHER}
        >
          No, thanks
        </Button>
        <Button
          nonsensitive
          style={style.button}
          name='emailProvider'
          type='submit'
          value={emailPreferences.GOOGLE}
          volume='cheer'
        >
          Sync account
        </Button>
      </div>
    </form>
  )
}

EmailAuthenticationForm.defaultProps = {
  onSubmit: () => {}
}

module.exports = EmailAuthenticationForm
