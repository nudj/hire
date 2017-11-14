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

  let next = ''
  if (survey.sections.length) {
    next = (
      <Link to={`/surveys/${survey.slug}/sections/${survey.sections[0].id}`}>
        Next
      </Link>
    )
  } else {
    next = ''
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
      {next}
      <h3>{survey.title}</h3>
      <p>{survey.description}</p>
    </LayoutPage>
  )
}

module.exports = SurveyPage
