const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Text, Align, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')
const { fetchName } = require('../../lib')

const style = require('./style.css')

const IntrosPage = props => {
  const { jobs } = props.user.hirer.company
  const title = 'Intros'

  const jobsWithIntros = jobs.filter(job => job.intros.length)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {jobsWithIntros.length ? (
        <div>
          <TitleCard
            title={title}
          >
            <Text element='p' style={style.descriptionParagraph}>
              Intros are candidate leads from your team. Vouched for and peer-vetted, these candidates are keen for a chat. They may need nurturing through the process, so make a good first impression and make contact quickly.
            </Text>
          </TitleCard>
          <ActionBar style={{
            root: mss.mtReg
          }}>
            {actionStyle => [
              <ButtonLink
                key='add-intro-button'
                style={actionStyle}
                volume='cheer'
                to='/intros/new'
                subtle
              >
                Add intro
              </ButtonLink>
            ]}
          </ActionBar>

          {jobsWithIntros.map(job => {
            return (
              <div key={job.slug} className={css(style.listHeading)}>
                <Heading
                  id={job.slug}
                  level={2}
                  style={style.heading}
                  nonsensitive
                >
                  {job.title}
                </Heading>
                <List style={mss.mtReg}>
                  {ListItem => job.intros.map(intro => (
                    <ListItem key={intro.id} joined>
                      <a className={css(style.card)} href={`/intros/${intro.id}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {fetchName(intro.person)}
                                </Text>
                              </div>
                              <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                {intro.person.email}
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
            Introduce a candidate
          </Heading>
          <Para nonsensitive>
            If you know someone great that the team should reach out to, put their name forward here.
            You’ll get the referral bonus if they get hired.
          </Para>
          <ButtonLink
            nonsensitive
            href='/intros/new'
            style={mss.mtLgI}
            volume='cheer'
            subtle
          >
            Add an intro
          </ButtonLink>
        </Section>
      )}
    </Layout>
  )
}

module.exports = IntrosPage
