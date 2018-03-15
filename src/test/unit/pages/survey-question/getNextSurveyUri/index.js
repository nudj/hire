/* global expect */
/* eslint-env mocha */
const getNextSurveyUri = require('../../../../../app/pages/survey-question/getNextSurveyUri')

const twoQuestionSurvey = {
  id: 'survey1',
  slug: 'aided-recall-baby',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          type: 'COMPANIES'
        },
        {
          id: 'question2',
          type: 'CONNECTIONS'
        }
      ]
    }
  ],
  section: {
    id: 'section1',
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
}

const oneQuestionSurvey = {
  id: 'survey1',
  slug: 'aided-recall-baby',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          type: 'COMPANIES'
        }
      ]
    }
  ],
  section: {
    id: 'section1',
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
}

const twoSectionSurvey = {
  id: 'survey1',
  slug: 'aided-recall-baby',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          type: 'COMPANIES'
        }
      ]
    },
    {
      id: 'section2',
      questions: [
        {
          id: 'question2',
          type: 'COMPANIES'
        }
      ]
    }
  ],
  section: {
    id: 'section1',
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
}

describe('getNextSurveyUri', () => {
  it('fetches URL of next question in line', () => {
    const slug = '/surveys/aided-recall-baby/sections/section1/connections/question2'
    expect(getNextSurveyUri(twoQuestionSurvey)).to.equal(slug)
  })

  it('fetches a survey-section URL if section is next', () => {
    const slug = '/surveys/aided-recall-baby/sections/section2'
    expect(getNextSurveyUri(twoSectionSurvey)).to.equal(slug)
  })

  it('fetches the survey-complete section if on final question', () => {
    const slug = '/surveys/aided-recall-baby/complete'
    expect(getNextSurveyUri(oneQuestionSurvey)).to.equal(slug)
  })
})
