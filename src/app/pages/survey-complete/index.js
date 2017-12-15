const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const sharedStyle = require('../shared.css')

// TODO: get real recommendations
const recommendations = [
  {
    id: 'finn',
    name: 'Finn Wolfhard',
    jobTitle: 'Mike Wheeler',
    company: 'Stanger Things',
    recommendedFor: ['Intelligent', 'Conscientious', 'Student']
  },
  {
    id: 'millie',
    name: 'Millie Bobby Brown',
    jobTitle: 'Eleven',
    company: 'Stanger Things',
    recommendedFor: [
      'Psychokinetic',
      'Unusual appearance',
      'Limited vocabulary'
    ]
  },
  {
    id: 'gaten',
    name: 'Gaten Matarazzo',
    jobTitle: 'Dustin Henderson',
    company: 'Stanger Things',
    recommendedFor: [
      'Cleidocranial dysplasia',
      'New front teeth',
      'Attraction to Max'
    ]
  },
  {
    id: 'caleb',
    name: 'Caleb McLaughlin',
    jobTitle: 'Lucas Sinclair',
    company: 'Stanger Things',
    recommendedFor: ['Wary of Eleven', "Max's love interest"]
  },
  {
    id: 'will',
    name: 'Noah Schnapp',
    jobTitle: 'Will Byers',
    company: 'Stanger Things',
    recommendedFor: ['Upside Down capture', 'Host']
  }
]

const ListRecommendations = require('./list-recommendations')

const getRecommendationCountString = recommendationCount => {
  if (recommendationCount === 1) return `${recommendationCount} people`

  return `${recommendationCount} people`
}

const ViewRecommendationsPage = props => {
  console.log(props)

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
              {getRecommendationCountString(recommendations.length)}
            </span>{' '}
            worth nudj’ing within your network
          </Text>
          <Text element="p" style={sharedStyle.subheading}>
            Now choose someone you’d like to send a nudj request to.
          </Text>
        </div>

        <div className={css(sharedStyle.body)}>
          <ListRecommendations recommendations={recommendations} />
        </div>
      </div>
    </div>
  )
}

module.exports = ViewRecommendationsPage
