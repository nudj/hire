const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')

const SurveyPage = props => {
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification
  } = props
  const survey = get(user, 'hirer.company.survey')
  const onboardingSegment = get(user, 'hirer.onboarded') ? '' : '/onboarding'

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }

  let previousUri = ''
  const previousSection = survey.sections[survey.sections.length - 1]
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
  const nextUri = get(user, 'hirer.onboarded') ? '/connections' : '/'

  return (
    <LayoutPage
      tooltip={tooltip}
      user={user}
      history={history}
      dispatch={dispatch}
      overlay={overlay}
      dialog={dialog}
      onPageLeave={onPageLeave}
      notification={notification}
      header={headerProps}
      headline='Welcome to Aided Recall 🤔'
    >
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <Link to={previousUri}>
        Back
      </Link>
      <Link to={nextUri}>Finish</Link>
      <h3>{survey.outroTitle}</h3>
      <p>{survey.outroDescription}</p>
    </LayoutPage>
  )
}

module.exports = SurveyPage
