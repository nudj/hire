const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const find = require('lodash/find')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const { Icon, Text, Card, Input, Button, Modal } = require('@nudj/components')
const { buttonStyleSheet } = require('@nudj/components/lib/components/inline-action/style.css')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ConnectionsForm = require('../../components/form-connection')
const SearchResults = require('../../components/contacts-search-results')
const ListContacts = require('../../components/list-contacts')

const {
  Heading,
  Para
} = require('../../components/app')
const {
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

const getHandleAddClick = dispatch => event => {
  event.preventDefault()
  dispatch(showAddContactForm())
}

const getHandleModalClose = dispatch => event => {
  event.preventDefault()
  dispatch(hideAddContactForm())
}

const getHandleSearchSubmit = (dispatch, url) => event => {
  event.preventDefault()
  dispatch(search(url))
}

const getHandleConnectionChange = dispatch => (field, value) => {
  dispatch(setNewItemValue('newContact', field, value))
}

const getHandleConnectionSubmit = dispatch => (field, value) => {
  dispatch(submitNewConnection())
}

const ContactsPage = props => {
  const { user, contactsPage: state, dispatch, history, match } = props
  const jobId = get(match, 'params.jobId')
  const connections = get(user, 'connections', [])

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

  return (
    <Layout {...props}>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading level={1} style={mss.fgPrimary}>
            Search your contacts
          </Heading>
          <Para>
            Find people who are worth nudj&#39;ing or add more to grow your network.
          </Para>
        </Section>
        <Section width='largeI'>
          <Card style={mss.pa0}>
            <form
              className={css(style.searchForm)}
              onSubmit={getHandleSearchSubmit(dispatch)}
              autoComplete='off'
            >
              <Input
                name='search'
                label='search'
                type='search'
                value={searchInput}
                placeholder='e.g., Jonny Ive'
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                styleSheet={{ root: style.searchInput }}
              />
              <Button
                style={style.searchButton}
                type='submit'
                volume='cheer'
                disabled={state.loading}
                subtle
              >
                Search
              </Button>
            </form>
            <div className={css(style.resultsContainer)}>
              <SearchResults
                contacts={connections}
                onAddIndividualClick={getHandleAddClick(dispatch)}
                query={searchInput}
                ListComponent={ListContacts}
                listProps={{
                  onItemClick: ({ name }) => {
                    const personId = find(connections, { id: name }).person.id

                    const url = jobId
                      ? `/messages/new/${personId}/${jobId}`
                      : `/messages/new/${personId}`

                    history.push(url)
                  },
                  contactChild: () => (
                    <span
                      className={css(
                        buttonStyleSheet.root,
                        buttonStyleSheet.murmur,
                        style.messageButton
                      )}
                    >
                      <Icon name='email' />
                    </span>
                  )
                }}
              />
            </div>
          </Card>
        </Section>
      </Main>
      <Modal
        isOpen={get(state, 'showAddIndividualConnectionModal')}
        style={style.modalWindow}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={getHandleModalClose(dispatch)}
      >
        <Text element='div' size='largeI' style={style.modalHeading}>
          Add an individual contact
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
    </Layout>
  )
}

module.exports = ContactsPage
