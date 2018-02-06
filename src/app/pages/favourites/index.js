// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const uniqBy = require('lodash/uniqBy')
const flatten = require('lodash/flatten')

const mss = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const ListRecommendations = require('../../components/list-recommendations')
const Layout = require('../../components/app-layout')

const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/wizard')

const RecommendationsPage = (props: Object) => {
  const surveyAnswers = get(props, 'surveyAnswers', [])

  const connections = uniqBy(
    flatten(surveyAnswers.map(answer => answer.connections)),
    'id'
  )

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
        <title>Favourites</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading>
            View your favourites
          </Heading>
          <Para>
            These are your go-to people who can help you find your next hires.
          </Para>
        </Section>
        <Section padding width='regular'>
          {
            Object.keys(surveysMap).map((surveySlug) => {
              const survey = surveysMap[surveySlug]

              return (
                <div key={survey}>
                  <ListRecommendations
                    recommendations={connections}
                    getHref={getRecommendationHref}
                  />
                </div>
              )
            })
          }
        </Section>
        <ButtonLink
          subtle
          volume='cheer'
          href={'/contacts'}
          style={mss.mtReg}
        >
          View all contacts
        </ButtonLink>
      </Main>
    </Layout>
  )
}

module.exports = RecommendationsPage
