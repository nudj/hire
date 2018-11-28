const React = require('react')
const { Helmet } = require('react-helmet')
const groupBy = require('lodash/groupBy')
const capitalise = require('lodash/capitalize')
const { List, Text, Align, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')

const style = require('./style.css')

const SurveysPage = props => {
  const { hirer } = props.user
  const { surveys } = hirer.company

  const title = 'Surveys'
  const surveysByStatus = groupBy(surveys, 'status')

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {surveys.length ? (
        <div>
          <TitleCard title={title}>
            <Text element='p' style={style.descriptionParagraph}>
              Surveys help your team find those in their networks to reach out to, and help uncover hidden talent that otherwise gets lost.
            </Text>
          </TitleCard>
          <ActionBar style={{ root: mss.mtReg }}>
            {actionStyle => [
              <ButtonLink
                key='add-survey-button'
                style={actionStyle}
                volume='cheer'
                to='/manage/surveys/new'
                subtle
              >
                Add new survey
              </ButtonLink>
            ]}
          </ActionBar>

          {Object.keys(surveysByStatus).map(surveyStatus => {
            return (
              <div key={surveyStatus} className={css(style.listHeading)}>
                <Heading
                  id={surveyStatus}
                  level={2}
                  style={style.heading}
                  nonsensitive
                >
                  {capitalise(surveyStatus)}
                </Heading>
                <List style={mss.mtReg}>
                  {ListItem => (surveysByStatus[surveyStatus] || []).map(survey => (
                    <ListItem key={survey.id} joined>
                      <a className={css(style.card)} href={`/manage/surveys/${survey.slug}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {survey.introTitle}
                                </Text>
                              </div>
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
            Add a survey
          </Heading>
          <Para nonsensitive>
            Create a new survey to help your team uncover hidden gems in their networks.
          </Para>
          <ButtonLink
            nonsensitive
            href='/manage/surveys/new'
            style={mss.mtLgI}
            volume='cheer'
            subtle
          >
            Add new survey
          </ButtonLink>
        </Section>
      )}
    </Layout>
  )
}

module.exports = SurveysPage
