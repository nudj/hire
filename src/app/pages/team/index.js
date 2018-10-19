const React = require('react')
const groupBy = require('lodash/groupBy')
const startCase = require('lodash/startCase')

const { css, mss } = require('@nudj/components/styles')
const { List, Align, Text, Icon } = require('@nudj/components')
const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/app')

const style = require('./style.css')

const TeamPage = props => {
  const { hirers } = props.user.hirer.company

  const hirersGroupedByType = groupBy(hirers, 'type')
  const hirerTypes = Object.keys(hirersGroupedByType).sort()

  return (
    <Layout {...props}>
      <div>
        <ActionBar>
          {actionStyle => [
            <ButtonLink
              key='invite-button'
              style={actionStyle}
              volume='cheer'
              to='/team/invite'
              subtle
            >
              Invite teammates
            </ButtonLink>
          ]}
        </ActionBar>
        <div className={css(style.listContainer)}>
          <List style={mss.mtReg}>
            {ListItem => hirerTypes.map(hirerType => {
              const hirers = hirersGroupedByType[hirerType]

              if (!hirers.length) return null

              return (
                <div key={hirerType}>
                  <Heading level={2} size='smallIi' nonsensitive style={style.listDivider}>
                    {`${startCase(hirerType.toLowerCase())}s`}
                  </Heading>
                  {hirers.map(hirer => (
                    <ListItem key={hirer.id} joined>
                      <a className={css(style.card)} href={`/team/${hirer.id}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {`${hirer.person.firstName} ${hirer.person.lastName}`}
                                </Text>
                              </div>
                              <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                {hirer.person.email}
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
                </div>
              )
            })}
          </List>
        </div>
        {hirers.length === 1 && (
          <Section style={[mss.center, mss.mtReg]}>
            <Heading nonsensitive level={1} style={mss.fgPrimary}>
              Add your team
            </Heading>
            <Para nonsensitive>
              Be sure to invite your entire team to nudj. After all, many
              hands make light work (and more referrals).
            </Para>
            <ButtonLink
              nonsensitive
              href='/team/invite'
              style={mss.mtLgI}
              volume='cheer'
              subtle
            >
              Invite teammates
            </ButtonLink>
          </Section>
        )}
      </div>
    </Layout>
  )
}

module.exports = TeamPage
