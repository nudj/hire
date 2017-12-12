/* global SurveyQuestion Company */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Link, Align, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const { merge } = require('@nudj/library')

const { setNewItemValue, addFormerEmployer } = require('../actions')
const style = require('./style.css')
const sharedStyle = require('../../shared.css')
const FormCompany = require('../../../components/form-company')

function onChangeNewItem (dispatch, itemType) {
  return event => dispatch(setNewItemValue(itemType, event.name, event.value))
}

function onAddCompany (dispatch, questionId) {
  return () => dispatch(addFormerEmployer(questionId))
}

type CompanyQuestionProps = {
  question: SurveyQuestion,
  nextUri: string,
  companiesAdded: number,
  surveyLength: number,
  questionNumber: number,
  formerEmployer: Company,
  dispatch: Function
}

const CompanyQuestionPage = (props: CompanyQuestionProps) => {
  const {
    question,
    questionNumber,
    surveyLength,
    dispatch,
    companiesAdded,
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
          Step {questionNumber} of {surveyLength}
        </Text>
        <Text element='div' size='largeIi' style={merge(sharedStyle.header, style.header)}>
          {question.title}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Text element='div' style={sharedStyle.subheading}>
            {question.description}
          </Text>
          <Card style={style.companyForm}>
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
                  {`${companiesAdded} added`}
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
