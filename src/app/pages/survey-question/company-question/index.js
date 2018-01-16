/* global SurveyQuestion Company */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Align, Card, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { setNewItemValue, addEmployment } = require('../actions')
const Layout = require('../../../components/app-layout')
const sharedStyle = require('../../shared.css')
const style = require('../style.css')
const ButtonLink = require('../../../components/button-link')

function onChangeNewItem (dispatch, itemType) {
  return event => dispatch(setNewItemValue(itemType, event.name, event.value))
}

function onAddCompany (dispatch, questionId) {
  return event => {
    event.preventDefault()
    dispatch(addEmployment(questionId))
  }
}

type CompanyQuestionProps = {
  question: SurveyQuestion,
  nextUri: string,
  companies: Array<Company>,
  questionCount: number,
  questionNumber: number,
  employment: Company,
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
    employment
  } = props

  return (
    <Layout {...props} styleSheet={{root: sharedStyle.root }} title="Part 2 - Uncover gems">
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {questionNumber} of {questionCount}
        </Text>
        <Text
          element='div'
          size='largeIi'
          style={sharedStyle.heading}
        >
          {question.title}
        </Text>
        <Text element='div' style={sharedStyle.subheading}>
          {question.description}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Card style={sharedStyle.card}>
            <form onSubmit={onAddCompany(dispatch, question.id)}>
              <Text element='label' size='smallI' htmlFor='name'>
                Add all the companies you’ve worked at previously
              </Text>
              <Input
                styleSheet={{ root: style.input }}
                id='name'
                value={get(employment, 'name', '')}
                name='name'
                onChange={onChangeNewItem(dispatch, 'newEmployment')}
                placeholder='e.g., Apple'
                required
              />
              <Button
                type='submit'
                volume='cheer'
                style={style.submitButton}
              >
                Add company
              </Button>
            </form>
          </Card>
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
                  {`${companies.length} added`}
                </Text>
              }
              rightChildren={
                <ButtonLink volume='cheer' href={nextUri}>
                  Next
                </ButtonLink>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

module.exports = CompanyQuestionPage
