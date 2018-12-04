const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Text, Align, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')

const style = require('./style.css')

const SurveysPage = props => {
  const { hirer } = props.user
  const { surveys = [] } = hirer.company

  const title = 'Surveys'

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

          <List style={mss.mtReg}>
            {ListItem => surveys.map(survey => (
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
