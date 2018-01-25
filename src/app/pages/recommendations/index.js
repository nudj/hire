// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const mss = require('@nudj/components/lib/css/modifiers.css')

const ListRecommendations = require('../../components/list-recommendations')
const Layout = require('../../components/app-layout')

const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading } = require('../../components/app')

const RecommendationsPage = (props: Object) => {
  const answers = get(props, 'surveyAnswers', [])
  const getRecommendationHref = ({id}) => `/messages/new/${id}`

  return (
    <Layout {...props}>
      <Helmet>
        <title>Your recommendations</title>
      </Helmet>
      <Main>
        <Section padding width='regular' style={mss.left}>
          {
            answers.map(answer => {
              const id = get(answer, 'id')
              const surveyTitle = get(answer, 'surveyQuestion.surveySection.survey.introTitle')

              return (
                <div key={id}>
                  <Heading level={2}>
                    { surveyTitle }
                  </Heading>
                  <ListRecommendations
                    recommendations={answer.connections}
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
