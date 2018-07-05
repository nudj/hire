const { createReducer } = require('../../../lib')
const {
  UPDATE_JOB_SELECTION,
  UPDATE_TEAM_SELECTION,
  CLEAR_SELECTIONS
} = require('../../actions/selections')

const reducers = {
  [UPDATE_JOB_SELECTION]: (state, { ids }) => ({
    ...state,
    jobs: ids
  }),
  [UPDATE_TEAM_SELECTION]: (state, { ids }) => ({
    ...state,
    team: ids
  }),
  [CLEAR_SELECTIONS]: () => initialState
}

const initialState = {
  jobs: [],
  team: []
}

module.exports = createReducer(initialState, reducers)
