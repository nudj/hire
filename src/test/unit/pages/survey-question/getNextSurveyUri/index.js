/* global expect */
/* eslint-env mocha */
const { getNextSurveyUri } = require('../../../../../app/pages/survey-question/helpers')

const twoQuestionSurvey = {
  id: 'survey1',
  slug: 'aided-recall-baby',
  questions: [
    {
      id: 'question1',
      type: 'COMPANIES'
    },
    {
      id: 'question2',
      type: 'CONNECTIONS'
    }
  ],
  question: {
    id: 'question1',
    type: 'COMPANIES'
  }
}

const oneQuestionSurvey = {
  id: 'survey1',
  slug: 'aided-recall-baby',
  questions: [
    {
      id: 'question1',
      type: 'COMPANIES'
    }
  ],
  question: {
    id: 'question1',
    type: 'COMPANIES'
  }
}

describe('getNextSurveyUri', () => {
  it('fetches URL of next question in line', () => {
    const slug = '/surveys/aided-recall-baby/questions/question2'
    expect(getNextSurveyUri(twoQuestionSurvey)).to.equal(slug)
  })

  it('fetches the survey base url if on final question', () => {
    const slug = '/surveys/aided-recall-baby'
    expect(getNextSurveyUri(oneQuestionSurvey)).to.equal(slug)
  })
})
