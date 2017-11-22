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

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }

  // TODO: Break out link building functionality so it can be shared between survey pages
  let next = ''
  const onboardingSegment = get(user, 'hirer.onboarded') ? '' : '/onboarding'
  if (survey.sections.length) {
    next = (
      <Link to={`${onboardingSegment}/surveys/${survey.slug}/sections/${survey.sections[0].id}`}>
        Next
      </Link>
    )
  }

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
      {next}
      <h3>{survey.introTitle}</h3>
      <p>{survey.introDescription}</p>
    </LayoutPage>
  )
}

module.exports = SurveyPage
