const React = require('react')
const { Helmet } = require('react-helmet')
const _get = require('lodash/get')

// const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')

const SurveyPage = props => {
  // const style = getStyle()
  const survey = _get(props, 'user.hirer.company.survey')

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
      previousUri = `/surveys/${survey.slug}/sections/${
        previousSection.id
      }/${previousQuestion.type.toLowerCase()}/${previousQuestion.id}`
    } else {
      previousUri = `/surveys/${survey.slug}/sections/${previousSection.id}`
    }
  } else {
    previousUri = `/surveys/${survey.slug}`
  }

  return (
    <LayoutPage
      {...props}
      header={headerProps}
      headline='Welcome to Aided Recall 🤔'
    >
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <Link to={previousUri}>
        Back
      </Link>
      <Link to='/connections'>Finish</Link>
      <h3>{survey.outroTitle}</h3>
      <p>{survey.outroDescription}</p>
    </LayoutPage>
  )
}

module.exports = SurveyPage
