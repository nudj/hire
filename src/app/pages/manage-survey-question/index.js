const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, InputField, Link } = require('@nudj/components')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const Dropdown = require('../../components/dropdown')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

const ManageSurveyQuestionPage = props => {
  const survey = get(props, 'user.hirer.company.survey', {})
  const question = get(survey, 'question', {})
  const title = 'Question details'

  console.log(props, { survey, question })

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <TitleCard
            title={title}
            titleRight={(
              <Dropdown
                id='question-actions'
                header='Actions'
                chevron
              >
                <Link
                  href={`/manage/surveys/${survey.slug}/questions/${question.slug}/edit`}
                  subtle
                >
                  Edit
                </Link>
              </Dropdown>
            )}
          >
            <InputField
              styleSheet={inputFieldStylesheet}
              htmlFor='title'
              label='Title'
              required
            >
              <Text id='title'>
                {question.title}
              </Text>
            </InputField>
            {question.description && (
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='description'
                label='Description'
              >
                <Text id='description'>
                  {question.description}
                </Text>
              </InputField>
            )}
          </TitleCard>
        </Section>
      </Main>
    </Layout>
  )
}

ManageSurveyQuestionPage.defaultProps = {
  survey: {}
}

module.exports = ManageSurveyQuestionPage
