const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const createHash = require('hash-generator')

const {
  Card,
  Button,
  Input,
  Link,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')
const { getFirstNonNil } = require('@nudj/library')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { render } = require('../../../lib/templater')
const Layout = require('../../../components/app-layout')
const { updateSubject, updateMessage } = require('./actions')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const { Heading, Para } = require('../../../components/app')
const style = require('./style.css')

const getHandleSubjectChange = dispatch => ({ value }) =>
  dispatch(updateSubject(value))
const getHandleMessageChange = dispatch => ({ value }) =>
  dispatch(updateMessage(value))

const parseJobMessageTemplate = (template, job, user, link) =>
  render({
    template: template,
    data: {
      recipient: {
        firstname: user.connection.firstName
      },
      job: {
        title: job.title,
        link
      },
      sender: {
        firstname: user.firstName
      }
    },
    splitter: createHash(16),
    brify: () => '\n\n'
  })[0].join('')

const getMailTo = (to, subject, message) =>
  `mailto:${to}?subject=${encodeURI(subject)}&body=${encodeURI(message)}`

const ComposeMessagePage = props => {
  const { composeMessage, dispatch, user, template, csrfToken } = props
  const toEmail = get(user, 'connection.person.email', '')
  const recipientId = get(user, 'connection.person.id')
  const job = get(user, 'hirer.company.job', {})
  const emailPreference = get(user, 'emailPreference', emailPreferences.OTHER)
  const companySlug = get(user, 'hirer.company.slug', '')
  const jobSlug = get(job, 'slug', '')
  const referralId = get(job, 'referral.id', '')

  const subjectTemplate = render({
    template: template.subject,
    data: {
      recipient: {
        firstname: get(user, 'connection.firstName', 'Hey')
      }
    }
  })[0].join('')
  const referralLink = `${get(props, 'web.protocol')}://${get(props, 'web.hostname')}/jobs/${companySlug}+${jobSlug}+${referralId}`
  const messageTemplate = parseJobMessageTemplate(template.message, job, user, referralLink)

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
        <title>Send your message</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading level={1} style={mss.fgPrimary}>
            Now compose your masterpiece
          </Heading>
          <Para>
            We know that the best way to get a response is to make sure the
            message you send is personal, so take a bit of time to tailor the
            template below.
          </Para>
        </Section>
        <Section width='largeI'>
          <Card>
            <form method='post'>
              <Input
                name='subject'
                value={subjectValue}
                onChange={getHandleSubjectChange(dispatch)}
                styleSheet={{ input: style.subjectInput }}
              />
              <Textarea
                name='body'
                value={messageValue}
                onChange={getHandleMessageChange(dispatch)}
                styleSheet={{ input: style.messageInput }}
                autosize
              />
              <input name='_csrf' value={csrfToken} type='hidden' />
              <input name='recipient' value={recipientId} type='hidden' />
              <div className={css(mss.center)}>
                {emailPreference === emailPreferences.GOOGLE ? (
                  <Button type='submit' volume='cheer' style={mss.mtReg}>
                    Send message
                  </Button>
                ) : (
                  <Link
                    volume='cheer'
                    style={mss.mtReg}
                    href={getMailTo(toEmail, subjectValue, messageValue)}
                  >
                    Send message
                  </Link>
                )}
              </div>
            </form>
          </Card>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ComposeMessagePage
