/* global SurveyQuestion Company Notification */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, Card, Input, Button } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { setNewItemValue, addEmployment } = require('../actions')
const Layout = require('../../../components/app-layout')
const style = require('../style.css')
const Basket = require('../../../components/basket')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  Footer
} = require('../../../components/wizard')

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
  notification: Notification,
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
    employment,
    notification
  } = props

  return (
    <Layout
      {...props}
      title='Part 2 - Uncover hidden gems'
      notification={notification}
    >
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Text element='div' style={style.stepCounter}>
            Step {questionNumber} of {questionCount}
          </Text>
          <Heading>
            {question.title}
          </Heading>
          <Para>
            {question.description}
          </Para>
        </Section>
        <Section padding width='largeI'>
          <Card>
            <form onSubmit={onAddCompany(dispatch, question.id)}>
              <Text element='label' size='smallI' htmlFor='name'>
                Add the names of all companies you&#39;ve worked at
              </Text>
              <Input
                styleSheet={{ root: mss.mtReg }}
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
                style={mss.mtReg}
              >
                Add company
              </Button>
            </form>
          </Card>
          <Footer>
            <Basket
              basket={companies}
              skipLabel='This is my first job'
              nextHref={nextUri}
            />
          </Footer>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = CompanyQuestionPage
