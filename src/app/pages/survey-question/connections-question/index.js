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
const { merge } = require('@nudj/library')

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
        <title>nudj - Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {questionNumber} of {questionCount}
        </Text>
        <Text element='div' size='largeIi' style={merge(sharedStyle.heading, style.title)}>
          {question.title}
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          {question.description}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={merge(sharedStyle.card, style.formCard)}>
            <form>
              <Input
                name='search'
                label='search'
                type='search'
              />
              <div className={css(style.searchAction)}>
                {location.search ? (
                  <Link href={get(props, 'location.pathname')} volume='cheer' subtle>
                    Clear search
                  </Link>
                ) : (
                  <Button type='submit' volume='cheer'>
                    Search
                  </Button>
                )}
              </div>
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
