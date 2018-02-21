// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text } = require('@nudj/components')

const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')

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

const ChooseNetworkPage = (props: Object) => (
  <Layout {...props} title='Part 1: Unlock your network'>
    <Helmet>
      <title>Select a network</title>
    </Helmet>
    <Main>
      <Section padding>
        <Heading>
          Select a network
        </Heading>
        <Para>
          Pick a network and we&#39;ll help you upload your contacts.
        </Para>
      </Section>
      <Section padding>
        <ButtonLink
          style={wizardStyles.action}
          href={NETWORKS.linkedin.url}
          volume='cheer'
        >
          {NETWORKS.linkedin.label}
        </ButtonLink>
        <ButtonLink style={wizardStyles.action} href={NETWORKS.facebook.url} disabled>
          {NETWORKS.facebook.label} <Text size='smallI'>- coming soon</Text>
        </ButtonLink>
        <ButtonLink style={wizardStyles.action} href={NETWORKS.google.url} disabled>
          {NETWORKS.google.label} <Text size='smallI'>- coming soon</Text>
        </ButtonLink>
      </Section>
    </Main>
  </Layout>
)

module.exports = ChooseNetworkPage
