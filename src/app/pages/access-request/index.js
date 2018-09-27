const React = require('react')
const { Helmet } = require('react-helmet')

const mss = require('@nudj/components/lib/css/modifiers.css')
const { Button, Link, Text } = require('@nudj/components')
const { possessiveCase } = require('@nudj/library')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')
const { accept } = require('./actions')

const getPersonLabel = person => {
  let personLabel = 'Someone'
  if (person.firstName) {
    if (person.lastName) {
      personLabel = `${person.firstName} ${person.lastName}`
    } else {
      personLabel = `${person.firstName}`
    }
  }
  return personLabel
}

const AccessRequestPage = props => {
  const {
    user,
    accessRequest,
    dispatch
  } = props
  const {
    person,
    company,
    accepted,
    acceptedBy
  } = accessRequest
  const personLabel = getPersonLabel(person)
  let content

  const sendAccessRequest = () => {
    dispatch(accept())
  }

  if (accepted || acceptedBy) {
    const acceptedByPersonLabel = (accepted || (acceptedBy && acceptedBy.person.id === user.id)) ? 'you' : getPersonLabel(acceptedBy.person)

    content = (
      <Main>
        <Section padding>
          <Heading nonsensitive>
            Access request accepted!
          </Heading>
          <Para nonsensitive>
            {personLabel} ({person.email}) has been granted access to help hire for {company.name} by {acceptedByPersonLabel}.
          </Para>
          <Link style={mss.mtReg} href='/' volume='cheer' nonsensitive>
            Go to app
          </Link>
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
    )
  } else {
    content = (
      <Main>
        <Section padding>
          <Heading nonsensitive>
            {personLabel} wants to help you hire
          </Heading>
          <Para nonsensitive>
            {personLabel} ({person.email}) has requested access to {possessiveCase(company.name)} team on nudj. If you recognise them and want the helping hand, accept their request and we&apos;ll grant them access.
          </Para>
        </Section>
        <Section padding>
          <Button
            nonsensitive
            onClick={sendAccessRequest}
            volume='cheer'
          >
            Accept request
          </Button>
          <div>
            <Text element='div' style={mss.mtReg} nonsensitive>
              Don&apos;t recognise this person?{' '}
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
    )
  }

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`Access request from ${personLabel}`}</title>
      </Helmet>
      {content}
    </Layout>
  )
}

module.exports = AccessRequestPage
