/* global SurveyQuestion Company */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Link, Align, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const { merge } = require('@nudj/library')

const { setNewItemValue, addFormerEmployer } = require('../actions')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')
const FormCompany = require('../../../components/form-company')

function onChangeNewItem (dispatch, itemType) {
  return event => dispatch(setNewItemValue(itemType, event.name, event.value))
}

function onAddCompany (dispatch, questionId) {
  return (event) => {
    event.preventDefault()
    dispatch(addFormerEmployer(questionId))
  }
}

type CompanyQuestionProps = {
  question: SurveyQuestion,
  nextUri: string,
  companies: Array<Company>,
  questionCount: number,
  questionNumber: number,
  formerEmployer: Company,
  dispatch: Function
}

const CompanyQuestionPage = (props: CompanyQuestionProps) => {
  const {
    question,
    questionNumber,
    questionCount,
    dispatch,
    companies,
    nextUri,
    formerEmployer
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
        <Text element='div' size='largeIi' style={merge(sharedStyle.heading, sharedStyle.subheading)}>
          {question.title}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Text element='div' style={sharedStyle.subheading}>
            {question.description}
          </Text>
          <Card style={merge(sharedStyle.card, style.formCard)}>
            <FormCompany
              onChange={onChangeNewItem(dispatch, 'newFormerEmployer')}
              onSubmit={onAddCompany(dispatch, question.id)}
              company={formerEmployer}
            />
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`${companies.length} added`}
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