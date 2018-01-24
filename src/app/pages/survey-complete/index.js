/* global Person SurveyAnswer Location */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const find = require('lodash/find')
const URLSearchParams = require('url-search-params')

const { Modal, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')
const sharedStyle = require('../shared.css')

const ListRecommendations = require('./list-recommendations')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
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
  csrfToken: string
}

const ViewRecommendationsPage = (props: ViewRecommendationsProps) => {
  const { user, surveyAnswer, csrfToken } = props
  const { connections = [] } = surveyAnswer

  const emailPreference = get(user, 'emailPreference')
  const onboarded = get(user, 'hirer.onboarded', false)
  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const selectedContactId = queryParams.get('id')

  const uncontacted = connections.filter(connection => {
    return !find(user.conversations, {
      recipient: { email: connection.person.email }
    })
  })

  return (
    <Layout
      {...props}
      styleSheet={{root: sharedStyle.root}}
      title='Part 3 - Send nudjes'
    >
      <Helmet>
        <title>View recommendations</title>
      </Helmet>
      {connections.length > 0 ? 
        uncontacted.length > 0 ? (
          <div className={css(sharedStyle.wrapper)}>
            <div className={css(sharedStyle.header)}>
              <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
                You’ve uncovered{' '}
                <span className={css(sharedStyle.headingHighlight)}>
                  {getRecommendationCountString(connections.length)}
                </span>{' '}
                worth nudj’ing from within your network
              </Text>
              <Text element='p' style={sharedStyle.subheading}>
                Now choose someone you’d like to send a nudj request to.
              </Text>
            </div>
            <div className={css(sharedStyle.body, sharedStyle.cardMedium)}>
              <ListRecommendations recommendations={uncontacted} emailPreference={emailPreference} />
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
              <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
                You’ve sent messages to all {' '}
                <span className={css(sharedStyle.headingHighlight)}>
                  {getRecommendationCountString(connections.length)}
                </span>{' '}
                worth nudj’ing
              </Text>
              <Text element='p' style={sharedStyle.subheading}>
                { /* TODO: Finished copy */ }
                So sit back, relax, and wait for them to reply.
              </Text>
            </div>
          </div>
        )
      : (
        <div className={css(sharedStyle.wrapper)}>
          <div className={css(sharedStyle.header)}>
            <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
              You haven&#39;t found anyone worth nudj&#39;ing within your network
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              We suggest taking the survey again, only this time try to identify
              people who could give you good recommendations, not neccessarily
              those you&#39;d hire.
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
    </Layout>
  )
}

module.exports = ViewRecommendationsPage
