const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const {
  toggleConnection,
  updateConnectionsSearchQuery,
  saveSurveyAnswers,
  setSelectedConnections
} = require('../actions')
const sharedStyle = require('../../shared.css')
const style = require('../style.css')
const ConnectionsTable = require('../../../components/connections-table')
const ButtonLink = require('../../../components/button-link')

const getHandleSetConnections = dispatch => (e) => {
  e.preventDefault()
  dispatch(setSelectedConnections(e.value))
}

const getHandleSearchChange = (dispatch) => ({ value }) => {
  dispatch(updateConnectionsSearchQuery(value))
}

const handleSaveAnswers = (dispatch, questionId) => event => {
  event.preventDefault()
  dispatch(saveSurveyAnswers(questionId))
}

const ConnectionsQuestionPage = props => {
  const {
    dispatch,
    questionNumber,
    questionCount,
    connections,
    question,
    location,
    selectedConnections,
    query,
    history,
    match
  } = props

  const handleSearchChange = getHandleSearchChange(dispatch)
  const handleSearchClear = ({ value }) => {
    handleSearchChange(value)
    history.push(match.url)
  }

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {questionNumber} of {questionCount}
        </Text>
        <Text element='div' size='largeIi' style={sharedStyle.heading}>
          {question.title}
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          {question.description}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={sharedStyle.card}>
            <form>
              <Text element='label' size='smallI' htmlFor='search'>
                Search by name and select from the results
              </Text>
              <Input
                styleSheet={{ root: style.input }}
                name='search'
                label='search'
                type='search'
                value={query}
                onChange={getHandleSearchChange(dispatch)}
                placeholder='e.g., Jonny Ive'
                onChange={handleSearchChange}
                onClear={handleSearchClear}
              />
              <Button style={style.submitButton} type='submit' volume='cheer'>
                Search
              </Button>
              )}
            </form>
            {connections.length ? (
              <ConnectionsTable
                styleSheet={{
                  root: style.table
                }}
                onSelect={getHandleSetConnections(dispatch)}
                connections={connections}
                selectedConnections={selectedConnections}
                multiple
              />
            ) : (
              ''
            )}
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`${selectedConnections.length} added`}
                </Text>
              }
              rightChildren={
                <Button onClick={handleSaveAnswers(dispatch, question.id)} type='submit' volume='cheer'>
                  Next
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = ConnectionsQuestionPage
