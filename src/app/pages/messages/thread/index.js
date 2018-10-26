const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card, Modal, Text, Textarea } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const { emailPreferences, GOOGLE_MAILER_DAEMON_ADDRESS } = require('../../../lib/constants')
const getPersonOrConnectionName = require('../../../lib/get-person-or-connection-names')
const Layout = require('../../../components/app-layout')
const ThreadItem = require('../../../components/email')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const { Heading, Para } = require('../../../components/app')
const ButtonLink = require('../../../components/button-link')
const Loader = require('../../../components/staged-loader')
const style = require('./style.css')

class MessageThreadPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOnboardingSuccessModal: !!props.newlyOnboarded,
      loading: false
    }
  }

  handleOnboardingSuccessModalClose = () => {
    this.setState({
      showOnboardingSuccessModal: false
    })
  }

  handleSubmit = (e) => {
    e.persist()
    e.preventDefault()
    this.setState({ loading: true }, () => {
      e.target.submit()
    })
  }

  render () {
    const { showOnboardingSuccessModal, loading } = this.state
    const { user } = this.props
    const { conversation } = user
    const { recipient, newMessage } = conversation

    const { firstName, lastName } = getPersonOrConnectionName(recipient)

    const messages = get(conversation, 'messages', [])
    const csrfToken = get(this.props, 'csrfToken')

    const fullThread = [...messages, newMessage]
      .filter(message => !isNil(message))
      .filter(message => !isNil(message.body))

    const subject =
      conversation.type === emailPreferences.GOOGLE
        ? conversation.subject
        : 'Unable to display messages'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{subject}</title>
        </Helmet>
        <Main>
          <Section>
            <Card style={mss.pa0}>
              <div className={css(style.threadSection)}>
                <Text style={style.threadSubject} element='div' size='largeI'>
                  {subject}
                </Text>
                <Text style={style.threadName} element='div' size='smallI'>
                  {firstName} {lastName}
                </Text>
                <Text style={style.threadEmail} element='div' size='smallIi'>
                  {recipient.email}
                </Text>
              </div>
              {fullThread.length > 0 &&
                fullThread.map(message => {
                  if (message.from.email === GOOGLE_MAILER_DAEMON_ADDRESS) {
                    return (
                      <Text nonsensitive element='div' style={style.threadSection} key={message.id}>
                        Google was unable to send your previous message. Most likely because the recipient email address is invalid. Get in touch if you have further questions.
                      </Text>
                    )
                  }

                  const {
                    firstName: messageFirstName,
                    lastName: messageLastName
                  } = getPersonOrConnectionName(message.from)
                  const fromEmail = get(message, 'from.account.emailAddress', get(message, 'from.email'))
                  return (
                    <div className={css(style.threadSection)} key={message.id}>
                      <ThreadItem
                        from={`${messageFirstName} ${messageLastName} <${fromEmail}>`}
                        body={message.body}
                        date={format(message.date, 'DD MMM YY HH:mm')}
                      />
                    </div>
                  )
                })}
              <form
                className={css(style.threadSection)}
                method='post'
                onSubmit={this.handleSubmit}
              >
                <Textarea name='body' placeholder='Write your message here...' />
                <input name='_csrf' value={csrfToken} type='hidden' />
                <Button
                  nonsensitive
                  style={mss.mtReg}
                  type='submit'
                  volume='cheer'
                  disabled={loading}
                >
                  { loading
                      ? <Loader messages={['Sending']} ellipsis />
                      : 'Send reply'
                  }
                </Button>
              </form>
            </Card>
          </Section>
        </Main>
        <Modal
          isOpen={showOnboardingSuccessModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.handleOnboardingSuccessModalClose}
          style={mss.center}
        >
          <Heading
            nonsensitive
            level={2}
            size='largeIi'
            style={mss.fgPrimary}
          >
            Congratulations, you&apos;ve sent your first nudj!
          </Heading>
          <img
            className={css(mss.mtLgIi)}
            src='/assets/images/fist-bump.svg'
            alt=''
          />
          <Para nonsensitive>
            You&#39;re well on your way to finding your next hire and are now free to nudj whenever you want.
          </Para>
          <Para nonsensitive>
            To maximise your chances of finding someone great, however, we recommend
            sending a minimum of <em className={css(mss.italic)}>3 requests per job</em>.
          </Para>
          <div className={css(style.buttonGroup)}>
            <Button
              nonsensitive
              style={style.button}
              onClick={this.handleOnboardingSuccessModalClose}
            >
              Maybe later
            </Button>
            <ButtonLink
              nonsensitive
              style={style.button}
              href='/favourites'
              volume='cheer'
            >
              Send another nudj
            </ButtonLink>
          </div>
        </Modal>
      </Layout>
    )
  }
}

module.exports = MessageThreadPage
