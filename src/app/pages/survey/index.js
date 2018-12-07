const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Text, Align, Link, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const Dropdown = require('../../components/dropdown')
const Main = require('../../components/main')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading } = require('../../components/app')
const { fetchName } = require('../../lib')
const analytics = require('../../lib/browser-analytics')

const style = require('./style.css')
const {
  Heading: WizardHeading,
  Para: WizardPara,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const SurveyPage = props => {
  const survey = props.user.hirer.company.survey
  const questions = survey.questions
  const title = survey.introTitle || 'Survey'
  const intro = survey.introDescription || 'Intro text'

  const trackSurveyStart = () => {
    analytics.track({
      object: analytics.objects.survey,
      action: analytics.actions.survey.started,
      properties: {
        survey: survey.id
      }
    })
  }

  // if any question is answered then they are all answered as there is a redirect in the fetcher when the survey is only partially complete
  const isComplete = questions && questions[0] && questions[0].answer

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isComplete ? (
        <Main>
          <TitleCard
            title={title}
            titleRight={(
              <Dropdown
                id='survey'
                header='Actions'
                chevron
              >
                <Link
                  href={`/surveys/${survey.slug}/questions/${questions[0].id}`}
                  subtle
                >
                  Retake
                </Link>
              </Dropdown>
            )}
          >
            <Text element='p' style={style.descriptionParagraph}>
              {intro}
            </Text>
          </TitleCard>

          {questions.map(question => {
            return (
              <div key={question.id} className={css(style.listHeading)}>
                <Heading
                  id={question.id}
                  level={2}
                  style={style.heading}
                  nonsensitive
                >
                  {question.title}
                </Heading>
                {!question.answer.connections.length ? (
                  <Text style={style.spacer}>
                    No answers given
                  </Text>
                ) : (
                  <List style={[mss.mtReg, { textAlign: 'left' }]}>
                    {ListItem => question.answer.connections.map(connection => {
                      const personId = connection.person.id

                      return (
                        <ListItem key={connection.id} joined>
                          <a className={css(style.card)} href={`/messages/new/${personId}`}>
                            <Align
                              leftChildren={(
                                <div>
                                  <div className={css(style.titleContainer)}>
                                    <Text element='div' size='largeI' style={style.title} nonsensitive>
                                      {fetchName({
                                        firstName: connection.firstName,
                                        lastName: connection.lastName,
                                        email: connection.person.email
                                      })}
                                    </Text>
                                  </div>
                                  <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                    {connection.person.email}
                                  </Text>
                                </div>
                              )}
                              rightChildren={(
                                <Icon style={style.chevron} name='chevron' />
                              )}
                            />
                          </a>
                        </ListItem>
                      )
                    })}
                  </List>
                )}
              </div>
            )
          })}
        </Main>
      ) : (
        <Main>
          <Section padding>
            <WizardHeading nonsensitive>
              Explore your network to find your next teammate
            </WizardHeading>
            <WizardPara nonsensitive>
              The people you need to hire are already in your network, to find them
              you&apos;ve got to do a little digging.
            </WizardPara>
            <WizardPara nonsensitive>
              Stealing a little of Google&apos;s wisdom, we&apos;ll run you through a few key
              questions to help you uncover who you know beyond the usual suspects.
            </WizardPara>
            <WizardPara nonsensitive>
              <em className={css(mss.i)}>Remember to think broadly and inclusively.</em>
            </WizardPara>
          </Section>
          <Section padding>
            <ButtonLink
              nonsensitive
              style={wizardStyles.action}
              volume='cheer'
              href={`/surveys/${survey.slug}/questions/${questions[0].id}`}
              onClick={trackSurveyStart}
            >
              Start
            </ButtonLink>
          </Section>
        </Main>
      )}
    </Layout>
  )
}

module.exports = SurveyPage
