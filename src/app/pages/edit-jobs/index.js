const React = require('react')
const { Helmet } = require('react-helmet')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const JobsForm = require('../../components/form-job')
const { createEnumMap } = require('../../lib')
const {
  setFieldValue,
  submitJob,
  initialiseValues
} = require('./actions')

class SetupJobsPage extends React.Component {
  static defaultProps = {
    user: {
      hirer: {
        company: {
          job: {}
        }
      }
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    const { job } = this.props.user.hirer.company

    dispatch(initialiseValues(job))
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
    const { editJobPage: state, csrfToken } = this.props
    const { job } = this.props.user.hirer.company

    const pageTitle = `Edit ${job.title}`
    const jobStatusTypes = createEnumMap(this.props.jobStatusTypes.values)

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Main>
          <Section>
            <JobsForm
              edit
              title={pageTitle}
              csrfToken={csrfToken}
              fieldValues={state.fieldValues}
              onFieldChange={this.handleChange}
              onSubmit={this.handleSubmit}
              jobStatusTypes={jobStatusTypes}
            />
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
