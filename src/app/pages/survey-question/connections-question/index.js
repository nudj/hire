const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  Button,
  Card,
  Input,
  Modal,
  Text
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const {
  setNewItemValue,
  updateConnectionsSearchQuery,
  saveSurveyAnswers,
  setSelectedConnections,
  search,
  showAddForm,
  hideAddForm,
  submitNewConnection
} = require('../actions')
const Layout = require('../../../components/app-layout')
const style = require('../style.css')
const Basket = require('../../../components/basket')
const ConnectionsForm = require('../../../components/form-connection')
const SearchResults = require('../../../components/contacts-search-results')
const ListContactsMultiSelect = require('./list-contacts-multiselect')

const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  Footer
} = require('../../../components/wizard')

const getHandleSetConnections = (questionId, dispatch) => e => {
  e.preventDefault()
  dispatch(setSelectedConnections(questionId, e.value))
}

const getHandleSearchChange = dispatch => ({ value }) => {
  dispatch(updateConnectionsSearchQuery(value))
}

const handleSaveAnswers = (dispatch, questionId) => event => {
  event.preventDefault()
  dispatch(saveSurveyAnswers(questionId))
}

const getHandleSearchSubmit = dispatch => event => {
  event.preventDefault()
  dispatch(search(event.target.elements['search'].value))
}

const getHandleAddClick = dispatch => event => {
  event.preventDefault()
  dispatch(showAddForm())
}

const getHandleModalClose = dispatch => event => {
  event.preventDefault()
  dispatch(hideAddForm())
}

const getHandleConnectionChange = dispatch => (field, value) => {
  dispatch(setNewItemValue('newConnection', field, value))
}

const getHandleConnectionSubmit = dispatch => (field, value) => {
  dispatch(submitNewConnection())
}

const ConnectionsQuestionPage = props => {
  const {
    dispatch,
    questionNumber,
    questionCount,
    hasConnections,
    connections,
    question,
    selectedConnections,
    searchInput,
    searchQuery,
    history,
    match,
    loading,
    notification
  } = props

  const handleSetConnections = getHandleSetConnections(question.id, dispatch)
  const handleSearchChange = getHandleSearchChange(dispatch)
  const handleSearchClear = ({ value }) => {
    handleSearchChange(value)
    history.push(match.url)
  }

  return (
    <Layout
      {...props}
      notification={notification}
      title='Step 2: Uncover hidden gems'
    >
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Text nonsensitive element='div' style={style.stepCounter}>
            Question {questionNumber} of {questionCount}
          </Text>
          <Heading nonsensitive>
            {question.title}
          </Heading>
          <Para nonsensitive>
            {question.description}
          </Para>
        </Section>
        <Section width='regular'>
          {hasConnections || selectedConnections.length ? (
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
                  nonsensitive
                  style={style.searchButton}
                  type='submit'
                  volume='cheer'
                  disabled={loading}
                  subtle
                >
                  Search
                </Button>
              </form>
              <div className={css(style.resultsContainer)}>
                <SearchResults
                  contacts={connections}
                  onAddIndividualClick={getHandleAddClick(dispatch)}
                  query={searchQuery}
                  ListComponent={ListContactsMultiSelect}
                  listProps={{
                    selectedContacts: selectedConnections,
                    onChange: handleSetConnections
                  }}
                />
              </div>
            </Card>
          ) : (
            <Card style={mss.pa0}>
              <div className={css(mss.plLgIi, mss.prLgIi)}>
                <Text nonsensitive element='label'>
                  Add their details below
                </Text>
                <ConnectionsForm
                  csrfToken={get(props, 'csrfToken')}
                  onChange={getHandleConnectionChange(dispatch)}
                  onSubmit={getHandleConnectionSubmit(dispatch)}
                  connection={get(props, 'newConnection')}
                />
              </div>
            </Card>
          )}
        </Section>
        <Footer>
          <Basket
            basket={selectedConnections.map(connection => ({
              id: connection.id,
              value: `${connection.firstName} ${connection.lastName}`
            }))}
            itemLabel='people'
            skipLabel="I don't know anyone"
            nextLabel="That's everyone"
            nextClick={handleSaveAnswers(dispatch, question.id)}
          />
        </Footer>
      </Main>
      <Modal
        isOpen={get(props, 'showAddIndividualConnectionModal')}
        style={style.modalWindow}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={getHandleModalClose(dispatch)}
      >
        <Text nonsensitive element='div' size='largeI' style={style.modalHeading}>
          Add an individual contact
        </Text>
        <Text nonsensitive element='p' style={style.modalBody}>
          Thought of someone who might help you in your search? Just add
          their details below so you can nudj them.
        </Text>
        <ConnectionsForm
          style={[mss.mtReg, mss.plLgIi, mss.prLgIi]}
          csrfToken={get(props, 'csrfToken')}
          onChange={getHandleConnectionChange(dispatch)}
          onSubmit={getHandleConnectionSubmit(dispatch)}
          connection={get(props, 'newConnection')}
        />
      </Modal>
    </Layout>
  )
}

module.exports = ConnectionsQuestionPage
