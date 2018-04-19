const React = require('react')
const { Helmet } = require('react-helmet')

const { Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')
const Layout = require('../../../components/app-layout')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../../components/wizard')
const Countdown = require('./timer')

const panelHeight = 150

const InstructionsPanel = ({ children }) => (
  <div
    className={css(style.instructionPanel)}
    style={{
      height: `${panelHeight}px`
    }}
  >
    {children}
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
          them directly—which always provides better results 😎
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
    stage: 0
    ,
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
      this.linkedin.focus()

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

  render() {
    const { stage, countdownComplete } = this.state

    const stages = [
      <Stage0 onAction={ this.openLinkedin } />,
      <InstructionsPanel>
        <IntructionContent>
          Select <span className={css(mss.fgMidRed)}>"pick & choose"</span>
        </IntructionContent>
        <ActionContainer>
          <Button volume='cheer' onClick={this.incrementStage}>Selected it!</Button>
        </ActionContainer>
      </InstructionsPanel>,
      <InstructionsPanel>
        <IntructionContent>
          Tick <span className={css(mss.fgMidRed)}>"connections"</span>
        </IntructionContent>
        <ActionContainer>
          <Button volume='cheer' onClick={this.incrementStage}>Ticked it!</Button>
        </ActionContainer>
      </InstructionsPanel>,
      <InstructionsPanel>
        <IntructionContent>
          Click <span className={css(mss.fgMidRed)}>"request archive"</span>
        </IntructionContent>
        <ActionContainer>
          <Button volume='cheer' onClick={this.incrementStage}>Clicked</Button>
        </ActionContainer>
      </InstructionsPanel>,
      !countdownComplete ? (
        <InstructionsPanel>
          <IntructionContent>
            LinkedIn will tell you to await an email, but you can actually just
            refresh the page. You can do that in{' '}
            <Countdown
              startTime={60000}
              onFinish={this.handleCountdownComplete}
            />
          </IntructionContent>
        </InstructionsPanel>
      ) : (
        <InstructionsPanel>
          <Button volume='cheer' onClick={this.refreshLinkedin}>Refresh LinkedIn</Button>
          <Button volume='shout' onClick={this.finish}>I've downloaded the archive</Button>
        </InstructionsPanel>
      ),
      <Main>
        <Section padding>
          <Heading>
            Nice one!
          </Heading>
          <Para>
            Now we'll sync them with Nudj 😎
          </Para>
          <Button
            volume='cheer'
            onClick={() => { alert('🙌 🙌 🙌') }}
            style={mss.mtReg}
          >
            Upload
          </Button>
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