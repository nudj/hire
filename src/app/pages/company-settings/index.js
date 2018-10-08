const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Button, Text, Textarea, InputField } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const style = require('./style.css')
const {
  setFieldValue,
  initialiseValues,
  submitCompanyDetails
} = require('./actions')

const descriptionPlaceholder = 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.'

class CompanySettingsPage extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    const { description } = this.props.user.hirer.company

    dispatch(initialiseValues({ description }))
  }

  handleChange = event => {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(setFieldValue(event.name, event.value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitCompanyDetails())
  }

  render () {
    const { companySettingsPage: state } = this.props
    const company = get(this.props, 'user.hirer.company', {})

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Company settings</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard title='Company details'>
              <InputField
                styleSheet={{ root: style.field, label: style.fieldLabel }}
                htmlFor='name'
                label='Name'
              >
                <Text style={mss.bold}>{company.name}</Text>
              </InputField>
              <InputField
                styleSheet={{ root: style.field, label: style.fieldLabel }}
                htmlFor='description'
                label='Description'
                required
              >
                <Textarea
                  id='description'
                  placeholder={descriptionPlaceholder}
                  name='description'
                  onChange={this.handleChange}
                  styleSheet={{ input: style.textarea }}
                  value={state.fieldValues.description}
                  required
                />
              </InputField>
              <Button
                nonsensitive
                onClick={this.handleSubmit}
                volume='cheer'
                style={mss.mtReg}
              >
                Save
              </Button>
            </TitleCard>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = CompanySettingsPage
