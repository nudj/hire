const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  Input,
  Textarea,
  InputField,
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
  submitQuestion
} = require('./actions')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

class EditSurveyQuestionPage extends React.Component {
  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitQuestion())
  }

  render () {
    const { editSurveyQuestionPage: state, csrfToken } = this.props
    const existingSurveyQuestion = get(this.props, 'user.hirer.company.survey.question')
    const title = existingSurveyQuestion ? `Edit ${existingSurveyQuestion.title}` : 'Add a survey question'

    const fieldValues = fetchFormValues({
      savedState: existingSurveyQuestion,
      localState: state.fieldValues,
      fields: [ 'title', 'description' ]
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
                  Create and customise your question to help guide your team through your survey towards making great referrals.
                </Text>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='title'
                  label='Title'
                  required
                >
                  <Input
                    id='title'
                    placeholder='Question name'
                    name='title'
                    value={fieldValues.title}
                    onChange={this.handleChange}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='description'
                  label='Description'
                >
                  <Textarea
                    id='description'
                    name='description'
                    placeholder="Add a description that you feel best describes your question's goal, and why it's important."
                    value={fieldValues.description}
                    onChange={this.handleChange}
                    styleSheet={{ input: style.textarea }}
                  />
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

module.exports = EditSurveyQuestionPage
