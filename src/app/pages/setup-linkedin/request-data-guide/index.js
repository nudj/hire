const React = require('react')
const { Helmet } = require('react-helmet')

const { Button, Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../../components/wizard')
const style = require('../style.css')

class LinkedinRequestGuidePage extends React.Component {
  state = {
    stage: 0
  }

  openLinkedin = () => {
    this.linkedin = window.open('https://www.linkedin.com/psettings/member-data?trk=eml-email_security_dataexport_fast_only_01-hero-1-export', 'nudjLinkedIn')
    window.linkedin = this.linkedin
    this.incrementStage()
  }

  incrementStage = () => {
    this.setState((state) => ({
      stage: state.stage + 1
    }))
  }

  render () {
    const { stage } = this.state

    const stages = [
      <Button
        fsShow
        onClick={this.openLinkedin}
        style={wizardStyles.action}
      >
        Open LinkedIn in a new tab
      </Button>,
      <Button
        fsShow
        volume='cheer'
        onClick={this.openLinkedin}
      >
        Refresh LinkedIn
      </Button>,
      <ButtonLink
        fsShow
        volume='shout'
        href='/setup-network/linkedin/upload'
        style={wizardStyles.action}
      >
        I&apos;ve downloaded my connections
      </ButtonLink>
    ]

    return (
      <Layout {...this.props} title='Step 1: Unlock your network'>
        <Helmet>
          <title>Syncing your LinkedIn connections</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading fsShow>
              Syncing your LinkedIn connections
            </Heading>
            <Para fsShow>
              To sync your LinkedIn connections withn nudj you need to export them.
              Read the instructions below and then hit the button to go to LinkedIn.
            </Para>
          </Section>
          <Section padding width='largeI'>
            <Card>
              <ol className={css(style.list)}>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Login to LinkedIn
                </Text>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Click <strong className={css(mss.fgMidRed, mss.bold)}>Pick &amp; Choose</strong>
                </Text>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Tick <strong className={css(mss.fgMidRed, mss.bold)}>Connections</strong>
                </Text>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Click <strong className={css(mss.fgMidRed, mss.bold)}>Request archive</strong>
                </Text>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  You&apos;ll now need to wait for LinkedIn to prepare a download.
                  <strong className={css(mss.bold)}>Wait a minute, then give the other window a refresh.</strong>
                </Text>
                <Text fsShow element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Finally, click <strong className={css(mss.fgMidRed, mss.bold)}>Download archive</strong>
                </Text>
              </ol>
            </Card>
          </Section>
          <Section padding>
            {stages[stage]}
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = LinkedinRequestGuidePage
