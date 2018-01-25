/* global ID SurveyQuestionType */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const toLower = require('lodash/toLower')

const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')

const Wrapper = require('../../components/wrapper')
const Section = require('../../components/section')
const {
  Heading,
  P,
  styleSheet: wizardStyles
} = require('../../components/wizard')

type Question = {
  id: ID,
  type: SurveyQuestionType
}

type SectionProps = {
  id: ID,
  questions: Array<Question>
}

type SurveyProps = {
  user: {
    hirer: {
      company: {
        name?: string,
        survey: {
          id?: ID,
          slug?: string,
          sections: Array<SectionProps>
        }
      }
    }
  }
}

const SurveyPage = (props: SurveyProps) => {
  const { user } = props
  const company = get(user, 'hirer.company')
  const survey = get(company, 'survey')
  const initialSection = get(survey, 'sections[0]', {})
  const initialQuestion = get(initialSection, 'questions[0]', {})

  return (
    <Layout {...props} title='Part 2 - Uncover hidden gems'>
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Wrapper>
        <Section padding>
          <Heading>
            Finding awesome people to join{' '}
            <span className={css(m.fgMidRed)}>
              {get(company, 'name', '')}
            </span>
          </Heading>
          <P>
            The best way to find great people to hire is to source them from
            your network. However, you need to ask the right people to get the best recommendations.
          </P>
          <P>
          To help, we&#39;re now going to ask you a series of questions that have been designed to systematically unlock the best people from your past.
          </P>
        </Section>
        <Section padding>
          <ButtonLink
            style={wizardStyles.action}
            volume='cheer'
            href={`/surveys/${survey.slug}/sections/${initialSection.id}/${
              toLower(initialQuestion.type)
            }/${initialQuestion.id}`}
          >
            Start
          </ButtonLink>
        </Section>
      </Wrapper>
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
