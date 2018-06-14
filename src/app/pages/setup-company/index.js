const React = require('react')
const { Helmet } = require('react-helmet')

const {
  Button,
  Card,
  Text,
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
  componentDidMount () {
    const { dispatch, enrichmentData } = this.props
    const { enrichedCompany } = enrichmentData

    if (enrichedCompany) {
      const { name, location, description } = enrichedCompany

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
          <title>Set up company</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
            Set up your company
            </Heading>
            <Para nonsensitive>
              Tell us a bit more about your business, including where you&apos;re based.
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
                  <Text element='div' nonsensitive style={mss.mtSmIi}>If you&apos;re all remote, just put remote</Text>
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
                  <Text element='div' style={mss.mtSmIi} nonsensitive>Briefly describe your company</Text>
                </InputField>
                <input name='_csrf' value={csrfToken} type='hidden' />
              </Card>
              <Button
                nonsensitive
                type='submit'
                volume='cheer'
                style={mss.mtLgIi}
              >
                Create company
              </Button>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupCompanyPage
