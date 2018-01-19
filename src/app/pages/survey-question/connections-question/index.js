const React = require('react')
const { Helmet } = require('react-helmet')
const isNil = require('lodash/isNil')

const { Text, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const {
  updateConnectionsSearchQuery,
  saveSurveyAnswers,
  setSelectedConnections,
  search
} = require('../actions')
const Layout = require('../../../components/app-layout')
const sharedStyle = require('../../shared.css')
const style = require('../style.css')
const ConnectionsTable = require('../../../components/connections-table')

const getHandleSetConnections = dispatch => e => {
  e.preventDefault()
  dispatch(setSelectedConnections(e.value))
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
  dispatch(search())
}

const ConnectionsQuestionPage = props => {
  const {
    dispatch,
    questionNumber,
    questionCount,
    connections,
    question,
    selectedConnections,
    searchInput,
    searchQuery,
    history,
    match
  } = props

  console.log(props)
  const handleSearchChange = getHandleSearchChange(dispatch)
  const handleSearchClear = ({ value }) => {
    handleSearchChange(value)
    history.push(match.url)
  }

  const renderSearchTable = () => {
    switch (true) {
      case !!connections.length:
        return (
          <div className={css(style.tableOverflow)}>
            <ConnectionsTable
              styleSheet={{
                root: style.table
              }}
              onSelect={getHandleSetConnections(dispatch)}
              connections={connections}
              selectedConnections={selectedConnections}
              multiple
            />
          </div>
        )
      case !connections.length && !isNil(searchQuery):
        return (
          <div className={css(style.tableOverflow)}>
            <Text element='div' size='largeI' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
              0 people match '{searchQuery}'
            </Text>
            <Text element='div' style={sharedStyle.subheading}>
              We can't find anyone in your contacts that matches your query.
              Try another search term or add them manually using the link below
            </Text>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Layout
      {...props}
      styleSheet={{root: sharedStyle.root}}
      title='Part 2 - Uncover gems'
    >
      <Helmet>
        <title>Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {questionNumber} of {questionCount}
        </Text>
        <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
          {question.title}
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          {question.description}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={[sharedStyle.card, style.card]}>
            <form
              onSubmit={getHandleSearchSubmit(dispatch)}
              className={css(style.form)}
            >
              <Text element='label' size='smallI' htmlFor='search'>
                Search by name and select from the results
              </Text>
              <Input
                styleSheet={{ root: style.input }}
                name='search'
                label='search'
                type='search'
                value={searchInput}
                placeholder='e.g., Jonny Ive'
                onChange={handleSearchChange}
                onClear={handleSearchClear}
              />
              <Button style={style.submitButton} type='submit' volume='cheer'>
                Search
              </Button>
            </form>
            {renderSearchTable()}
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`${selectedConnections.length} added`}
                </Text>
              }
              rightChildren={
                <Button
                  onClick={handleSaveAnswers(dispatch, question.id)}
                  type='submit'
                  volume='cheer'
                >
                  Next
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

module.exports = ConnectionsQuestionPage
