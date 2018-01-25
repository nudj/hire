const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const sortBy = require('lodash/sortBy')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const { Text, Align, Card, Input, Button, Modal } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const Wrapper = require('../../components/wrapper')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const ConnectionsTable = require('../../components/connections-table')
const ConnectionsForm = require('../../components/form-connection')
const {
  Heading,
  P,
  Footer,
  styleSheet: wizardStyles,
} = require('../../components/wizard')
const {
  setSelectedContacts,
  updateContactsSearchQuery,
  showAddContactForm,
  hideAddContactForm,
  setNewItemValue,
  submitNewConnection
} = require('./actions')
const sharedStyle = require('../shared.css')

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

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQuery = getFirstNonNil(
    state.searchQuery,
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
      <Wrapper>
        <Section padding>
          <Heading>
            You currently have{' '}
            <span className={css(m.fgMidRed)}>
              {totalConnectionsCount}
            </span>{' '}
            people in your network
          </Heading>
          <P>
            Search for people to ask for recommendations or add more people to grow your network.
          </P>
        </Section>
        <Section padding width="largeI">
          <Card style={[m.pl0, m.pr0]}>
            <form className={css(m.plLgIi, m.prLgIi)}>
              <Text element='label' size='smallI' htmlFor='search'>
                Search by name and select from the results
              </Text>
              <Input
                styleSheet={{ root: m.mtReg }}
                name='search'
                label='search'
                type='search'
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                placeholder='e.g., Jonny Ive'
              />
              <Button type='submit' volume='cheer' style={m.mtReg}>
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
          <Button
            subtle
            volume='cheer'
            onClick={getHandleAddClick(dispatch)}
            style={m.mtReg}
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
             className={css(m.plLgIi, m.prLgIi)}
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
                  href={`/messages/new/${selectedContactId}`}
                  volume='cheer'
                  disabled={!selectedContactId}
                >
                  Next
                </ButtonLink>
              }
            />
          </Footer>
        </Section>
      </Wrapper>
    </Layout>
  )
}

module.exports = ContactsPage
