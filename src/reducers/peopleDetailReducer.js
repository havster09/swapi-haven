import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function peopleDetailReducer(state = initialState.peopleDetail, action) {
  switch (action.type) {
      case types.LOAD_PEOPLE_DETAIL_SUCCESS:
      return action.peopleDetail;
    default:
      return state;
  }
}
