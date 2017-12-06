// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')

const getUrl = network => `/setup-network/${network}`

const NETWORKS = {
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

const ImportPage = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>nudj - Choose a network</title>
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
      <div className={css(sharedStyle.actions)}>
        <ButtonLink
          style={sharedStyle.action}
          href={NETWORKS.linkedin.url}
          volume="cheer"
        >
          {NETWORKS.linkedin.label}
        </ButtonLink>
        <ButtonLink style={sharedStyle.action} href={NETWORKS.facebook.url}>
          {NETWORKS.facebook.label} <Text size="smallI">- coming soon</Text>
        </ButtonLink>
        <ButtonLink style={sharedStyle.action} href={NETWORKS.google.url}>
          {NETWORKS.google.label} <Text size="smallI">- coming soon</Text>
        </ButtonLink>
      </div>
    </div>
  </div>
)

module.exports = ImportPage
