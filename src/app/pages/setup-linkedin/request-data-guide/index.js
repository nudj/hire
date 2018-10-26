const React = require('react')
const { Helmet } = require('react-helmet')

const { Button, Card, Text } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const analytics = require('../../../lib/browser-analytics')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../../components/wizard')
const style = require('../style.css')

const trackLinkedInDownloaded = () => {
  analytics.track({
    object: analytics.objects.linkedIn,
    action: analytics.actions.linkedIn.downloaded
  })
}

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
    }), () => {
      const { stage } = this.state

      if (stage === 1) {
        analytics.track({
          object: analytics.objects.linkedIn,
          action: analytics.actions.linkedIn.opened
        })
      } else if (stage === 2) {
        analytics.track({
          object: analytics.objects.linkedIn,
          action: analytics.actions.linkedIn.refreshed
        })
      }
    })
  }

  render () {
    const { stage } = this.state

    const stages = [
      <Button
        nonsensitive
        onClick={this.openLinkedin}
        style={wizardStyles.action}
      >
        Open LinkedIn in a new tab
      </Button>,
      <Button
        nonsensitive
        volume='cheer'
        onClick={this.openLinkedin}
      >
        Refresh LinkedIn
      </Button>,
      <ButtonLink
        nonsensitive
        volume='shout'
        href='/sync-contacts/linkedin/upload'
        style={wizardStyles.action}
        onClick={trackLinkedInDownloaded}
      >
        I&apos;ve downloaded my connections
      </ButtonLink>
    ]

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Syncing your LinkedIn connections</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Syncing your LinkedIn connections
            </Heading>
            <Para nonsensitive>
              To sync your LinkedIn connections withn nudj you need to export them.
              Read the instructions below and then hit the button to go to LinkedIn.
            </Para>
          </Section>
          <Section padding width='largeI'>
            <Card>
              <ol className={css(style.list)}>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Login to LinkedIn
                </Text>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Click <strong className={css(mss.fgMidRed, mss.bold)}>Pick &amp; Choose</strong>
                </Text>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Tick <strong className={css(mss.fgMidRed, mss.bold)}>Connections</strong>
                </Text>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  Click <strong className={css(mss.fgMidRed, mss.bold)}>Request archive</strong>
                </Text>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
                  You&apos;ll now need to wait for LinkedIn to prepare a download.
                  <strong className={css(mss.bold)}>Wait a minute, then give the other window a refresh.</strong>
                </Text>
                <Text nonsensitive element='li' size='largeIi' style={[mss.light, mss.mtSmIi]}>
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
