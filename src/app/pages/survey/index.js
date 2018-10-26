const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const toLower = require('lodash/toLower')

const { css, mss } = require('@nudj/components/styles')

const analytics = require('../../lib/browser-analytics')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const SurveyPage = props => {
  const { user } = props
  const company = get(user, 'hirer.company')
  const survey = get(company, 'survey')
  const initialSection = get(survey, 'sections[0]', {})
  const initialQuestion = get(initialSection, 'questions[0]', {})

  const trackSurveyStart = () => {
    analytics.track({
      object: analytics.objects.survey,
      action: analytics.actions.survey.started,
      properties: {
        survey: survey.id
      }
    })
  }

  return (
    <Layout {...props}>
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive>
            Explore your network to find your next teammate
          </Heading>
          <Para nonsensitive>
            The people you need to hire are already in your network, to find them
            you&apos;ve got to do a little digging.
          </Para>
          <Para nonsensitive>
            Stealing a little of Google&apos;s wisdom, we&apos;ll run you through a few key
            questions to help you uncover who you know beyond the usual suspects.
          </Para>
          <Para nonsensitive>
            <em className={css(mss.i)}>Remember to think broadly and inclusively.</em>
          </Para>
        </Section>
        <Section padding>
          <ButtonLink
            nonsensitive
            style={wizardStyles.action}
            volume='cheer'
            href={`/surveys/${survey.slug}/sections/${initialSection.id}/${
              toLower(initialQuestion.type)
            }/${initialQuestion.id}`}
            onClick={trackSurveyStart}
          >
            Start
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

SurveyPage.defaultProps = {
  user: {
    hirer: {
      company: {
        survey: {
          sections: []
        }
      }
    }
  }
}

module.exports = SurveyPage
