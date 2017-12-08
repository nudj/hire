/* global ID QuestionType */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

type Question = {
  id: ID,
  type: QuestionType
}

type Section = {
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
          sections: Array<Section>
        }
      }
    }
  }
}

const SurveyPage = (props: SurveyProps) => {
  const { user } = props
  const company = get(user, 'hirer.company')
  const survey = get(company, 'survey')
  const initialSection = get(survey, 'sections[0]')
  const initialQuestion = get(initialSection, 'questions[0]')
  const onboardingSegment = get(user, 'hirer.onboarded') ? '' : '/onboarding'

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - Survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text
            element='div'
            size='largeIi'
            style={sharedStyle.heading}
          >
            Finding awesome people to join{' '}
            <span className={css(style.companyName)}>
              {get(company, 'name', '')}
            </span>
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            We know you want to work with awesome people that you like and
            respect. The best way to find such people is to source them from
            your network.
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            To help jog your memory and uncover those gems, we&#39;re now going to
            ask you a series of questions. All you have to do is select from the
            contacts you&#39;ve just uploaded who you feel is most relevant.
          </Text>
        </div>
        <div className={css(sharedStyle.body, sharedStyle.actions)}>
          <ButtonLink
            style={sharedStyle.action}
            volume='cheer'
            href={`${onboardingSegment}/surveys/${survey.slug}/sections/${
              initialSection.id
            }/${initialQuestion.type}/${initialQuestion.id}`}
          >
            Start
          </ButtonLink>
        </div>
      </div>
    </div>
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
