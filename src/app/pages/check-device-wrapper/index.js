const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const regex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/

const checkMobileDevice = Component => class extends React.Component {
  state = {
    showOverlay: false
  }

  componentDidMount() {
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

  render() {
    const { showOverlay } = this.state

    if (!showOverlay) return <Component {...this.props} />

    return (
      <Layout {...this.props} title="" styleSheet={{ root: sharedStyle.root }}>
        <Helmet>
          <title>Continue onboarding?</title>
        </Helmet>
        <div className={css(sharedStyle.wrapper)}>
          <Text element='div' size='largeIi' style={sharedStyle.heading}>
            You need to be at a computer to setup your account
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            Because you need to download large files and upload them, you need
            to use a desktop or laptop computer to set up your account.
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            We can email you a link so you can pick this up as soon as you’re
            back at a computer.
          </Text>
          <form action='/continue-onboarding'>
            <Button type='submit' volume='cheer' style={style.sendButton}>
              Send me a link
            </Button>
          </form>
          <Button subtle onClick={this.dismissOverlay}  style={style.continueButton}>
            I'm using a computer
          </Button>
        </div>
      </Layout>
    )
  }
}

module.exports = checkMobileDevice
