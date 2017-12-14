/* global expect asyncTest */
/* eslint-env mocha */
const {
  START_PARSING_LINKEDIN_CONNECTIONS,
  COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
  START_CONNECTIONS_UPLOAD,
  COMPLETE_CONNECTIONS_UPLOAD
} = require('../../../../app/pages/setup-network/linkedin/actions')
const reducer = require('../../../../app/pages/setup-network/linkedin/reducer')

describe('connections reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      connections: [],
      parsing: false,
      loading: false
    })
  })

  it(`should handle ${START_PARSING_LINKEDIN_CONNECTIONS}`, () => {
    const action = {
      type: START_PARSING_LINKEDIN_CONNECTIONS
    }

    expect(reducer([], action)).to.deep.equal({
      parsing: true
    })

    expect(reducer({ parsing: false }, action)).to.deep.equal({
      parsing: true
    })
  })

  it(`should handle ${COMPLETE_PARSING_LINKEDIN_CONNECTIONS}`, () => {
    const action = {
      type: COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
      connections: [{ email: 'example@email.tld' }]
    }

    expect(reducer([], action)).to.deep.equal({
      parsing: false,
      connections: action.connections
    })

    expect(reducer({ parsing: true }, action)).to.deep.equal({
      parsing: false,
      connections: action.connections
    })
  })

  it(`should handle ${START_CONNECTIONS_UPLOAD}`, () => {
    const action = {
      type: START_CONNECTIONS_UPLOAD
    }

    expect(reducer([], action)).to.deep.equal({
      loading: true
    })

    expect(reducer({ loading: false }, action)).to.deep.equal({
      loading: true
    })
  })

  it(`should handle ${COMPLETE_CONNECTIONS_UPLOAD}`, () => {
    const action = {
      type: COMPLETE_CONNECTIONS_UPLOAD
    }

    expect(reducer([], action)).to.deep.equal({
      loading: false
    })

    expect(reducer({ loading: true }, action)).to.deep.equal({
      loading: false
    })
  })
})
