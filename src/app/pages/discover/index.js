const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const find = require('lodash/find')
const URLSearchParams = require('url-search-params')

const { getFirstNonNil } = require('@nudj/library')
const {
  AnimateHeight,
  Button,
  Card,
  Icon,
  IconLink,
  Input,
  Modal,
  Text,
  Link
} = require('@nudj/components')

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
const Small = require('../../components/small')
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

class DiscoverPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      showSurveyCompleteModal: !!props.surveyRecentlyCompleted,
      showFilters: false
    }
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

  hideSurveyCompleteModal = () => {
    this.setState({
      showSurveyCompleteModal: false
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
    const { hirerTypes } = this.props.enums
    const {
      user,
      discoverPage: state,
      csrfToken,
      match,
      history,
      location
    } = this.props

    const isAdmin = user.hirer.type === hirerTypes.ADMIN
    const {
      showModal,
      showSurveyCompleteModal,
      showFilters
    } = this.state
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
          <title>Discover</title>
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
                        <IconLink iconName='email' />
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
                {isAdmin ? (
                  <div>
                    <Heading style={mss.fgPrimary} nonsensitive>
                      Find more people to refer
                    </Heading>
                    <Para nonsensitive>
                      Our discover tools help your team dig a little deeper into their networks.
                    </Para>
                    <Para nonsensitive>
                      The aided recall survey and LinkedIn contact filtering will help your team
                      make three times more referrals.
                    </Para>
                    <div className={css(mss.center)}>
                      <ButtonLink
                        href='/sync-contacts/linkedin'
                        style={mss.mtLgI}
                        nonsensitive
                      >
                        Try survey
                      </ButtonLink>
                      <Link
                        href='https://help.nudj.co/hiring-with-nudj/discover-with-nudj'
                        target='_blank'
                        style={[mss.mlReg, mss.mtLgI]}
                        nonsensitive
                      >
                        Find out more
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Heading style={mss.fgPrimary} nonsensitive>
                      Discover
                    </Heading>
                    <Para nonsensitive>
                      The nudj discover tools help you dig a
                      little deeper into your network. You’ll be surprised
                      how many people you actually know.
                    </Para>
                    <Para nonsensitive>
                      A one-time survey and LinkedIn contact syncing will help you
                      make more referrals and increase your chances of getting rewarded.
                    </Para>
                    <div className={css(mss.center)}>
                      <ButtonLink
                        href='/sync-contacts/linkedin'
                        style={mss.mtLgI}
                        name='emailProvider'
                        volume='cheer'
                        nonsensitive
                      >
                        Sync contacts
                      </ButtonLink>
                    </div>
                    <Small style={style.privacyNotice}>
                      Only you have access to your LinkedIn contacts and it isn’t
                      visible to your employer or nudj.{' '}
                      <Link
                        style={style.privacyLink}
                        href='https://help.nudj.co/pricing-privacy-and-terms/nudj-privacy-policy'
                        subtle
                        volume='cheer'
                        inline
                      >
                        Find out more on our privacy policy.
                      </Link>
                    </Small>
                  </div>
                )}
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
            Add a person to your contacts
          </Text>
          <Text nonsensitive element='p' style={style.modalBody}>
            Thought of someone else who might help you in your search? Just add
            their details below to add them to your contacts.
          </Text>
          <ConnectionsForm
            className={css(mss.plLgIi, mss.prLgIi)}
            csrfToken={csrfToken}
            onChange={this.handleConnectionFieldChange}
            onSubmit={this.handleConnectionSubmit}
            connection={newContact}
          />
        </Modal>
        <Modal
          isOpen={showSurveyCompleteModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.hideSurveyCompleteModal}
          style={mss.center}
        >
          <Heading
            nonsensitive
            level={2}
            size='largeIi'
            style={mss.fgPrimary}
          >
            Survey finished
          </Heading>
          <img
            className={css(mss.mtLgIi)}
            src='/assets/images/fist-bump.svg'
            alt=''
          />
          <Para nonsensitive>
            Great job completing the survey! You can find your answers under the favourites tab.
          </Para>
          <Para nonsensitive>
            When your team has a live job, make sure you check
            back here before you start sharing.
          </Para>
          <div className={css(style.modalBody)}>
            <Button
              nonsensitive
              style={style.button}
              onClick={this.hideSurveyCompleteModal}
              volume='cheer'
            >
              Got it
            </Button>
          </div>
        </Modal>
      </Layout>
    )
  }
}

module.exports = DiscoverPage
