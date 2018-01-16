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
const { getFirstNonNil } = require('@nudj/library')
const { values: emailPreferences } = require('@nudj/api/gql/schema/enums/email-preference-types')

const { render } = require('../../lib/templater')
const style = require('./style.css')
const sharedStyle = require('../shared.css')
const Layout = require('../../components/app-layout')
const { updateSubject, updateMessage } = require('./actions')

const getHandleSubjectChange = dispatch => ({ value }) =>
  dispatch(updateSubject(value))
const getHandleMessageChange = dispatch => ({ value }) =>
  dispatch(updateMessage(value))

const parseJobMessageTemplate = (template, job, user) =>
  render({
    template: template,
    data: {
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
  const { conversationsPage, dispatch, user, template } = props
  const toEmail = get(user, 'connection.person.email', '')
  const job = get(props, 'hirer.company.job', {})
  const emailPreference = get(
    user,
    'emailPreference',
    emailPreferences.OTHER
  )

  const subjectTemplate = render({ template: template.subject })[0].join('')
  const messageTemplate = parseJobMessageTemplate(template.message, job, user)

  const subjectValue = getFirstNonNil(
    conversationsPage.subject,
    subjectTemplate,
    ''
  )
  const messageValue = getFirstNonNil(
    conversationsPage.message,
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
          <Text element='div' size='largeIi' style={sharedStyle.heading}>
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
            <form>
              <Input
                value={subjectValue}
                onChange={getHandleSubjectChange(dispatch)}
                styleSheet={{ input: style.subjectInput }}
              />
              <Textarea
                value={messageValue}
                onChange={getHandleMessageChange(dispatch)}
                styleSheet={{ input: style.messageInput }}
                autosize
              />
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
