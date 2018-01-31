const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const sortBy = require('lodash/sortBy')
const isNil = require('lodash/isNil')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const { Text, Align, Card, Input, Button, Modal } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const ConnectionsTable = require('../../components/connections-table')
const ConnectionsForm = require('../../components/form-connection')
const Loader = require('../../components/staged-loader')
const {
  Heading,
  Para,
  Footer
} = require('../../components/wizard')
const {
  setSelectedContacts,
  updateContactsSearchQuery,
  showAddContactForm,
  hideAddContactForm,
  setNewItemValue,
  submitNewConnection,
  search
} = require('./actions')

const getHandleSearchChange = dispatch => ({ value }) => {
  dispatch(updateContactsSearchQuery(value))
}

const getHandleSelectContacts = dispatch => ({ value }) => {
  dispatch(setSelectedContacts(value))
}

const getHandleAddClick = dispatch => event => {
  event.preventDefault()
  dispatch(showAddContactForm())
}

const getHandleModalClose = dispatch => event => {
  event.preventDefault()
  dispatch(hideAddContactForm())
}

const getHandleSearchSubmit = dispatch => event => {
  event.preventDefault()
  dispatch(search())
}

const getHandleConnectionChange = dispatch => (field, value) => {
  dispatch(setNewItemValue('newContact', field, value))
}

const getHandleConnectionSubmit = dispatch => (field, value) => {
  dispatch(submitNewConnection())
}

const ContactsPage = props => {
  const { user, contactsPage: state, dispatch, history, match } = props
  const connections = get(user, 'connections', [])
  const totalConnectionsCount = get(user, 'connectionsCount', 0)
  const selectedContacts = get(state, 'selectedContacts', [])
  const selectedContactId = get(state, 'selectedContacts', [])[0]

  const selectedConnection = connections.filter(connection => selectedContactId === connection.id)[0]
  const selectedConnectionId = get(selectedConnection, 'person.id')

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQuery = queryParams.get('search')
  const searchInput = getFirstNonNil(
    state.searchQuery,
    searchQuery,
    ''
  )

  const handleSearchChange = getHandleSearchChange(dispatch)
  const handleSearchClear = ({ value }) => {
    handleSearchChange(value)
    history.push(match.url)
  }

  const renderSearchTable = () => {
    if (!!connections.length) {
      return (
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
      )
    } else if (!connections.length && !isNil(searchQuery)) {
      return (
        <div className={css(style.tableOverflow)}>
          <Text size='largeI' element='div'>
            0 people match '{searchQuery}'
          </Text>
          <Text element='div' style={mss.mtReg}>
            We can&#39;t find anyone in your contacts that matches your query.
            Try another search term or add them manually using the link below
          </Text>
        </div>
      )
    }

    return null 
  }

  return (
    <Layout {...props}>
      <Helmet>
        <title>All contacts</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading>
            You currently have{' '}
            <span className={css(mss.fgMidRed)}>
              {totalConnectionsCount}
            </span>{' '}
            people in your network
          </Heading>
          <Para>
            Search for people to ask for recommendations or add more people to grow your network.
          </Para>
        </Section>
        <Section padding width='largeI'>
          <Card style={[mss.pl0, mss.pr0]}>
            <form
              onSubmit={getHandleSearchSubmit(dispatch)}
              className={css(mss.plLgIi, mss.prLgIi)}
            >
              <Text element='label' size='smallI' htmlFor='search'>
                Search by name and select from the results
              </Text>
              <Input
                styleSheet={{ root: mss.mtReg }}
                name='search'
                label='search'
                type='search'
                value={searchInput}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                placeholder='e.g., Jonny Ive'
              />
              <Button
                type='submit'
                volume='cheer'
                style={mss.mtReg}
                disabled={state.loading}
              >
                { state.loading ? (
                  <Loader
                    messages={[
                      'Searching contacts'
                    ]}
                    threshold={4000}
                    ellipsis
                  />
                ) : 'Search' }
              </Button>
            </form>
            {renderSearchTable()}
          </Card>
          <Button
            subtle
            volume='cheer'
            onClick={getHandleAddClick(dispatch)}
            style={mss.mtReg}
          >
            Add person
          </Button>
          <Modal
            isOpen={get(state, 'showAddIndividualConnectionModal')}
            style={style.modalWindow}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            onRequestClose={getHandleModalClose(dispatch)}
          >
            <Text element='div' size='largeI' style={style.modalHeading}>
              Add an individual
            </Text>
            <Text element='p' style={style.modalBody}>
              Thought of someone who might help you in your search? Just add
              their details below so you can nudj them.
            </Text>
            <ConnectionsForm
              className={css(mss.plLgIi, mss.prLgIi)}
              csrfToken={get(props, 'csrfToken')}
              onChange={getHandleConnectionChange(dispatch)}
              onSubmit={getHandleConnectionSubmit(dispatch)}
              connection={get(state, 'newContact')}
            />
          </Modal>
          <Footer>
            <Align
              rightChildren={
                <ButtonLink
                  href={`/messages/new/${selectedConnectionId}`}
                  volume='cheer'
                  disabled={!selectedConnectionId}
                >
                  Next
                </ButtonLink>
              }
            />
          </Footer>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ContactsPage
