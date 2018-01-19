const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const createHash = require('hash-generator')

const {
  Card,
  Button,
  Input,
  Link,
  Text,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')
const { getFirstNonNil } = require('@nudj/library')

const { render } = require('../../../lib/templater')
const Layout = require('../../../components/app-layout')
const sharedStyle = require('../../shared.css')
const { updateSubject, updateMessage } = require('./actions')
const style = require('./style.css')

const getHandleSubjectChange = dispatch => ({ value }) =>
  dispatch(updateSubject(value))
const getHandleMessageChange = dispatch => ({ value }) =>
  dispatch(updateMessage(value))

const parseJobMessageTemplate = (template, job, user) =>
  render({
    template: template,
    data: {
      recipient: {
        firstname: user.connection.firstName
      },
      job: {
        title: job.title,
        link: job.url
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
  const job = get(user, 'hirer.company.job', {})
  const emailPreference = get(user, 'emailPreference', emailPreferences.OTHER)

  const subjectTemplate = render({
    template: template.subject,
    data: {
      recipient: {
        firstname: get(user, 'connection.firstName', 'Hey')
      }
    }
  })[0].join('')
  const messageTemplate = parseJobMessageTemplate(template.message, job, user)

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
    <Layout {...props} styleSheet={{root: sharedStyle.root}}>
      <Helmet>
        <title>Send your message</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
            Now compose your masterpiece
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            We know that the best way to get a response is to make sure the
            message you send is personal, so take a bit of time to tailor the
            template below.
          </Text>
        </div>
        <div className={css(sharedStyle.body)}>
          <Card style={sharedStyle.card}>
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
              {emailPreference === emailPreferences.GOOGLE ? (
                <Button type='submit' volume='cheer' style={style.sendButton}>
                  Send message
                </Button>
              ) : (
                <Link
                  volume='cheer'
                  style={style.sendButton}
                  href={getMailTo(toEmail, subjectValue, messageValue)}
                >
                  Send message
                </Link>
              )}
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

module.exports = ComposeMessagePage
