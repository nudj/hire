const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Link, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { toggleConnection, updateConnectionsSearchQuery } = require('../actions')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')
const ConnectionsTable = require('../../../components/connections-table')

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

const ConnectionsQuestionPage = props => {
  const {
    nextUri,
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
            <Text element='div'>
              Search by name and select from the results
            </Text>
            <form className={css(style.form)}>
              <Input
                name='search'
                label='search'
                type='search'
                value={query}
                onChange={getHandleSearchChange(dispatch)}
              />
              {location.search ? (
                <Link
                  style={style.searchAction}
                  href={location.pathname}
                  volume='murmur'
                  subtle
                >
                  Clear search
                </Link>
              ) : (
                <Button style={style.searchAction} type='submit' volume='cheer'>
                  Search
                </Button>
              )}
            </form>
            <ConnectionsTable
              styleSheet={{
                root: style.table
              }}
              onSelect={getHandleSelectConnection(dispatch)}
              connections={connections}
              selectedConnections={selectedConnections}
            />
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`${selectedConnections.length} added`}
                </Text>
              }
              rightChildren={
                <Link volume='cheer' href={nextUri}>
                  Next
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = ConnectionsQuestionPage
