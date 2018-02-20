/* eslint-env mocha */
const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const thunk = require('redux-thunk').default
const proxyquire = require('proxyquire')

let configureMockStore = require('redux-mock-store')
configureMockStore = configureMockStore.default || configureMockStore

const expect = chai.expect
chai.use(chaiAsPromised)
const postDataSpy = sinon.stub().returns({ type: 'FAKE_POST_DATA' })

const {
  START_PARSING_LINKEDIN_CONNECTIONS,
  COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
  START_CONNECTIONS_UPLOAD,
  COMPLETE_CONNECTIONS_UPLOAD,
  startParsingLinkedinConnections,
  completeParsingLinkedinConnections,
  startConnectionsUpload,
  completeConnectionsUpload,
  parseLinkedinConnections,
  uploadLinkedinConnections
} = proxyquire('../../../../app/pages/setup-linkedin/actions', {
  '../../lib/papa': {
    asyncParse: file => Promise.resolve()
  },
  '../../lib/linkedin-to-nudj': {
    linkedinToNudjPeople: () => [{ email: 'example@email.tld' }]
  },
  '@nudj/framework/actions': {
    app: {
      postData: postDataSpy
    }
  }
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('linkedin connections upload action creators', () => {
  describe(`startParsingLinkedinConnections action creator`, () => {
    it(`it should create an action to signify the parsing of linkedin connections`, () => {
      const expectedAction = {
        type: START_PARSING_LINKEDIN_CONNECTIONS
      }
      expect(startParsingLinkedinConnections()).to.deep.equal(expectedAction)
    })
  })

  describe(`completeParsingLinkedinConnections action creator`, () => {
    it(`it should create an action to signify the completion of parsing of linkedin connections`, () => {
      const connections = [
        {
          email: 'example@email.tld'
        }
      ]

      const expectedAction = {
        type: COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
        connections
      }
      expect(completeParsingLinkedinConnections(connections)).to.deep.equal(
        expectedAction
      )
    })
  })

  describe(`startConnectionsUpload action creator`, () => {
    it(`it should create an action to signify the start of the upload of connections`, () => {
      const expectedAction = {
        type: START_CONNECTIONS_UPLOAD
      }
      expect(startConnectionsUpload()).to.deep.equal(expectedAction)
    })
  })

  describe(`completeConnectionsUpload action creator`, () => {
    it(`it should create an action to signify the completion of the upload of connections `, () => {
      const expectedAction = {
        type: COMPLETE_CONNECTIONS_UPLOAD
      }
      expect(completeConnectionsUpload()).to.deep.equal(expectedAction)
    })
  })

  describe('parseLinkedinConnections action creator', () => {
    it('triggers the relevant actions', () => {
      const expectedActions = [
        { type: START_PARSING_LINKEDIN_CONNECTIONS },
        {
          type: COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
          connections: [{ email: 'example@email.tld' }]
        }
      ]

      const store = mockStore({ connections: [] })

      return store.dispatch(parseLinkedinConnections('FILE')).then(() => {
        return expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })

  describe('uploadLinkedinConnections action creator', () => {
    it('triggers the relevant actions', () => {
      const expectedActions = [
        {
          type: START_CONNECTIONS_UPLOAD
        },
        {
          type: 'FAKE_POST_DATA'
        },
        {
          type: COMPLETE_CONNECTIONS_UPLOAD
        }
      ]

      const store = mockStore({ uploadLinkedinConnectionsPage: { connections: [] } })

      return store.dispatch(uploadLinkedinConnections()).then(() => {
        expect(postDataSpy.called).to.equal(true)
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })
})
