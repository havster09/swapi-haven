import {combineReducers} from 'redux';
import people from './peopleReducer';
import planets from './planetReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  people,
  planets,
  ajaxCallsInProgress
});

export default rootReducer;
