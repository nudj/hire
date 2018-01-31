const React = require('react')
const { Helmet } = require('react-helmet')
const isNil = require('lodash/isNil')
const get = require('lodash/get')
const sortBy = require('lodash/sortBy')

const { Text, Card, Input, Button, Modal } = require('@nudj/components')
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
const Loader = require('../../../components/staged-loader')
const ConnectionsTable = require('../../../components/connections-table')
const ConnectionsForm = require('../../../components/form-connection')

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
            onSelect={getHandleSetConnections(question.id, dispatch)}
            connections={sortBy(connections, ['firstName', 'lastName'])}
            selectedConnections={selectedConnections}
            multiple
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
    <Layout
      {...props}
      notification={notification}
      title='Part 2 - Uncover hidden gems'
    >
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Text element='div' style={style.stepCounter}>
            Step {questionNumber} of {questionCount}
          </Text>
          <Heading>
            {question.title}
          </Heading>
          <Para>
            {question.description}
          </Para>
        </Section>
        <Section padding width='largeI'>
          <Card style={[mss.pl0, mss.pr0]}>
            {hasConnections || selectedConnections.length ? (
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
                  placeholder='e.g., Jonny Ive'
                  onChange={handleSearchChange}
                  onClear={handleSearchClear}
                />
                <Button
                  style={mss.mtReg}
                  type='submit'
                  volume='cheer'
                  disabled={loading}
                >
                  { loading ? (
                    <Loader
                      messages={[
                        'Searching connections'
                      ]}
                      threshold={4000}
                      ellipsis
                    />
                  ) : 'Search' }
                </Button>
              </form>
            ) : (
              <div className={css(mss.plLgIi, mss.prLgIi)}>
                <Text element='label'>
                  Add their details below
                </Text>
                <ConnectionsForm
                  csrfToken={get(props, 'csrfToken')}
                  onChange={getHandleConnectionChange(dispatch)}
                  onSubmit={getHandleConnectionSubmit(dispatch)}
                  connection={get(props, 'newConnection')}
                />
              </div>
            )}
            {renderSearchTable()}
          </Card>
          {(hasConnections || !!selectedConnections.length) && (
            <Button
              subtle
              volume='cheer'
              onClick={getHandleAddClick(dispatch)}
              style={mss.mtReg}
            >
              Add person
            </Button>
          )}
          <Modal
            isOpen={get(props, 'showAddIndividualConnectionModal')}
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
              style={[mss.mtReg, mss.plLgIi, mss.prLgIi]}
              csrfToken={get(props, 'csrfToken')}
              onChange={getHandleConnectionChange(dispatch)}
              onSubmit={getHandleConnectionSubmit(dispatch)}
              connection={get(props, 'newConnection')}
            />
          </Modal>
        </Section>
        <Footer>
          <Basket
            basket={selectedConnections}
            skipLabel="I don't know anyone"
            nextClick={handleSaveAnswers(dispatch, question.id)}
          />
        </Footer>
      </Main>
    </Layout>
  )
}

module.exports = ConnectionsQuestionPage
