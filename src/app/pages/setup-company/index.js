const React = require('react')
const { Helmet } = require('react-helmet')

const {
  Button,
  Card,
  Input,
  InputField,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const style = require('./style.css')
const {
  Heading,
  Para
} = require('../../components/wizard')
const {
  initFieldValues,
  setFieldValue,
  submitCompany
} = require('./actions')

class SetupCompanyPage extends React.Component {
  static defaultProps = {
    enrichmentData: {}
  }

  componentDidMount () {
    const { dispatch, enrichmentData } = this.props
    const { enrichedCompany } = enrichmentData

    if (enrichedCompany) {
      const { name, geo, description } = enrichedCompany
      const location = (geo && geo.city) || enrichedCompany.location

      dispatch(initFieldValues({
        name,
        location,
        description
      }))
    }
  }

  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitCompany())
  }

  render () {
    const { setupCompanyPage: state, csrfToken, enrichmentData } = this.props
    const { fieldValues } = state

    const companyName = enrichmentData.company && enrichmentData.company.name
    const isClient = enrichmentData.company && enrichmentData.company.client
    const nameError = isClient && fieldValues.name === companyName
      ? (
        <span>
          It looks like your company is already using nudj.<br />
          Something not right?{' '}
          <a
            className={css(style.errorLink)}
            id='open-intercom'
            href='mailto:help@nudj.co'
          >
            Get in touch
          </a>.
        </span>
      ) : false

    const descriptionPlaceholder = 'Apple Inc. is an American multinational ' +
      'technology company headquartered in Cupertino, California, that ' +
      'designs, develops, and sells consumer electronics, computer software, ' +
      'and online services.'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Create company</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
            Company profile
            </Heading>
            <Para nonsensitive>
              This will appear on all of your job listings. Give a short description
              of your company and why it&apos;s a great place to work.
            </Para>
          </Section>
          <Section padding width='largeI'>
            <form className={css(style.form)} onSubmit={this.handleSubmit}>
              <Card style={style.card}>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='name'
                  label='Company Name'
                  required
                >
                  <Input
                    id='name'
                    placeholder='Apple'
                    name='name'
                    value={fieldValues.name}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    error={nameError}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='location'
                  label='Location'
                  required
                >
                  <Input
                    id='location'
                    placeholder='Cupertino, California'
                    name='location'
                    value={fieldValues.location}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='description'
                  label='Description'
                  required
                >
                  <Textarea
                    id='description'
                    placeholder={descriptionPlaceholder}
                    name='description'
                    value={fieldValues.description}
                    onChange={this.handleChange}
                    styleSheet={{ input: style.textarea }}
                    required
                  />
                </InputField>
                <input name='_csrf' value={csrfToken} type='hidden' />
              </Card>
              <Button
                nonsensitive
                type='submit'
                volume='cheer'
                style={mss.mtLgIi}
              >
                Save
              </Button>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupCompanyPage
