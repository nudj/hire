const React = require('react')
const startCase = require('lodash/startCase')
const format = require('date-fns/format')

const { css } = require('@nudj/components/lib/css')
const { List, Align, Text } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')
const Layout = require('../../components/app-layout')
const ActionableListContents = require('../../components/actionable-list-contents')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/app')

const style = require('./style.css')

const IntrosPage = props => {
  const { jobs } = props.user.hirer.company

  const jobsWithIntros = jobs.filter(job => job.intros.length)

  return (
    <Layout {...props}>
      {jobsWithIntros.length ? (
        <div>
          <ActionBar>
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
                <Align
                  leftChildren={(
                    <Heading
                      id={job.slug}
                      level={2}
                      style={mss.left}
                      nonsensitive
                    >
                      {job.title}
                    </Heading>
                  )}
                  rightChildren={(
                    <Text nonsensitive element='div' size='smallIi'>
                      Status: <strong className={css(mss.bold)}>{startCase(job.status.toLowerCase())}</strong>
                      {' - '}
                      Created: <strong className={css(mss.bold)}>{format(job.created, 'DD/MM/YYYY')}</strong>
                    </Text>
                  )}
                />
                <List style={mss.mtReg}>
                  {ListItem => job.intros.map(intro => (
                    <ListItem key={intro.id} joined={false}>
                      <ActionableListContents
                        title={`${intro.candidate.firstName} ${intro.candidate.lastName}`}
                        subtitle={intro.candidate.email}
                        styleSheet={{ root: style.listItem }}
                        dataPoints={[
                          { key: 'Introduced by', value: `${intro.person.firstName} ${intro.person.lastName}` }
                        ]}
                      >
                        {(Action) => [
                          <Action
                            key='email'
                            Component='a'
                            href={`mailto:${intro.candidate.email}`}
                          >
                            Email candidate
                          </Action>,
                          <Action
                            key='notes'
                            Component='a'
                            href={`/intros/${intro.id}`}
                          >
                            View details
                          </Action>
                        ]}
                      </ActionableListContents>
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
