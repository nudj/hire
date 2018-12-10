const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Text, Align, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')
const groupBy = require('lodash/groupBy')

const Layout = require('../../components/app-layout')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')

const style = require('./style.css')

const groups = {
  todo: 'To do',
  inProgress: 'In progress',
  complete: 'Complete'
}

const getAnsweredCount = survey => survey.questions.reduce((count, question) => {
  if (question.answer) {
    count++
  }
  return count
}, 0)

const getSurveySubtext = survey => {
  const answeredCount = getAnsweredCount(survey)
  const surveyLength = survey.questions.length
  switch (true) {
    case !answeredCount:
    case answeredCount === surveyLength:
      return `${surveyLength} question${surveyLength === 1 ? '' : 's'}`
    default:
      return `${answeredCount}/${surveyLength} question${surveyLength === 1 ? '' : 's'} answered`
  }
}

const SurveysPage = props => {
  const { hirer } = props.user
  const { surveys = [] } = hirer.company

  const title = 'Surveys'
  const groupedSurveys = groupBy(surveys, survey => {
    const answeredCount = getAnsweredCount(survey)
    switch (true) {
      case !answeredCount:
        return 'todo'
      case answeredCount === survey.questions.length:
        return 'complete'
      default:
        return 'inProgress'
    }
  })

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {surveys.length ? (
        <div>
          <TitleCard title={title}>
            <Text element='p' style={style.descriptionParagraph}>
              Surveys help you find those in their networks to reach out to, and help uncover hidden talent that otherwise gets lost.
            </Text>
          </TitleCard>

          {Object.keys(groups).map(groupName => {
            const surveyGroup = groupedSurveys[groupName]

            return !surveyGroup.length ? null : (
              <div key={groupName} className={css(style.listHeading)}>
                <Heading
                  id={groupName}
                  level={2}
                  style={style.heading}
                  nonsensitive
                >
                  {groups[groupName]}
                </Heading>

                <List style={mss.mtReg}>
                  {ListItem => surveyGroup.map(survey => (
                    <ListItem key={survey.id} joined>
                      <a className={css(style.card)} href={`/surveys/${survey.slug}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {survey.introTitle}
                                </Text>
                              </div>
                              <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                {getSurveySubtext(survey)}
                              </Text>
                            </div>
                          )}
                          rightChildren={(
                            <Icon style={style.chevron} name='chevron' />
                          )}
                        />
                      </a>
                    </ListItem>
                  ))}
                </List>
              </div>
            )
          })}
        </div>
      ) : (
        <Section style={[mss.center, mss.mtReg]}>
          <Heading nonsensitive level={1} style={mss.fgPrimary}>
            Nothing to see here
          </Heading>
          <Para nonsensitive>
            Your company has no published surveys yet.
          </Para>
        </Section>
      )}
    </Layout>
  )
}

module.exports = SurveysPage
