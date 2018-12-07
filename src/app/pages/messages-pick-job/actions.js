const SELECT_JOB = 'SELECT_JOB'

const selectJob = id => ({
  type: SELECT_JOB,
  id
})

module.exports = {
  // constants
  SELECT_JOB,
  // action creators
  selectJob
}
