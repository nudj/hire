const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card } = require('@nudj/components')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')
const { getFirstNonNil } = require('@nudj/library')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { getJobUrl } = require('@nudj/library')

const getPersonOrConnectionName = require('../../../lib/get-person-or-connection-names')
const compilePrismicTemplate = require('../../../lib/compile-prismic-template')
const Layout = require('../../../components/app-layout')
const { updateSubject, updateMessage, sendMessage } = require('./actions')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const { Heading, Para } = require('../../../components/app')
const ComposeMessageForm = require('../../../components/form-compose-message')

const getHandleSubjectChange = dispatch => ({ value }) =>
  dispatch(updateSubject(value))
const getHandleMessageChange = dispatch => ({ value }) =>
  dispatch(updateMessage(value))
const getHandleSendMessage = dispatch => () => dispatch(sendMessage)

const getMailTo = (to, subject, message) =>
  `mailto:${to}?subject=${encodeURI(subject)}&body=${encodeURI(message)}`

const ComposeMessagePage = props => {
  const {
    composeMessage,
    dispatch,
    user,
    recipient,
    template,
    csrfToken,
    web
  } = props
  const toEmail = get(recipient, 'email', '')
  const job = get(user, 'hirer.company.job', {})
  const emailPreference = get(user, 'emailPreference', emailPreferences.OTHER)
  const companySlug = get(user, 'hirer.company.slug', '')
  const jobSlug = get(job, 'slug', '')
  const referralId = get(job, 'referral.id', '')

  const { firstName } = getPersonOrConnectionName(recipient)

  const subjectTemplate = compilePrismicTemplate(
    template.subject,
    {
      recipient: {
        firstname: firstName
      }
    }
  )

  const referralLink = getJobUrl({
    protocol: web.protocol,
    hostname: web.hostname,
    company: companySlug,
    job: jobSlug,
    referralId
  })

  const messageTemplate = compilePrismicTemplate(
    template.message,
    {
      recipient: {
        firstname: firstName
      },
      job: {
        title: job.title,
        link: referralLink
      },
      sender: {
        firstname: user.firstName
      }
    }
  )

  const subjectValue = getFirstNonNil(
    composeMessage.subject,
    subjectTemplate,
    ''
  )
  const messageValue = getFirstNonNil(
    composeMessage.message,
    messageTemplate,
    ''
  )

  return (
    <Layout {...props}>
      <Helmet>
        <title>Compose a message</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading level={1} style={mss.fgPrimary}>
            Compose a message
          </Heading>
          <Para>
            Take a bit of time to personalise the template below to the person
             you&#39;re sending it to.
          </Para>
        </Section>
        <Section width='largeI'>
          <Card>
            <ComposeMessageForm
              csrfToken={csrfToken}
              loading={composeMessage.loading}
              subject={subjectValue}
              message={messageValue}
              emailPreference={emailPreference}
              mailto={getMailTo(toEmail, subjectValue, messageValue)}
              onSend={getHandleSendMessage(dispatch)}
              onSubjectChange={getHandleSubjectChange(dispatch)}
              onMessageChange={getHandleMessageChange(dispatch)}
            />
          </Card>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ComposeMessagePage
