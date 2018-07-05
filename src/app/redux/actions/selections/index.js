const UPDATE_JOB_SELECTION = 'UPDATE_JOB_SELECTION'
const UPDATE_TEAM_SELECTION = 'UPDATE_TEAM_SELECTION'
const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS'

const updateJobSelection = ids => ({
  type: UPDATE_JOB_SELECTION,
  ids
})

const updateTeamSelection = ids => ({
  type: UPDATE_TEAM_SELECTION,
  ids
})

const clearSelections = () => ({
  type: CLEAR_SELECTIONS
})

module.exports = {
  // Action types
  UPDATE_JOB_SELECTION,
  UPDATE_TEAM_SELECTION,
  CLEAR_SELECTIONS,
  // Action creators
  updateJobSelection,
  updateTeamSelection,
  clearSelections
}
