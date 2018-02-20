/* eslint-env mocha */
const { expect } = require('chai')
const {
  normaliseLinkedinContact,
  linkedinToNudjPerson,
  linkedinToNudjPeople
} = require('../../../app/lib/linkedin-to-nudj')

const inputWithSpaces = {
  'Email Address': 'example@email.tld',
  'First Name': 'Nudj',
  'Last Name': 'McNudjer',
  Position: "Head of Nudj'ing",
  Company: 'nudj'
}

const inputWithoutSpaces = {
  EmailAddress: 'example@email.tld',
  FirstName: 'Nudj',
  LastName: 'McNudjer',
  Position: "Head of Nudj'ing",
  Company: 'nudj'
}

const formattedInput = {
  emailAddress: 'example@email.tld',
  firstName: 'Nudj',
  lastName: 'McNudjer',
  position: "Head of Nudj'ing",
  company: 'nudj'
}

const person = {
  email: 'example@email.tld',
  firstName: 'Nudj',
  lastName: 'McNudjer',
  title: "Head of Nudj'ing",
  company: 'nudj'
}

describe('normaliseLinkedinContact', () => {
  it('returns a predictable linkedin contact', () => {
    expect(normaliseLinkedinContact(inputWithSpaces)).to.deep.equal(
      formattedInput
    )
    expect(normaliseLinkedinContact(inputWithoutSpaces)).to.deep.equal(
      formattedInput
    )
  })
})

describe('linkedinToNudjPerson', () => {
  describe('linkedin contact with spaces in the keys', () => {
    it('returns a valid nudj person', () => {
      expect(linkedinToNudjPerson(inputWithSpaces)).to.deep.equal(person)
    })
  })

  describe('linkedin contact without spaces in the keys', () => {
    it('returns a valid nudj person', () => {
      expect(linkedinToNudjPerson(inputWithoutSpaces)).to.deep.equal(person)
    })
  })
})

describe('linkedinToNudjPeople', () => {
  it('returns an array of nudj people', () => {
    const nudjPerson = linkedinToNudjPeople([inputWithSpaces])

    expect(nudjPerson).to.deep.equal([person])
  })

  it('filters connections without an email address', () => {
    expect(
      linkedinToNudjPeople([
        {
          'Email Address': ''
        },
        {
          'Email Address': 'example'
        }
      ]).length
    ).to.equal(1)
  })

  it('returns an alphabetically sorted list', () => {
    expect(
      linkedinToNudjPeople([
        {
          'Email Address': 'b',
          'First Name': 'b'
        },
        {
          'Email Address': 'a',
          'First Name': 'a'
        }
      ])
    ).to.deep.equal([
      {
        email: 'a',
        firstName: 'a',
        lastName: '',
        title: '',
        company: ''
      },
      {
        email: 'b',
        firstName: 'b',
        lastName: '',
        title: '',
        company: ''
      }
    ])
  })
})
