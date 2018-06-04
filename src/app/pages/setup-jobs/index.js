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
const JobsForm = require('../../components/form-job')
const {
  Heading,
  Para
} = require('../../components/wizard')
const {
  onboardCompany,
  setFieldValue,
  submitJob
} = require('./actions')

class SetupJobsPage extends React.Component {
  finishOnboarding = () => {
    const { dispatch } = this.props
    dispatch(onboardCompany())
  }

  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitJob())
  }

  render () {
    const { setupJobsPage: state } = this.props

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
            <Card style={mss.ptSmI}>
              <JobsForm
                fieldValues={state.fieldValues}
                onFieldChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </Card>
          </Section>
          <Section>
            <Button
              nonsensitive
              volume='cheer'
              onClick={this.handleSubmit}
            >
              Save and add another
            </Button>
          </Section>
          <Button
            nonsensitive
            subtle
            volume='cheer'
            onClick={this.finishOnboarding}
          >
            That&apos;s all for now
          </Button>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
