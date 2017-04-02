import {combineReducers} from 'redux';
import people from './peopleReducer';
import planets from './planetReducer';
import peopleDetail from './peopleDetailReducer';
import ratings from './ratingsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  people,
  planets,
  peopleDetail,
  ratings,
  ajaxCallsInProgress
});

export default rootReducer;
