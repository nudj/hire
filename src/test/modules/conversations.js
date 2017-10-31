/* global expect */
/* eslint-env mocha */
const nock = require('nock')

const conversations = require('../../app/server/modules/conversations')

describe('Conversations', () => {
  const api = nock('http://127.0.0.1:81')

  nock.emitter.on('no match', function (req) {
    console.log('No match for request:', req)
  })

  beforeEach(() => {
    api
      .post('/conversations', {
        hirer: 'hirer1',
        recipient: 'recipient1',
        job: 'job1',
        threadId: 'thread1',
        provider: 'GMAIL'
      })
      .reply(200, {
        id: 1,
        hirer: 'hirer1',
        recipient: 'recipient1',
        job: 'job1',
        threadId: 'thread1',
        provider: 'GMAIL'
      })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('post', () => {
    it('creates new conversation', () => {
      return expect(conversations.post({}, 'hirer1', 'recipient1', 'job1', 'thread1', 'GMAIL')).to.eventually.deep.equal({
        conversation:
        {
          id: 1,
          hirer: 'hirer1',
          recipient: 'recipient1',
          job: 'job1',
          threadId: 'thread1',
          provider: 'GMAIL'
        }
      })
    })

    it('appends to existing data', () => {
      return conversations.post({ existingData: 'test_data' }, 'hirer1', 'recipient1', 'job1', 'thread1', 'GMAIL')
      .then(response => {
        expect(response).to.have.property('conversation')
        expect(response).to.have.property('existingData', 'test_data')
      })
    })
  })
})
