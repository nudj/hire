// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Link } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')

const InviteTeamPage = (props: Object) => (
  <Layout {...props}>
    <Helmet>
      <title>Invite team</title>
    </Helmet>
    <Main>
      <Section padding>
        <Heading>
          Get your team on nudj
        </Heading>
        <Para>
          With more people at your company on nudj, you have a greater chance of finding someone awesome to hire.
        </Para>
      </Section>
      <Section>
        Invite form goes here
      </Section>
      <Section padding>
        <Link
          subtle
          inline
          volume='cheer'
          href='/get-started'
        >
          I&apos;ll do this later
        </Link>
      </Section>
    </Main>
  </Layout>
)

module.exports = InviteTeamPage
