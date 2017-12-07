const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text } = require('@nudj/components')
const { merge } = require('@nudj/library')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const SurveyPage = props => {
  const { user } = props
  const survey = get(user, 'hirer.company.survey')
  const onboardingSegment = get(user, 'hirer.onboarded') ? '' : '/onboarding'

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - Choose a network</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text
            element='div'
            size='largeIi'
            style={merge(sharedStyle.heading, style.heading)}
          >
            Finding awesome people to join {get(user, 'hirer.company.name', '')}
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            We know you want to work with awesome people that you like and
            respect. The best way to find such people is to source them from
            your network.
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            To help job your memory and uncover those gems, we're now going to
            ask you a series of questions. All you have to do is select from the
            contacts you've just uploaded who you feel is most relevant.
          </Text>
        </div>
        <div className={css(sharedStyle.body, style.buttonGroup)}>
          <ButtonLink
            style={style.button}
            volume='cheer'
            href={`${onboardingSegment}/surveys/${survey.slug}/sections/${
              survey.sections[0].id
            }`}
          >
            Start
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

module.exports = SurveyPage
