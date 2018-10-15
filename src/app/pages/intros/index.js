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
const { Heading } = require('../../components/app')

const style = require('./style.css')

const IntrosPage = props => {
  const { jobs } = props.user.hirer.company

  return (
    <Layout {...props}>
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

      {jobs.filter(job => job.intros.length).map(job => {
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
                        View notes
                      </Action>
                    ]
                    }
                  </ActionableListContents>
                </ListItem>
              ))}
            </List>
          </div>
        )
      })}
    </Layout>
  )
}

module.exports = IntrosPage
