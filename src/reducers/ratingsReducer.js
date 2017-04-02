import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ratingsReducer(state = initialState.ratings, action) {
  switch (action.type) {
    case types.LOAD_PEOPLE_RATINGS_DONE:
      return action.ratings;
    default:
      return state;
  }
}
