const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const capitalise = require('lodash/capitalize')

const {
  Input,
  Textarea,
  InputField,
  Select,
  Button,
  Text
} = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const fetchFormValues = require('../../lib/fetch-form-values')
const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  setFieldValue,
  submitSurvey
} = require('./actions')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

class EditSurveyPage extends React.Component {
  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitSurvey())
  }

  render () {
    const { editSurveyPage: state, csrfToken, surveyStatuses } = this.props
    const existingSurvey = get(this.props, 'user.hirer.company.survey')
    const title = existingSurvey ? `Edit ${existingSurvey.introTitle}` : 'Create a survey'

    const fieldValues = fetchFormValues({
      savedState: existingSurvey,
      localState: state.fieldValues,
      fields: [ 'introTitle', 'introDescription', 'status' ]
    })

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <form className={css(style.form)} onSubmit={this.handleSubmit}>
              <TitleCard title={title}>
                <Text element='p' style={style.descriptionParagraph}>
                  Create and customise a survey to help your team find those in their networks to reach out to, and help uncover hidden talent that otherwise gets lost.
                </Text>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='introTitle'
                  label='Title'
                  required
                >
                  <Input
                    id='introTitle'
                    placeholder='Survey name'
                    name='introTitle'
                    value={fieldValues.introTitle}
                    onChange={this.handleChange}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='introDescription'
                  label='Description'
                >
                  <Textarea
                    id='introDescription'
                    name='introDescription'
                    placeholder="Add a description that you feel best describes your survey's goal, and what kind of questions your team can expect to answer."
                    value={fieldValues.introDescription}
                    onChange={this.handleChange}
                    styleSheet={{ input: style.textarea }}
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='status'
                  label='Status'
                  required
                >
                  <Select
                    id='status'
                    name='status'
                    value={fieldValues.status}
                    onChange={this.handleChange}
                    required
                  >
                    <option value='' disabled>Choose a status</option>
                    {Object.keys(surveyStatuses).map(status => (
                      <option key={status} value={status}>
                        {capitalise(status)}
                      </option>
                    ))}
                  </Select>
                </InputField>
                <input name='_csrf' value={csrfToken} type='hidden' />
                <Button
                  style={mss.mtLgIi}
                  type='submit'
                  context='primary'
                >
                  Save
                </Button>
              </TitleCard>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

EditSurveyPage.defaultProps = {
  surveyStatuses: {}
}

module.exports = EditSurveyPage
