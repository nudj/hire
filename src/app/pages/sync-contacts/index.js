const React = require('react')
const { Helmet } = require('react-helmet')

const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const style = require('./style.css')

const linkStyle = [wizardStyles.action, style.action]

const ChooseNetworkPage = props => (
  <Layout {...props}>
    <Helmet>
      <title>Select a network</title>
    </Helmet>
    <Main>
      <Section padding>
        <Heading nonsensitive>
          Explore your LinkedIn network
        </Heading>
        <Para nonsensitive>
          We&apos;ve made it incredibly easy for you to discover who from your
          LinkedIn connections is suitable for your company&apos;s open roles.
        </Para>
        <Para nonsensitive>
          To take advantage of this feature you need to export and upload
          your LinkedIn connections into nudj first.
        </Para>
      </Section>
      <Section padding style={style.actions}>
        <ButtonLink
          style={linkStyle}
          href='/sync-contacts/linkedin'
          volume='cheer'
          nonsensitive
        >
          Sync LinkedIn
        </ButtonLink>
        <ButtonLink
          style={linkStyle}
          href='/share-jobs'
          volume='cheer'
          nonsensitive
          subtle
        >
          I&apos;ll do this later
        </ButtonLink>
      </Section>
    </Main>
  </Layout>
)

module.exports = ChooseNetworkPage
