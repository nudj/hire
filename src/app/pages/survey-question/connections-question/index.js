const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Link, Align, Card } = require('@nudj/components')
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
    user,
    nextUri,
    dispatch,
    surveyQuestionPage: state
  } = props
  const survey = get(user, 'hirer.company.survey')
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const connections = get(user, 'connections', []).concat(
    get(user, 'newConnection', [])
  )

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {'questionNumber'} of {'questionCount'}
        </Text>
        <Text element='div' size='largeIi' style={merge(sharedStyle.heading, style.title)}>
          {question.title}
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          {question.description}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={merge(sharedStyle.card, style.formCard)}>
            <ConnectionsTable
              onSelect={onSelectConnection(dispatch)}
              connections={connections}
              selectedConnections={get(state, 'selectedConnections', [])}
            />
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`1 added`}
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
