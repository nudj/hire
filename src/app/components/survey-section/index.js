const React = require('react')
const get = require('lodash/get')

const QuestionChoice = require('../../components/questions/choice')
const QuestionMultichoice = require('../../components/questions/multichoice')
const QuestionText = require('../../components/questions/text')
const QuestionFreetext = require('../../components/questions/freetext')
const { questionTypes } = require('../../lib/constants')

const {
  TEXT,
  FREETEXT,
  CHOICE,
  MULTICHOICE
} = questionTypes

const SurveySection = (props) => {
  const id = get(props, 'id')
  const type = get(props, 'type')

  if (type) {
    const {
      onChangeChoice,
      onChangeMultiChoice,
      onChangeText
    } = get(props, 'handlers')
    const answers = get(props, 'answers')
    const questionName = get(props, 'name')
    let Question
    let onChange
    switch (type) {
      case TEXT:
        Question = QuestionText
        onChange = onChangeText
        break
      case FREETEXT:
        Question = QuestionFreetext
        onChange = onChangeText
        break
      case CHOICE:
        Question = QuestionChoice
        onChange = onChangeChoice
        break
      case MULTICHOICE:
        Question = QuestionMultichoice
        onChange = onChangeMultiChoice
        break
    }
    return <Question key={id} {...props} onChange={onChange} value={answers[questionName]} />
  } else {
    return (
      <div>
        <h3>{get(props, 'title')}</h3>
        <p>{get(props, 'description')}</p>
      </div>
    )
  }
}

module.exports = SurveySection
