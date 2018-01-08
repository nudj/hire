const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const {
  toggleConnection,
  updateConnectionsSearchQuery,
  saveSurveyAnswers
} = require('../actions')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')
const ConnectionsTable = require('../../../components/connections-table')
const ButtonLink = require('../../../components/button-link')

function getHandleSelectConnection (dispatch) {
  return event => {
    event.preventDefault()
    dispatch(toggleConnection(event.value))
  }
}

function getHandleSearchChange (dispatch) {
  return ({ value }) => {
    dispatch(updateConnectionsSearchQuery(value))
  }
}

function handleSaveAnswers (dispatch, questionId) {
  return event => {
    event.preventDefault()
    dispatch(saveSurveyAnswers(questionId))
  }
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
    query
  } = props

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
            <form className={css(style.form)}>
              <Input
                name='search'
                label='search'
                type='search'
                value={query}
                onChange={getHandleSearchChange(dispatch)}
              />
              {location.search ? (
                <ButtonLink
                  style={style.searchAction}
                  href={get(props, 'location.pathname')}
                  volume='cheer'
                  subtle
                  preventReload={false}
                >
                  Clear search
                </ButtonLink>
              ) : (
                <Button style={style.searchAction} type='submit' volume='cheer'>
                  Search
                </Button>
              )}
            </form>
            {connections.length ? (
              <ConnectionsTable
                styleSheet={{
                  root: style.table
                }}
                onSelect={getHandleSelectConnection(dispatch)}
                connections={connections}
                selectedConnections={selectedConnections}
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
