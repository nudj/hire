const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Modal } = require('@nudj/components')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')
const { getFirstNonNil } = require('@nudj/library')
const { mss } = require('@nudj/components/styles')
const { getJobUrl } = require('@nudj/library')

const getPersonOrConnectionName = require('../../lib/get-person-or-connection-names')
const compilePrismicTemplate = require('../../lib/compile-prismic-template')
const Layout = require('../../components/app-layout')
const { updateSubject, updateMessage, sendMessage } = require('./actions')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ComposeMessageForm = require('../../components/form-compose-message')
const TitleCard = require('../../components/title-card')
const EmailAuthForm = require('../../components/email-authentication-form')
const style = require('./style.css')

class ComposeMessagePage extends React.Component {
  handleSubjectChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch(updateSubject(value))
  }

  handleMessageChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch(updateMessage(value))
  }

  handleSubmit = () => {
    const { user, dispatch } = this.props
    const emailPreference = get(user, 'emailPreference', emailPreferences.OTHER)

    if (emailPreference === emailPreferences.GOOGLE) {
      dispatch(sendMessage())
    }
  }

  render () {
    const {
      composeMessage,
      user,
      recipient,
      template,
      csrfToken,
      web
    } = this.props

    const toEmail = get(recipient, 'email', '')
    const job = get(user, 'hirer.company.job', {})
    const emailPreference = get(user, 'emailPreference')
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
    const mailto = `mailto:${toEmail}?subject=${encodeURI(subjectValue)}&body=${encodeURI(messageValue)}`

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Tweak the message</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard title='Tweak the message'>
              <Text element='p' style={mss.mbReg}>
                Take a bit of time to personalise the template. You&apos;ll get a better response if you add a little personality.
              </Text>
              <ComposeMessageForm
                csrfToken={csrfToken}
                loading={composeMessage.loading}
                subject={subjectValue}
                message={messageValue}
                emailPreference={emailPreference}
                mailto={mailto}
                onSubjectChange={this.handleSubjectChange}
                onMessageChange={this.handleMessageChange}
                onSubmit={this.handleSubmit}
              />
            </TitleCard>
          </Section>
        </Main>
        <Modal isOpen={!emailPreference} style={style.modalWindow}>
          <EmailAuthForm
            csrfToken={csrfToken}
            redirectTo={`/messages/new/${recipient.id}/${job.id}`}
          />
        </Modal>
      </Layout>
    )
  }
}

module.exports = ComposeMessagePage
