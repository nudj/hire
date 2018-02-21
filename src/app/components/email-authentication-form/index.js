/* global FormMethod */
// @flow
const React = require('react')

const { Button, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { values: emailPreferences } = require('@nudj/api/gql/schema/enums/email-preference-types')
const style = require('./style.css')

type Props = {
  action: string,
  method: FormMethod,
  onSubmit: Object => void,
  csrfToken: string
}

const EmailAuthenticationForm = (props: Props) => {
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
        <Text element='div' size='largeI' style={style.heading}>
          Send your messages using Gmail
        </Text>
        <Text element='p' style={style.body}>
          Sync with your Gmail account to send all your messages directly from
          your personal email address instantly.
        </Text>
        <input name='_csrf' value={csrfToken} type='hidden' />
      </div>
      <div className={css(style.buttonGroup)}>
        <Button
          style={style.button}
          name='emailProvider'
          type='submit'
          value={emailPreferences.OTHER}
        >
          No, thanks
        </Button>
        <Button
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
