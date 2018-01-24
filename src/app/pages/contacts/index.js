const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const sortBy = require('lodash/sortBy')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const { Text, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const ConnectionsTable = require('../../components/connections-table')
const {
  setSelectedContacts,
  updateContactsSearchQuery
} = require('./actions')
const sharedStyle = require('../shared.css')

const getHandleSearchChange = dispatch => ({ value }) => {
  dispatch(updateContactsSearchQuery(value))
}

const getHandleSelectContacts = dispatch => ({ value }) => {
  dispatch(setSelectedContacts(value))
}

const ContactsPage = props => {
  const { user, contactsPage, dispatch, history, match } = props
  const connections = get(user, 'connections', [])
  const totalConnectionsCount = get(user, 'connectionsCount', 0)
  const selectedContacts = get(contactsPage, 'selectedContacts', [])
  const selectedContactId = get(contactsPage, 'selectedContacts', [])[0]

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQuery = getFirstNonNil(
    contactsPage.searchQuery,
    queryParams.get('search'),
    ''
  )

  const handleSearchChange = getHandleSearchChange(dispatch)
  const handleSearchClear = ({ value }) => {
    handleSearchChange(value)
    history.push(match.url)
  }

  return (
    <Layout {...props} styleSheet={{root: sharedStyle.root}}>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
          You currently have{' '}
          <span className={css(sharedStyle.headingHighlight)}>
            {totalConnectionsCount}
          </span>{' '}
          people in your network
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          Search for people to ask for recommendations or add more people to grow your network.
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={[sharedStyle.card, style.card]}>
            <form className={css(style.form)}>
              <Text element='label' size='smallI' htmlFor='search'>
                Search by name and select from the results
              </Text>
              <Input
                styleSheet={{
                  root: style.input
                }}
                name='search'
                label='search'
                type='search'
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                placeholder='e.g., Jonny Ive'
              />
              <Button type='submit' volume='cheer' style={style.submitButton}>
                Search
              </Button>
            </form>
            {connections.length > 0 && (
              <div className={css(style.tableOverflow)}>
                <ConnectionsTable
                  styleSheet={{
                    root: style.table
                  }}
                  connections={sortBy(connections, ['firstName', 'lastName'])}
                  onSelect={getHandleSelectContacts(dispatch)}
                  selectedConnections={selectedContacts}
                />
              </div>
            )}
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              rightChildren={
                <ButtonLink
                  href={`/messages/new/${selectedContactId}`}
                  volume='cheer'
                  disabled={!selectedContactId}
                >
                  Next
                </ButtonLink>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

module.exports = ContactsPage
