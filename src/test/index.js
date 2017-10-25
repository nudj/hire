/* eslint-env mocha */
let chai = require('chai')
let dirtyChai = require('dirty-chai')
let chaiAsPromised = require('chai-as-promised')
let expect = chai.expect
chai.use(chaiAsPromised)
chai.use(dirtyChai)

process.env.LOG_LEVEL = 'disabled'

describe('This', function () {
  it('should work', function () {
    expect(true).to.be.true()
  })
})
