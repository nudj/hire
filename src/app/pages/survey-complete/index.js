/* global Person SurveyAnswer Location */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const flatten = require('lodash/flatten')
const uniqBy = require('lodash/uniqBy')
const URLSearchParams = require('url-search-params')

const { Modal } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const ListRecommendations = require('../../components/list-recommendations')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const EmailAuthForm = require('../../components/email-authentication-form')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const getRecommendationCountString = recommendationCount => {
  if (recommendationCount === 1) return `${recommendationCount} person`

  return `${recommendationCount} people`
}

type ViewRecommendationsProps = {
  user?: Person,
  surveyAnswers: Array<SurveyAnswer>,
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
  const { user, surveyAnswers } = props

  const connections = uniqBy(
    flatten(surveyAnswers.map(answer => answer.connections)),
    connection => connection.id
  )

  const csrfToken = get(props, 'csrfToken')
  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const selectedContactId = queryParams.get('id')

  const getRecommendationHref = ({id}) => `?id=${id}`

  return (
    <Layout {...props} title='Part 3 - Send nudjes'>
      <Helmet>
        <title>View recommendations</title>
      </Helmet>
      {connections.length > 0 ? (
        <Main>
          <Section padding>
            <Heading>
              You’ve uncovered{' '}
              <span className={css(mss.fgMidRed)}>
                {getRecommendationCountString(connections.length)}
              </span>{' '}
              worth nudj’ing from within your network
            </Heading>
            <Para>
              Now choose someone you’d like to send a nudj request to.
            </Para>
          </Section>
          <Section padding width='regular'>
            <ListRecommendations
              recommendations={connections}
              getHref={getRecommendationHref}
            />
          </Section>
          <Modal isOpen={!!selectedContactId} style={style.modalWindow}>
            <EmailAuthForm
              csrfToken={csrfToken}
              action={`?id=${selectedContactId}`}
              method='post'
            />
          </Modal>
        </Main>
      ) : (
        <Main>
          <Section padding>
            <Heading>
              You haven&#39;t found anyone worth nudj&#39;ing within your network
            </Heading>
            <Para>
              We suggest taking the survey again, only this time try to identify
              people who could give you good recommendations, not neccessarily
              those you&#39;d hire.
            </Para>
          </Section>
          <Section padding>
            <ButtonLink
              style={wizardStyles.action}
              href={`/surveys/${get(user, 'hirer.company.survey.slug', '')}`}
              volume='cheer'
            >
              Take survey again
            </ButtonLink>
          </Section>
        </Main>
      )}
    </Layout>
  )
}

module.exports = ViewRecommendationsPage
