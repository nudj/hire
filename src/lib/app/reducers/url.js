import {
  SET_JOB
} from '../actions/app'

const initialState = {}

export function urlReducer (state = initialState, action) {
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}
