// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const uniqBy = require('lodash/uniqBy')
const flatten = require('lodash/flatten')

const mss = require('@nudj/components/lib/css/modifiers.css')

const ListRecommendations = require('../../components/list-recommendations')
const Layout = require('../../components/app-layout')

const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading } = require('../../components/app')

const RecommendationsPage = (props: Object) => {
  const surveyAnswers = get(props, 'surveyAnswers', [])
  const getRecommendationHref = ({id}) => `/messages/new/${id}`

  const surveysMap = surveyAnswers.reduce((surveys, answer) => {
    const survey = answer.surveyQuestion.surveySection.survey
    const answers = get(surveys, `[${survey.slug}].answers`, [])
    answers.push(answer)

    return {
      ...surveys,
      [survey.slug]: {
        ...survey,
        answers
      }
    }
  }, {})

  return (
    <Layout {...props}>
      <Helmet>
        <title>Your recommendations</title>
      </Helmet>
      <Main>
        <Section padding width='regular' style={mss.left}>
          {
            Object.keys(surveysMap).map((surveySlug) => {
              const survey = surveysMap[surveySlug]
              const { introTitle, answers } = survey

              const connections = uniqBy(
                flatten(answers.map(answer => answer.connections)),
                'id'
              )

              return (
                <div key={survey}>
                  <Heading level={2}>
                    { introTitle }
                  </Heading>
                  <ListRecommendations
                    recommendations={connections}
                    getHref={getRecommendationHref}
                  />
                </div>
              )
            })
          }
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = RecommendationsPage
