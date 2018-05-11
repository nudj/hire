const React = require('react')
const PropTypes = require('prop-types')

const {
  FacebookButton,
  MessengerButton,
  TwitterButton,
  WhatsappButton,
  EmailButton
} = require('@nudj/components')

const ShareButtons = (props) => {
  const {
    style,
    whatsapp,
    facebook,
    messenger,
    twitter,
    email,
    tabIndex
  } = props

  return (
    <div>
      <WhatsappButton
        {...whatsapp}
        style={style}
        tabIndex={tabIndex}
      />
      <FacebookButton
        {...facebook}
        style={style}
        tabIndex={tabIndex}
      />
      <MessengerButton
        {...messenger}
        style={style}
        tabIndex={tabIndex}
      />
      <TwitterButton
        {...twitter}
        style={style}
        tabIndex={tabIndex}
      />
      <EmailButton
        {...email}
        to=''
        style={style}
        tabIndex={tabIndex}
      />
    </div>
  )
}

ShareButtons.propTypes = {
  whatsapp: PropTypes.shape({
    text: PropTypes.string.isRequired
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  messenger: PropTypes.shape({
    link: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired
  }),
  twitter: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    via: PropTypes.string.isRequired
  }),
  email: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
}

module.exports = ShareButtons
