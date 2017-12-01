const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { setNetwork } = require('./actions')
const sharedStyle = require('./shared.css')
const style = require('./style.css')

const networks = {
  linkedin: {
    value: 'linkedin',
    label: 'LinkedIn'
  },
  facebook: {
    value: 'facebook',
    label: 'Facebook'
  },
  google: {
    value: 'google',
    label: 'Google'
  }
}

function onNetworkSelect(dispatch) {
  return event => dispatch(setNetwork(event.target.value))
}

const ImportPage = props => {
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    importPage: state
  } = props

  const nextSegment = get(user, 'hirer.onboarded')
    ? 'connections'
    : 'onboarding'

  const headerProps = {
    title: 'Unlocking your network',
    subtitle: 'On-boarding'
  }

  const handleNetworkSelect = onNetworkSelect(dispatch)

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
        <html className={css(sharedStyle.html)} />
        <body className={css(sharedStyle.pageBody)} />
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element="div" size="largeIi" style={sharedStyle.heading}>
            Choose a network
          </Text>
          <Text element="p" style={sharedStyle.subheading}>
            We recommend choosing the network where you feel the best
            recommendations will come from based on your company and the roles
            your hiring for.
          </Text>
        </div>
        <div className={css(sharedStyle.body)}>
          {/* <Text element="div" size="smallIi" style={style.comingSoon}>
            Coming soon
          </Text> */}
          <Button
            style={style.button}
            value={networks.facebook.value}
            onClick={handleNetworkSelect}
          >
            {networks.facebook.label}
          </Button>
          <Button
            style={style.button}
            value={networks.google.value}
            onClick={handleNetworkSelect}
          >
            {networks.google.label}
          </Button>
          <Button
            style={style.button}
            volume="cheer"
            value={networks.linkedin.value}
            onClick={handleNetworkSelect}
          >
            {networks.linkedin.label}
          </Button>
        </div>
      </div>
    </div>
  )
}

module.exports = ImportPage
