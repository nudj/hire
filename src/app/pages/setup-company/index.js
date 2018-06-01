const React = require('react')
const { Helmet } = require('react-helmet')
const dedent = require('dedent')

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
  setFieldValue,
  submitCompany
} = require('./actions')

class SetupCompanyPage extends React.Component {
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
    const { setupCompanyPage: state } = this.props
    const { fieldValues } = state

    const descriptionPlaceholder = dedent(`
      Apple Inc. is an American multinational technology company headquartered in
      Cupertino, California, that designs, develops, and sells consumer electronics,
      computer software, and online services
    `)

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
          <Section padding width='regular'>
            <Card style={mss.ptSmI}>
              <form className={css(style.form)} onSubmit={this.handleSubmit}>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='name'
                  label='Name'
                  required
                >
                  <Input
                    id='name'
                    placeholder='Apple'
                    name='name'
                    value={fieldValues.name}
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
              </form>
            </Card>
          </Section>
          <Section padding>
            <Button
              nonsensitive
              onClick={this.handleSubmit}
              volume='cheer'
              style={style.sendInvitesButton}
            >
              Create company
            </Button>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupCompanyPage
