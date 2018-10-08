const React = require('react')
const { Helmet } = require('react-helmet')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const JobsForm = require('../../components/form-job')
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
    const { addJobPage: state, csrfToken } = this.props
    const title = 'Add a job'
    const description = 'Add a few details about the role you\'re hiring for, and we\'ll add it to our platform.'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <JobsForm
              title={title}
              description={description}
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
