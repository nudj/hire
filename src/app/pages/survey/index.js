const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const toLower = require('lodash/toLower')

const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

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

  return (
    <Layout {...props} title='Step 2: Uncover hidden gems'>
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading fsShow>
            Explore your network to find your next hire
          </Heading>
          <Para fsShow>
            The people you need to hire are already in your network, you just have to
             remember them or find friends that know them.
          </Para>
          <Para fsShow>
            To help, you&#39;ll now be asked a series of questions designed to unlock all the
             people from your past who are worth asking.
          </Para>
          <Para fsShow>
            <em className={css(mss.i)}>Remember to think broadly and inclusively.</em>
          </Para>
        </Section>
        <Section padding>
          <ButtonLink
            fsShow
            style={wizardStyles.action}
            volume='cheer'
            href={`/surveys/${survey.slug}/sections/${initialSection.id}/${
              toLower(initialQuestion.type)
            }/${initialQuestion.id}`}
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
