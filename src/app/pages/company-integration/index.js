const React = require('react')
const { Helmet } = require('react-helmet')
const startCase = require('lodash/startCase')

const { Text, Link, Button } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const Loader = require('../../components/staged-loader')
const forms = require('./forms')
const style = require('./style.css')
const { initialiseValues, syncIntegration } = require('./actions')

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

    if (integration) {
      this.props.dispatch(initialiseValues(integration.data))
    }
  }

  onSync = type => event => {
    event.preventDefault()
    this.props.dispatch(syncIntegration(type))
  }

  render () {
    const { companyIntegrationPage: state } = this.props
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
              titleRight={(
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
            </TitleCard>
            <IntegrationForm {...this.props} />
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = CompanyIntegration