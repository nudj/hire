const React = require('react')
const PropTypes = require('prop-types')

const {
  IconLink,
  FacebookButton,
  MessengerButton,
  TwitterButton,
  WhatsappButton,
  EmailButton
} = require('@nudj/components')
const { ComponentPropType, StylePropType } = require('@nudj/components/lib/helpers/prop-types')

const ShareButtons = (props) => {
  const {
    style,
    nudj,
    whatsapp,
    facebook,
    messenger,
    twitter,
    email,
    tabIndex
  } = props

  return (
    <div>
      {nudj && (
        <IconLink
          {...nudj}
          style={style}
          iconName='nudj'
          volume='cheer'
        />
      )}
      {whatsapp && (
        <WhatsappButton
          {...whatsapp}
          style={style}
          tabIndex={tabIndex}
        />
      )}
      {facebook && (
        <FacebookButton
          {...facebook}
          style={style}
          tabIndex={tabIndex}
        />
      )}
      {messenger && (
        <MessengerButton
          {...messenger}
          style={style}
          tabIndex={tabIndex}
        />
      )}
      {twitter && (
        <TwitterButton
          {...twitter}
          style={style}
          tabIndex={tabIndex}
        />
      )}
      {email && (
        <EmailButton
          {...email}
          to=''
          style={style}
          tabIndex={tabIndex}
        />
      )}
    </div>
  )
}

ShareButtons.propTypes = {
  nudj: PropTypes.shape({
    to: PropTypes.string.isRequired,
    Component: ComponentPropType
  }),
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
    body: PropTypes.string.isRequired,
    gmail: PropTypes.bool
  }),
  tabIndex: PropTypes.number,
  style: StylePropType
}

module.exports = ShareButtons
