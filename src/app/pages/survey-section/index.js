const React = require('react')
const { Helmet } = require('react-helmet')
const _get = require('lodash/get')
const _findIndex = require('lodash/findIndex')

// const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')

const SurveyPage = props => {
  // const style = getStyle()
  const survey = _get(props, 'user.hirer.company.survey')
  const section = _get(survey, 'section')
  const onboardingSegment = _get(props, 'user.hirer.onboarded') ? '' : '/onboarding'

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }

  let previousUri = ''
  const sectionIndex = _findIndex(survey.sections, { id: section.id })
  const previousSection = survey.sections[sectionIndex - 1]
  if (previousSection) {
    const previousQuestionsLength =
      previousSection.questions && previousSection.questions.length
    if (previousQuestionsLength) {
      const previousQuestion =
        previousSection.questions[previousQuestionsLength - 1]
      previousUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${
        previousSection.id
      }/${previousQuestion.type.toLowerCase()}/${previousQuestion.id}`
    } else {
      previousUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${previousSection.id}`
    }
  } else {
    previousUri = `${onboardingSegment}/surveys/${survey.slug}`
  }

  let nextUri = ''
  if (section.questions && section.questions.length) {
    nextUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${
      section.id
    }/${section.questions[0].type.toLowerCase()}/${section.questions[0].id}`
  } else {
    const sectionIndex = _findIndex(survey.sections, { id: section.id })
    const nextSection = survey.sections[sectionIndex + 1]
    if (nextSection) {
      nextUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${nextSection.id}`
    } else {
      nextUri = `${onboardingSegment}/surveys/${survey.slug}/complete`
    }
  }

  return (
    <LayoutPage
      {...props}
      header={headerProps}
      headline='Welcome to Aided Recall 🤔'
    >
      <Helmet>
        <title>nudj - Survey Section</title>
      </Helmet>
      <Link to={previousUri}>Previous</Link>
      <Link to={nextUri}>Next</Link>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
    </LayoutPage>
  )
}

module.exports = SurveyPage
