const React = require('react')
const { Helmet } = require('react-helmet')

const { Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../../components/wizard')
const Countdown = require('./timer')
const Video = require('./video')

const panelHeight = 150

const InstructionsPanel = ({ children, onRefocus }) => (
  <div>
    { onRefocus && (
      <Main>
        <Para>
          Don't see LinkedIn? <Button onClick={onRefocus} inline subtle>Reopen</Button>
        </Para>
      </Main>
    ) }
    <div
      className={css(style.instructionPanel)}
      style={{
        height: `${panelHeight}px`
      }}
    >
      {children}
    </div>
  </div>
)

const IntructionContent = ({ children }) => (
  <div className={css(style.instructionContent)}>
    {children}
  </div>
)

const ActionContainer = ({ children }) => (
  <div className={css(style.instructionActionsContainer)}>
    {children}
  </div>
)

const Stage0 = ({ onAction }) => {
  return (
    <Main>
      <Section padding>
        <Heading>
          Importing your LinkedIn connections into nudj
        </Heading>
        <Para>
          With nudj you can easily uncover who from your LinkedIn network can help you in your search for your next hires.
        </Para>
        <Para>
          Before you can start exploring your network, however, you need to export your connections from LinkedIn and then upload them into nudj.
        </Para>
      </Section>
      <Section padding>
        <Button
          style={wizardStyles.action}
          volume='cheer'
          onClick={onAction}
        >
          Open LinkedIn
        </Button>
      </Section>
    </Main>
  )
}

class Instructions extends React.Component {
  state = {
    stage: 0,
    reset: false,
    countdownComplete: false
  }

  openLinkedin = () => {
    const width = window.innerWidth
    const height = window.innerHeight - panelHeight
    const top = window.screenTop
    const left = window.screenLeft

    this.linkedin = window.open(
      'https://www.linkedin.com/psettings/member-data?trk=eml-email_security_dataexport_fast_only_01-hero-1-export',
      'targetWindow',
      `width=${width}px,height=${height}px,top=${top}px,left=${left}px`
    )

    this.setState(state => ({
      stage: state.stage + 1
    }))
  }

  refreshLinkedin = () => {
    const width = window.innerWidth
    const height = window.innerHeight - panelHeight
    const top = window.screenTop
    const left = window.screenLeft

    this.linkedin = window.open(
      'https://www.linkedin.com/psettings/member-data?trk=eml-email_security_dataexport_fast_only_01-hero-1-export',
      'targetWindow',
      `width=${width}px,height=${height}px,top=${top}px,left=${left}px`
    )

    this.linkedin.focus()
    this.setState({
      countdownComplete: false
    })
  }

  incrementStage = () => {
    if (this.linkedin.closed) {
      this.setState({
        stage: 0,
        reset: true
      }, this.openLinkedin)
    } else {
      if (this.state.stage + 1 !== 2) {
        this.linkedin.focus()
      }

      this.setState(state => ({
        stage: state.stage + 1
      }))
    }
  }

  handleCountdownComplete = () => {
    this.setState({
      countdownComplete: true
    })
  }

  finish = () => {
    this.setState(state => ({
      stage: state.stage + 1
    }))

    this.linkedin.close()
  }

  refocus = () => {
    if (this.linkedin.closed) {
      this.setState({
        stage: 0,
        reset: true
      }, this.openLinkedin)
    } else {
      this.linkedin.focus()
    }
  }

  render () {
    const { stage, countdownComplete } = this.state

    const stages = [
      <Stage0 onAction={this.openLinkedin} />,
      <InstructionsPanel onRefocus={this.refocus}>
        <IntructionContent>
          <ol>
            <li>Login</li>
            <li>Select <span className={css(mss.fgMidRed)}>"Pick and choose"</span></li>
            <li>Tick <span className={css(mss.fgMidRed)}>"Connections"</span></li>
            <li>Click <span className={css(mss.fgMidRed)}>"Request archive"</span></li>
            <li>Enter your LinkedIn password</li>
          </ol>
        </IntructionContent>
        <ActionContainer>
          <Button volume='cheer' onClick={this.incrementStage}>Done</Button>
        </ActionContainer>
      </InstructionsPanel>,
      <Main>
        <Heading>
          Wait for LinkedIn to prepare your download
        </Heading>
        <Para>
          It usually takes a couple of minutes to prepare a download of all your connections -
          we&apos;ll get you to check if its ready shortly.
        </Para>
        <Para>
          In the meantime, listen to Jamie, our product lead, share his tips for exploring your
          network to find more people worth nudj'ing.
        </Para>
        <Countdown
          startTime={70000}
          onFinish={this.handleCountdownComplete}
        />
        <Video className={css(style.video, mss.mtLgIi)} />
        {countdownComplete && (
          <Section padding>
            <Button
              volume='cheer'
              onClick={() => {
                this.refreshLinkedin()
                this.incrementStage()
              }}
              style={wizardStyles.action}
            >
              Refresh LinkedIn
            </Button>
          </Section>
        )}
      </Main>,
      <InstructionsPanel onRefocus={this.refocus}>
        <IntructionContent>
          <ol start='6'>
            <li>
              Finally, click <span className={css(mss.fgMidRed)}>"Download archive"</span>
            </li>
          </ol>
        </IntructionContent>
        <ActionContainer>
          <Button
            volume='murmur'
            onClick={this.refreshLinkedin}
            style={mss.mrSmIi}
          >
            Refresh again
          </Button>
          <ButtonLink
            volume='cheer'
            onClick={this.finish}
            href='/setup-network/linkedin/upload'
            style={mss.mlSmIi}
          >
            I've downloaded the file
          </ButtonLink>
        </ActionContainer>
      </InstructionsPanel>
    ]

    return (
      <Layout
        {...this.props}
        title='Step 1: Unlock your network'
      >
        <Helmet>
          <title>Importing your connections from LinkedIn</title>
        </Helmet>
        {stages[stage]}
      </Layout>
    )
  }
}

module.exports = Instructions
