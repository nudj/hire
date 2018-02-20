/* eslint-env mocha */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const Papa = require('../../app/lib/papa')

const expect = chai.expect
chai.use(chaiAsPromised)

const input = `album,year,US_peak_chart_post
The White Stripes,1999,-
De Stijl,2000,-
White Blood Cells,2001,61
Elephant,2003,6
Get Behind Me Satan,2005,3
Icky Thump,2007,2
Under Great White Northern Lights,2010,11
Live in Mississippi,2011,-
Live at the Gold Dollar,2012,-
Nine Miles from the White City,2013,-`

const output = {
  errors: [],
  meta: {
    delimiter: ',',
    linebreak: '\n',
    aborted: false,
    truncated: false,
    cursor: 295
  },
  data: [
    ['album', 'year', 'US_peak_chart_post'],
    ['The White Stripes', '1999', '-'],
    ['De Stijl', '2000', '-'],
    ['White Blood Cells', '2001', '61'],
    ['Elephant', '2003', '6'],
    ['Get Behind Me Satan', '2005', '3'],
    ['Icky Thump', '2007', '2'],
    ['Under Great White Northern Lights', '2010', '11'],
    ['Live in Mississippi', '2011', '-'],
    ['Live at the Gold Dollar', '2012', '-'],
    ['Nine Miles from the White City', '2013', '-']
  ]
}

describe('Extended Papa', () => {
  describe('asyncParse', () => {
    it('returns a promise', () => {
      const promise = Papa.asyncParse(input)

      return expect(promise).to.be.an.instanceof(Promise)
    })

    it('resolves to JSON', () => {
      return expect(Papa.asyncParse(input)).to.eventually.deep.equal(output)
    })

    it('rejects with invalid input', () => {
      return expect(Papa.asyncParse()).to.be.rejected()
    })
  })
})
