const React = require('react')
const { Helmet } = require('react-helmet')

const mss = require('@nudj/components/lib/css/modifiers.css')
const { Button, Link, Text } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')
const { requestAccess } = require('./actions')

const posessiveCase = name => {
  if (name.endsWith('s')) return `${name}'`
  return `${name}'s`
}

const RequestAccessPage = props => {
  const { company, dispatch } = props

  const sendAccessRequest = () => {
    dispatch(requestAccess())
  }

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`Request access to ${company.name}`}</title>
      </Helmet>
      {company.accessRequest ? (
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Hang tight!
            </Heading>
            <Para nonsensitive>
              We&apos;ve notified {posessiveCase(company.name)} nudj administrator - it
              could take a little while for them to invite you.
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
      ) : (
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Great news! {company.name} are already using nudj
            </Heading>
            <Para nonsensitive>
              To gain access and start making referrals,
              contact {posessiveCase(company.name)} nudj administrator
            </Para>
          </Section>
          <Section padding>
            <Button
              nonsensitive
              onClick={sendAccessRequest}
              volume='cheer'
            >
              Request access
            </Button>
            <div>
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
            </div>
          </Section>
        </Main>
      )}
    </Layout>
  )
}

module.exports = RequestAccessPage
