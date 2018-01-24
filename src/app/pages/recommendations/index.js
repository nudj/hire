// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const templateHelper = require('../../lib/templateHelper')
const ListRecommendations = require('../../components/list-recommendations')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')

const RecommendationsPage = (props: Object) => {
  const answers = get(props, 'surveyAnswers', [])
  const recommendationHrefTemplate = templateHelper`/messages/new/${'id'}`

  return (
    <Layout {...props} styleSheet={{root: sharedStyle.root}}>
      <Helmet>
        <title>Your recommendations</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.body, sharedStyle.cardMedium)}>
          {
            answers.map(answer => {
              const id = get(answer, 'id')
              const surveyTitle = get(answer, 'surveyQuestion.surveySection.survey.introTitle')

              return (
                <div key={id}>
                  <Text element='div' size='largeI' style={sharedStyle.heading}>
                    { surveyTitle }
                  </Text>
                  <ListRecommendations
                    recommendations={answer.connections}
                    hrefTemplate={recommendationHrefTemplate}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}

module.exports = RecommendationsPage
