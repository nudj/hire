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
          Request your connections from LinkedIn
        </Heading>
        <Para>
          We're going to sync your LinkedIn connections with nudj, so we can give you better
          insights into whose suitable for your open roles, and so you'll be able to email
          them directly—which always provides better results.
        </Para>
        <Para>
          To start, we'll need to download your connections from LinkedIn
        </Para>
        <Button
          volume='cheer'
          onClick={onAction}
          style={mss.mtReg}
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
    countdownComplete: false,
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

  render() {
    const { stage, countdownComplete } = this.state

    const stages = [
      <Stage0 onAction={ this.openLinkedin } />,
      <InstructionsPanel onRefocus={this.refocus}>
        <IntructionContent>
          <ol>
            <li>Select <span className={css(mss.fgMidRed)}>"pick & choose"</span></li>
            <li>Tick <span className={css(mss.fgMidRed)}>"connections"</span></li>
            <li>Click <span className={css(mss.fgMidRed)}>"request archive"</span></li>
          </ol>
        </IntructionContent>
        <ActionContainer>
          <Button volume='cheer' onClick={this.incrementStage}>All done!</Button>
        </ActionContainer>
      </InstructionsPanel>,
      <Main>
        <Heading>
          While you wait for LinkedIn to do its thing…
        </Heading>
        <Para>
          Listen to Jamie, our product manager, give his tips for exploring your
          network to find more people worth asking for referrals
        </Para>
        <Countdown
          startTime={81000}
          onFinish={this.handleCountdownComplete}
        />
        <Video className={css(style.video, mss.mtLgIi)} />
        {countdownComplete && (
          <div className={css(mss.mtReg)}>
            <Button
              volume='cheer'
              onClick={() => {
                this.refreshLinkedin()
                this.incrementStage()
              }}
              style={mss.mrSmIi}
            >
              Refresh LinkedIn
            </Button>
          </div>
        )}
      </Main>,
      <InstructionsPanel onRefocus={this.refocus}>
        <IntructionContent>
          And finally, <span className={css(mss.fgMidRed)}>download your archive</span>
        </IntructionContent>
        <ActionContainer>
          <Button
            volume='cheer'
            onClick={this.refreshLinkedin}
            style={mss.mrSmIi}
          >
            Refresh again
          </Button>
          <Button
            volume='shout'
            onClick={this.finish}
            style={mss.mlSmIi}
          >
            Downloaded!
          </Button>
        </ActionContainer>
      </InstructionsPanel>,
      <Main>
        <Section padding>
          <Heading>
            Nice one!
          </Heading>
          <Para>
            We're almost done syncing your connections with nudj. The last
            step is to upload them into nudj and start making referrals!
          </Para>
          <ButtonLink
            volume='cheer'
            href='/setup-network/linkedin/upload'
            style={mss.mtReg}
          >
            Sync LinkedIn connections
          </ButtonLink>
        </Section>
      </Main>
    ]

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Request your connections from LinkedIn</title>
        </Helmet>
        {stages[stage]}
      </Layout>
    )
  }
}


module.exports = Instructions