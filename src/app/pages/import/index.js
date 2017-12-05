// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const getUrl = network => `/setup-network/${network}`

const ImportPage = () => {
  const networks = {
    linkedin: {
      url: getUrl('linkedin'),
      label: 'LinkedIn'
    },
    facebook: {
      url: getUrl('facebook'),
      label: 'Facebook'
    },
    google: {
      url: getUrl('google'),
      label: 'Google'
    }
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
          <Text element='div' size='largeIi' style={sharedStyle.heading}>
            Choose a network
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            We recommend choosing the network where you feel the best
            recommendations will come from based on your company and the roles
            your hiring for.
          </Text>
        </div>
        <div className={css(sharedStyle.body, style.buttonGroup)}>
          <ButtonLink
            style={style.button}
            href={networks.linkedin.url}
            volume='cheer'
          >
            {networks.linkedin.label}
          </ButtonLink>
          <ButtonLink style={style.button} href={networks.facebook.url}>
            {networks.facebook.label} <Text size='smallI'>- coming soon</Text>
          </ButtonLink>
          <ButtonLink style={style.button} href={networks.google.url}>
            {networks.google.label} <Text size='smallI'>- coming soon</Text>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

module.exports = ImportPage
