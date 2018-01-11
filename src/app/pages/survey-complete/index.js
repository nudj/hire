/* global Person SurveyAnswer Location */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')

const { Modal, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')
const sharedStyle = require('../shared.css')

const ListRecommendations = require('./list-recommendations')
const ButtonLink = require('../../components/button-link')
const EmailAuthForm = require('../../components/email-authentication-form')

const getRecommendationCountString = recommendationCount => {
  if (recommendationCount === 1) return `${recommendationCount} person`

  return `${recommendationCount} people`
}

type ViewRecommendationsProps = {
  user?: Person,
  surveyAnswer: SurveyAnswer,
  surveyQuestionPage: {
    selectedConnections: Array<number>
  },
  surveyCompletePage: {
    googleAuthModalOpen: boolean
  },
  location: Location,
  app: {
    csrfToken: string
  }
}

const ViewRecommendationsPage = (props: ViewRecommendationsProps) => {
  const { user, surveyAnswer } = props
  const { connections = [] } = surveyAnswer

  const csrfToken = get(props, 'csrfToken')
  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const selectedContactId = queryParams.get('id')

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>View recommendations</title>
      </Helmet>
      {connections.length > 0 ? (
        <div className={css(sharedStyle.wrapper)}>
          <div className={css(sharedStyle.header)}>
            <Text element='div' size='largeIi' style={sharedStyle.heading}>
              You’ve uncovered{' '}
              <span className={css(sharedStyle.headingHighlight)}>
                {getRecommendationCountString(connections.length)}
              </span>{' '}
              worth nudj’ing within your network
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              Now choose someone you’d like to send a nudj request to.
            </Text>
          </div>
          <div className={css(sharedStyle.body, sharedStyle.cardMedium)}>
            <ListRecommendations recommendations={connections} />
          </div>
          <Modal isOpen={!!selectedContactId} style={style.modalWindow}>
            <EmailAuthForm
              csrfToken={csrfToken}
              action={`?id=${selectedContactId}`}
              method='post'
            />
          </Modal>
        </div>
      ) : (
        <div className={css(sharedStyle.wrapper)}>
          <div className={css(sharedStyle.header)}>
            <Text element='div' size='largeIi' style={sharedStyle.heading}>
              You haven’t found anyone worth nudj’ing within your network
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              We suggest taking the survey again, only this time try to identify
              people who could give you good recommendations, not neccessarily
              those you’d hire.
            </Text>
          </div>
          <div className={css(sharedStyle.body)}>
            <ButtonLink
              href={`/surveys/${get(user, 'hirer.company.survey.slug', '')}`}
              volume='cheer'
            >
              Take survey again
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  )
}

module.exports = ViewRecommendationsPage
