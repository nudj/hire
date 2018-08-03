const React = require('react')
const { Helmet } = require('react-helmet')

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
    const { setupJobsPage: state, csrfToken } = this.props

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Add your first job</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
            Add your first job
            </Heading>
            <Para nonsensitive>
              Time to get down to business - let&apos;s get ready to nudj
            </Para>
          </Section>
          <Section padding width='largeI'>
            <JobsForm
              csrfToken={csrfToken}
              fieldValues={state.fieldValues}
              onFieldChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
