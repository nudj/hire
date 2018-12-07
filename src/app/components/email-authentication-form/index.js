const React = require('react')

const { Button, Text } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const { emailPreferences } = require('../../lib/constants')
const style = require('./style.css')

const EmailAuthenticationForm = props => {
  const { onSubmit, csrfToken, redirectTo } = props

  if (!redirectTo) throw new Error('Must supply a redirectTo')

  return (
    <form
      action='/user-settings'
      method='post'
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
        <input name='_redirectTo' value={redirectTo} type='hidden' />
      </div>
      <div className={css(style.buttonGroup)}>
        <Button
          nonsensitive
          style={style.button}
          name='emailPreference'
          type='submit'
          value={emailPreferences.OTHER}
        >
          No, thanks
        </Button>
        <Button
          nonsensitive
          style={style.button}
          name='emailPreference'
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
