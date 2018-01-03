const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const sharedStyle = require('../shared.css')

const ListRecommendations = require('./list-recommendations')

const getRecommendationCountString = recommendationCount => {
  if (recommendationCount === 1) return `${recommendationCount} people`

  return `${recommendationCount} people`
}

const ViewRecommendationsPage = ({ user, surveyQuestionPage }) => {
  const selectedConnections = get(surveyQuestionPage, 'selectedConnections', [])
  const connections = get(user, 'connections', []).filter(
    connection => selectedConnections.indexOf(connection.id) > -1
  )

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>View recommendations</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element="div" size="largeIi" style={sharedStyle.heading}>
            You’ve uncovered{' '}
            <span className={css(sharedStyle.headingHighlight)}>
              {getRecommendationCountString(connections.length)}
            </span>{' '}
            worth nudj’ing within your network
          </Text>
          <Text element="p" style={sharedStyle.subheading}>
            Now choose someone you’d like to send a nudj request to.
          </Text>
        </div>

        <div className={css(sharedStyle.body, sharedStyle.cardMedium)}>
          <ListRecommendations recommendations={connections} />
        </div>
      </div>
    </div>
  )
}

module.exports = ViewRecommendationsPage
