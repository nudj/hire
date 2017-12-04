const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

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

/** TODO: Rename nest component under `onboarding` */
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
    importPage: state,
    ...rest,
  } = props

  /** Clean up unused cruft, i.e., remove redux etc. */
  const nextSegment = get(user, 'hirer.onboarded')
    ? 'connections'
    : 'onboarding'

  const headerProps = {
    title: 'Unlocking your network',
    subtitle: 'On-boarding'
  }

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
        <div className={css(sharedStyle.body, style.buttonGroup)}>
          {/**
           * TODO:
           *
           * 1. Route structure, `/import` => `/import/linkedin/guide` => `/import/linkedin/upload`
           * 2. Link as buttons
           */}
          <Link
            style={style.button}
            to={`${networks.linkedin.value}/import/guide`}
          >
            {networks.linkedin.label}
          </Link>
          <Link
            style={style.button}
            to={`${networks.facebook.value}/import/guide`}
          >
            {networks.facebook.label} - coming soon
          </Link>
          <Link
            style={style.button}
            to={`${networks.google.value}/import/guide`}
          >
            {networks.google.label} - coming soon
          </Link>
        </div>
      </div>
    </div>
  )
}

module.exports = ImportPage
