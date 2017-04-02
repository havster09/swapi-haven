import * as types from './actionTypes';
import {store} from '../index';

export function loadPeopleRatingsDone(ratings) {
  return {
    type: types.LOAD_PEOPLE_RATINGS_DONE,
    ratings
  };
}

export function votePeopleRatings(rate, event) {
  let ratings = store.getState().ratings;
  const ratedPersonName = event.target.closest('tr').attributes['data-sw-row'].value;
  const filteredRatings = ratings.filter((rating) => rating.name !== ratedPersonName);
  const existingRating = ratings.find((rating) => rating.name === ratedPersonName);

  if (existingRating) {
    ratings = [
      ...filteredRatings, {name: ratedPersonName, value: parseInt(rate)}
    ];
  }
  else {
    ratings = [
      ...ratings, {name: ratedPersonName, value: parseInt(rate)}
    ];
  }

  return function (dispatch) {
    dispatch(loadPeopleRatingsDone(ratings));
  };
}
