// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const m = require('@nudj/components/lib/css/modifiers.css')

const ListRecommendations = require('../../components/list-recommendations')
const Layout = require('../../components/app-layout')

const Wrapper = require('../../components/wrapper')
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
      <Wrapper>
        <Section padding width='regular' style={m.left}>
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
      </Wrapper>
    </Layout>
  )
}

module.exports = RecommendationsPage