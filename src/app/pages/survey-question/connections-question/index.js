const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  Text,
  Link,
  Align,
  Card,
  Input,
  Button
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { toggleConnection } = require('../actions')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')
const ConnectionsTable = require('../../../components/connections-table')

function onSelectConnection (dispatch) {
  return (event) => {
    event.preventDefault()
    dispatch(toggleConnection(event.value))
  }
}

const CompanyQuestionPage = (props) => {
  const {
    nextUri,
    dispatch,
    questionNumber,
    questionCount,
    connections,
    question,
    location,
    selectedConnections
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
            <form>
              <Input
                name='search'
                label='search'
                type='search'
              />
              {location.search ? (
                <Link style={style.searchAction} href={get(props, 'location.pathname')} volume='cheer' subtle>
                  Clear search
                </Link>
              ) : (
                <Button style={style.searchAction} type='submit' volume='cheer'>
                  Search
                </Button>
              )}
            </form>
            <ConnectionsTable
              onSelect={onSelectConnection(dispatch)}
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

module.exports = CompanyQuestionPage
