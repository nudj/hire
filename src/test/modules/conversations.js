/* global expect asyncTest */
/* eslint-env mocha */
const nock = require('nock')

const conversations = require('../../app/server/modules/conversations')

const api = nock('http://127.0.0.1:81')
const mockConversationsPost = () => {
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
}

describe('Conversations', () => {
  nock.emitter.on('no match', function (req) {
    console.log('No match for request:', req)
  })

  beforeEach(() => {
    mockConversationsPost()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('post', () => {
    it('creates new conversation', asyncTest(async () => {
      const data = {}
      data.conversation = await conversations.post('hirer1', 'recipient1', 'job1', 'thread1', 'GMAIL')
      expect(data).to.deep.equal({
        conversation: {
          id: 1,
          hirer: 'hirer1',
          recipient: 'recipient1',
          job: 'job1',
          threadId: 'thread1',
          provider: 'GMAIL'
        }
      })
    }))

    it('can append to existing data', asyncTest(async () => {
      const data = { existingData: 'test_data' }
      data.conversation = await conversations.post('hirer1', 'recipient1', 'job1', 'thread1', 'GMAIL')
      expect(data.conversation).to.exist()
      expect(data.existingData).to.equal('test_data')
    }))
  })
})
