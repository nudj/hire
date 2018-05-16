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

const CompanyQuestionPage = (props) => {
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
      title='Step 2: Uncover hidden gems'
      notification={notification}
    >
      <Helmet>
        <title>Uncover hidden gems</title>
      </Helmet>
      <Main>
        <Section padding>
          <Text fsShow element='div' style={style.stepCounter}>
            Question {questionNumber} of {questionCount}
          </Text>
          <Heading fsShow>
            {question.title}
          </Heading>
          <Para fsShow>
            {question.description}
          </Para>
        </Section>
        <Section padding width='largeI'>
          <Card>
            <form onSubmit={onAddCompany(dispatch, question.id)}>
              <Text fsShow element='label' size='smallI' htmlFor='name'>
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
                fsShow
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
              basket={companies.map((item) => ({
                id: item.company.id,
                value: item.company.name
              }))}
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
