const React = require('react')
const { Helmet } = require('react-helmet')
const startCase = require('lodash/startCase')
const { Link, Text } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')

const { Heading, Para } = require('../../components/wizard')
const Section = require('../../components/section')
const Main = require('../../components/main')

const SyncingPage = props => {
  const { company } = props.user.hirer
  const integrationName = startCase(company.ats.toLowerCase())

  return (
    <div>
      <Helmet>
        <title>Syncing in progress</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive>
            {integrationName} syncing in progress
          </Heading>
          <Para nonsensitive>
            {company.name} is currently syncing with {integrationName} and the app is updating. Please wait for a few minutes before trying again.
          </Para>
        </Section>
        <Section padding>
          <Text element='div' style={mss.mtReg} nonsensitive>
            Something not right?{' '}
            <Link
              id='open-intercom'
              href='mailto:help@nudj.co'
              volume='cheer'
              subtle
              inline
            >
              Contact our support team
            </Link>.
          </Text>
        </Section>
      </Main>
    </div>
  )
}

module.exports = SyncingPage
