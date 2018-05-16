/* global sessionStorage */
const React = require('react')
const { Helmet } = require('react-helmet')

const { Button } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')

const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const regex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/

const checkMobileDevice = Component =>
  class extends React.Component {
    state = {
      showOverlay: false
    }

    componentDidMount () {
      if (
        regex.test(navigator.userAgent) &&
        sessionStorage.getItem('nudj-continue-onboarding') !== 'true'
      ) {
        this.showOverlay()
      }
    }

    showOverlay = () => {
      this.setState({ showOverlay: true })
      sessionStorage.setItem('nudj-continue-onboarding', false)
    }

    dismissOverlay = () => {
      this.setState({
        showOverlay: false
      })

      sessionStorage.setItem('nudj-continue-onboarding', true)
    }

    render () {
      const { showOverlay } = this.state

      if (!showOverlay) return <Component {...this.props} />

      return (
        <Layout {...this.props} title=''>
          <Helmet>
            <title>You need to be at a computer to setup your account</title>
          </Helmet>
          <Main>
            <Section padding>
              <Heading fsShow>
                You need to be at a computer to setup your account
              </Heading>
              <Para fsShow>
                Because you need to download large files and upload them, you
                need to use a desktop or laptop computer to set up your account.
              </Para>
              <Para fsShow>
                We can email you a link so you can pick this up as soon as
                you’re back at a computer.
              </Para>
            </Section>
            <Section padding>
              <form action='/continue-onboarding'>
                <Button
                  fsShow
                  type='submit'
                  volume='cheer'
                  style={wizardStyles.action}
                >
                  Send me a link
                </Button>
              </form>
              <Button
                fsShow
                subtle
                onClick={this.dismissOverlay}
                style={[wizardStyles.action, mss.pl0, mss.pr0]}
              >
                I&apos;m using a computer
              </Button>
            </Section>
          </Main>
        </Layout>
      )
    }
  }

module.exports = checkMobileDevice
