const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const flatten = require('lodash/flatten')
const find = require('lodash/find')
const findIndex = require('lodash/findIndex')
const isNil = require('lodash/isNil')
const URLSearchParams = require('url-search-params')

const { Card, Icon, Modal } = require('@nudj/components')
const { buttonStyleSheet } = require('@nudj/components/lib/components/inline-action/style.css')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const { emailPreferences } = require('../../lib/constants')
const ListContacts = require('../../components/list-contacts')
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

const ViewRecommendationsPage = props => {
  const { user, surveyAnswers, history } = props

  const connectionsByAnswers = flatten(surveyAnswers.map(answer => answer.connections))

  const connections = connectionsByAnswers.reduce((arr, connection) => {
    const index = findIndex(arr, { id: connection.id })
    const existing = arr[index]

    if (existing) {
      const tags = existing.tags || []

      const updated = {
        ...existing,
        tags: tags.concat(connection.tags || [])
      }

      arr[index] = updated
      return arr
    }

    return [...arr, connection]
  }, [])

  const csrfToken = get(props, 'csrfToken')
  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const selectedContactId = queryParams.get('id')
  const emailPreference = get(user, 'emailPreference', null)

  const getRecommendationHref = ({ id }) => {
    return emailPreference !== emailPreferences.OTHER && !isNil(emailPreference)
      ? `/messages/new/${id}`
      : `?id=${id}`
  }

  return (
    <Layout {...props} title='Part 3: Send a nudj'>
      <Helmet>
        <title>Send a nudj</title>
      </Helmet>
      {connections.length > 0 ? (
        <Main>
          <Section padding>
            <Heading>
              Send your first nudj
            </Heading>
            <Para>
              Choose a person who you want to get referrals from or encourage to apply for a job.
            </Para>
          </Section>
          <Section width='regular'>
            <Card style={mss.pa0}>
              <ListContacts
                contacts={connections}
                onItemClick={({ name }) => {
                  const personId = find(connections, { id: name }).person.id
                  const url = getRecommendationHref({ id: personId })

                  history.push(url)
                }}
                contactChild={childProps => (
                  <span
                    className={css(
                      buttonStyleSheet.root,
                      buttonStyleSheet.murmur,
                      style.messageButton
                    )}
                  >
                    <Icon name='email' />
                  </span>
                )}
              />
            </Card>
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
