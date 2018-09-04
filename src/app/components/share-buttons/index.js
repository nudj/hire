const React = require('react')
const PropTypes = require('prop-types')
const { Link } = require('react-router-dom')

const {
  IconLink,
  FacebookButton,
  LinkedinButton,
  MessengerButton,
  TwitterButton,
  WhatsappButton,
  EmailButton
} = require('@nudj/components')
const { ComponentPropType, StylePropType } = require('@nudj/components/lib/helpers/prop-types')

class ShareButtons extends React.Component {
  static propTypes = {
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
    linkedin: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired
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

  render () {
    const {
      style,
      nudj,
      whatsapp,
      facebook,
      messenger,
      linkedin,
      twitter,
      email,
      tabIndex
    } = this.props

    return (
      <div>
        {nudj && (
          <IconLink
            /* Default Component, allow override via props */
            Component={Link}
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
        {linkedin && (
          <LinkedinButton
            {...linkedin}
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
}

module.exports = ShareButtons
