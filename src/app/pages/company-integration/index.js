const React = require('react')
const { Helmet } = require('react-helmet')
const startCase = require('lodash/startCase')

const { Text, Link, Button, Modal } = require('@nudj/components')
const { mss, css } = require('@nudj/components/styles')

const { Heading, Para } = require('../../components/wizard')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const Loader = require('../../components/staged-loader')
const forms = require('./forms')
const style = require('./style.css')
const {
  initialiseValues,
  syncIntegration,
  hideModal,
  showModal,
  submit,
  setErroredField
} = require('./actions')

const descriptions = {
  Greenhouse: (
    <div>
      <Text element='p' style={style.descriptionParagraph}>
        Syncing your account allows you to send any candidates and referrals directly to Greenhouse, and have your Greenhouse jobs displayed on nudj.
      </Text>
      <Text element='p' style={style.descriptionParagraph}>
        Once you&apos;ve generated the appropriate API keys in your Greenhouse account, you can add them here.
      </Text>
      <Text element='p' style={style.descriptionParagraph}>
        See our{' '}
        <Link href='https://help.nudj.co/getting-your-business-ready-to-hire/integrating-with-greenhouse' volume='cheer' subtle inline>
          Greenhouse integration guide
        </Link>
        {' '}to help you get started.
      </Text>
    </div>
  )
}

class CompanyIntegration extends React.Component {
  componentDidMount () {
    const { integration } = this.props.user.hirer.company
    const { verificationError } = this.props

    if (integration) {
      this.props.dispatch(initialiseValues(integration.data))
    }

    if (verificationError) {
      // An error has occured and has been returned whilst attempting to sync for the first time
      this.props.dispatch(setErroredField(verificationError.field, verificationError.message))
    }
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.dispatch(hideModal())

    const { integration: existingIntegration } = this.props.user.hirer.company
    const { type } = this.props.match.params
    const method = existingIntegration ? 'patch' : 'post'

    this.props.dispatch(submit(type, method))
  }

  onSync = type => event => {
    event.preventDefault()
    this.props.dispatch(syncIntegration(type))
  }

  onModalClose = () => {
    this.props.dispatch(hideModal())
  }

  onModalOpen = event => {
    event.preventDefault()
    this.props.dispatch(showModal())
  }

  render () {
    const { companyIntegrationPage: state } = this.props
    const { integration: existingIntegration } = this.props.user.hirer.company
    const { type } = this.props.match.params
    const integrationName = startCase(type)

    const title = `${integrationName} Integration`
    const IntegrationForm = forms[integrationName]

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard
              title={title}
              titleRight={existingIntegration && (
                <Button
                  nonsensitive
                  onClick={this.onSync(type)}
                  context='secondary'
                  disabled={state.syncing || state.verifying}
                >
                  {state.syncing ? <Loader messages={['Syncing']} ellipsis /> : 'Sync'}
                </Button>
              )}
            >
              {descriptions[integrationName]}
              <Modal
                isOpen={state.showModal}
                shouldCloseOnOverlayClick
                shouldCloseOnEsc
                onRequestClose={this.onModalClose}
                style={mss.center}
              >
                <div>
                  <Heading
                    nonsensitive
                    level={2}
                    size='largeIi'
                    style={mss.fgPrimary}
                  >
                    Syncing with {integrationName}
                  </Heading>
                  <img
                    className={css(mss.mtLgIi)}
                    src='/assets/images/fist-bump.svg'
                    alt=''
                  />
                  <Para nonsensitive>
                    Syncing your jobs with {integrationName} means that any jobs that are currently on nudj will be replaced.
                  </Para>
                  <Para nonsensitive>
                    Are you sure you wish to sync?
                  </Para>
                  <div className={css(mss.mtReg)}>
                    <Button
                      nonsensitive
                      onClick={this.onModalClose}
                      volume='murmur'
                      style={mss.mrReg}
                    >
                      Cancel
                    </Button>
                    <Button
                      nonsensitive
                      onClick={this.onSubmit}
                      volume='cheer'
                    >
                      Sync
                    </Button>
                  </div>
                </div>
              </Modal>
            </TitleCard>
            <IntegrationForm {...this.props} onSubmit={this.onSubmit} openModal={this.onModalOpen} />
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = CompanyIntegration
