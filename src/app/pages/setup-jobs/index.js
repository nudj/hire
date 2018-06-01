const React = require('react')
const { Helmet } = require('react-helmet')

const {
  Button,
  Card
} = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')
const { onboardCompany } = require('./actions')

class SetupJobsPage extends React.Component {
  finishOnboarding = () => {
    const { dispatch } = this.props
    dispatch(onboardCompany())
  }

  render () {
    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Add your jobs</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
            Add your jobs
            </Heading>
            <Para nonsensitive>
              Add a few details about each role you&apos;re hiring for, and
              we&apos;ll add them to our platform.
            </Para>
          </Section>
          <Section padding width='regular'>
            <Card style={mss.ptSmI} />
          </Section>
          <Section padding>
            <Button
              nonsensitive
              volume='cheer'
              disabled
            >
              Save and add another
            </Button>
            <Button
              nonsensitive
              subtle
              volume='cheer'
              onClick={this.finishOnboarding}
            >
              That&apos;s all for now
            </Button>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
