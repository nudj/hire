const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const find = require('lodash/find')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const {
  AnimateHeight,
  Icon,
  Text,
  Card,
  Input,
  Button,
  Modal
} = require('@nudj/components')

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
const ContactsFilters = require('../../components/contacts-filters')
const ButtonLink = require('../../components/button-link')
const {
  updateSearchQuery,
  updateFavouritesFilter,
  updateExpertiseTagFilter,
  setNewItemValue,
  submitNewConnection,
  submitQuery,
  submitSearch
} = require('./actions')
const {
  Heading,
  Para
} = require('../../components/wizard')

const featureTags = process.env.FEATURE_TAGS === 'true'

class ContactsPage extends React.Component {
  state = {
    showModal: false,
    showFilters: false
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  toggleFilters = () => {
    this.setState(state => ({
      showFilters: !state.showFilters
    }))
  }

  handleQueryChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch(updateSearchQuery(value))
  }

  handleQueryClear = ({ value }) => {
    const { dispatch } = this.props
    dispatch(updateSearchQuery(value))
    dispatch(submitSearch())
  }

  handleToggleFavourites = ({ value }) => {
    const { dispatch } = this.props
    const filterFavourites = value === 'true'
    dispatch(updateFavouritesFilter(filterFavourites))
    dispatch(submitSearch())
  }

  handleExpertiseTagChange = ({ values }) => {
    const { dispatch } = this.props
    dispatch(updateExpertiseTagFilter(values))
    dispatch(submitSearch())
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(submitQuery())
  }

  handleConnectionFieldChange = (field, value) => {
    const { dispatch } = this.props
    dispatch(setNewItemValue('newContact', field, value))
  }

  handleConnectionSubmit = (field, value) => {
    const { dispatch } = this.props
    this.hideModal()
    dispatch(submitNewConnection())
  }

  render () {
    const {
      user,
      contactsPage: state,
      csrfToken,
      match,
      history,
      location
    } = this.props
    const { showModal, showFilters } = this.state
    const { newContact } = state
    const jobId = get(match, 'params.jobId')
    const connections = get(user, 'results.connections', [])
    const expertiseTags = get(user, 'results.tags', [])
      .filter(tag => tag.type === 'EXPERTISE')

    const queryParams = new URLSearchParams(location.search || '')
    const searchQuery = queryParams.get('search')

    const searchInput = getFirstNonNil(
      state.searchQuery,
      searchQuery,
      ''
    )

    const favouritesFilter = getFirstNonNil(
      state.favouritesFilter,
      queryParams.get('favourites'),
      false
    )

    const expertiseTagFilter = getFirstNonNil(
      state.expertiseTagFilter,
      queryParams.getAll('expertiseTags[]'),
      []
    )

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <Main>
          <Section
            style={style.mainSection}
            width={!featureTags ? 'largeI' : undefined}
          >
            {searchInput || connections.length > 0 ? (
              <Card style={[mss.pa0, style.card]}>
                <form
                  className={css(
                    featureTags && style.form
                  )}
                  onSubmit={this.handleSubmit}
                  autoComplete='off'
                >
                  <div className={css(style.searchForm)}>
                    <Input
                      name='search'
                      label='search'
                      type='search'
                      value={searchInput}
                      placeholder='e.g., Jonny Ive'
                      onChange={this.handleQueryChange}
                      onClear={this.handleQueryClear}
                      styleSheet={{ root: style.searchInput }}
                    />
                    <Button
                      nonsensitive
                      style={style.searchButton}
                      type='submit'
                      volume='cheer'
                      disabled={state.loading}
                      subtle
                    >
                      Search
                    </Button>
                  </div>
                  {featureTags && (
                    <div className={css(style.filterContainer)}>
                      <div className={css(style.filterBar)}>
                        <Text nonsensitive size='regular' style={style.resultCount}>
                          Showing{' '}
                          <span className={css(mss.bold)}>
                            {connections.length}
                          </span>{' '}
                          contacts
                        </Text>
                        <Button
                          nonsensitive
                          onClick={this.toggleFilters}
                          style={style.filterButton}
                          subtle
                        >
                          Filters{' '}
                          <span
                            className={css(
                              style.filterIcon,
                              !showFilters && mss.rotate180
                            )}
                          >
                            <Icon name='chevron' />
                          </span>
                        </Button>
                      </div>
                      <AnimateHeight
                        height={showFilters ? 'auto' : 0}
                        className={css(style.animatedFilterPanel)}
                        contentClassName={css(style.animatedFilterPanelInner)}
                      >
                        <div className={css(style.filters)}>
                          <ContactsFilters
                            toggleFavourites={favouritesFilter.toString()}
                            expertiseTagsValues={expertiseTagFilter}
                            expertiseTags={expertiseTags}
                            onToggleFavourites={this.handleToggleFavourites}
                            onExpertiseChange={this.handleExpertiseTagChange}
                          />
                        </div>
                      </AnimateHeight>
                    </div>
                  )}
                </form>
                <div className={css(style.resultsContainer)}>
                  <SearchResults
                    contacts={connections}
                    onAddIndividualClick={this.showModal}
                    query={searchQuery}
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
                      ),
                      query: searchInput,
                      showFilters,
                      favouritesFilter,
                      expertiseTags
                    }}
                  />
                </div>
              </Card>
            ) : (
              <Section width='largeI' padding>
                <Heading style={mss.fgPrimary} nonsensitive>
                  You don&apos;t have any contacts
                </Heading>
                <Para nonsensitive>
                  To get the most out of nudj, you&apos;ll need to upload your LinkedIn contacts.
                </Para>
                <Para nonsensitive>
                  Once uploaded, you can then use nudj to easily uncover people who
                  are suitable for an open role, or are worth asking for referrals.
                </Para>
                <div className={css(mss.center)}>
                  <ButtonLink
                    href='/setup-network/linkedin/upload'
                    style={mss.mtLgI}
                    name='emailProvider'
                    volume='cheer'
                    subtle
                    nonsensitive
                  >
                    Upload contacts
                  </ButtonLink>
                </div>
              </Section>
            )}
          </Section>
        </Main>
        <Modal
          isOpen={showModal}
          style={style.modalWindow}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.hideModal}
        >
          <Text nonsensitive element='div' size='largeI' style={style.modalHeading}>
            Add an individual contact
          </Text>
          <Text nonsensitive element='p' style={style.modalBody}>
            Thought of someone who might help you in your search? Just add
            their details below so you can nudj them.
          </Text>
          <ConnectionsForm
            className={css(mss.plLgIi, mss.prLgIi)}
            csrfToken={csrfToken}
            onChange={this.handleConnectionFieldChange}
            onSubmit={this.handleConnectionSubmit}
            connection={newContact}
          />
        </Modal>
      </Layout>
    )
  }
}

module.exports = ContactsPage
