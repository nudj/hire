const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const capitalise = require('lodash/capitalize')
const { Link: RRLink } = require('react-router-dom')

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

const ManageSurveyPage = props => {
  const survey = get(props, 'user.hirer.company.survey', {})
  const title = 'Survey details'

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <TitleCard
            title={title}
            actions={Action => [
              <Action
                key='questions'
                Component={RRLink}
                to={`/manage/surveys/${survey.slug}/questions`}
              >
                View questions ({survey.questions.length})
              </Action>
            ]}
            titleRight={(
              <Dropdown
                id='teammate'
                header='Actions'
                chevron
              >
                <Link
                  href={`/manage/surveys/${survey.slug}/edit`}
                  subtle
                >
                  Edit
                </Link>
              </Dropdown>
            )}
          >
            <InputField
              styleSheet={inputFieldStylesheet}
              htmlFor='introTitle'
              label='Title'
              required
            >
              <Text id='introTitle'>
                {survey.introTitle}
              </Text>
            </InputField>
            {survey.introDescription && (
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='introDescription'
                label='Description'
              >
                <Text id='introDescription'>
                  {survey.introDescription}
                </Text>
              </InputField>
            )}
            <InputField
              styleSheet={inputFieldStylesheet}
              htmlFor='status'
              label='Status'
            >
              <Text id='status'>{capitalise(survey.status)}</Text>
            </InputField>
          </TitleCard>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ManageSurveyPage
