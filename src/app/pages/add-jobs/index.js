const React = require('react')
const { Helmet } = require('react-helmet')

const {
  Button,
  Card
} = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const JobsForm = require('../../components/form-job')
const {
  Heading,
  Para
} = require('../../components/wizard')
const {
  setFieldValue,
  submitJob
} = require('./actions')

class SetupJobsPage extends React.Component {
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
    const { addJobsPage: state } = this.props

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
          <Section padding width='largeI'>
            <Card>
              <JobsForm
                fieldValues={state.fieldValues}
                onFieldChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </Card>
          </Section>
          <Section>
            <Button
              type='submit'
              nonsensitive
              volume='cheer'
              onClick={this.handleSubmit}
            >
              Publish job
            </Button>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
