import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadPeoplePlanetsSuccess(planets) {
  return {
    type: types.LOAD_PEOPLE_PLANETS_SUCCESS,
    planets
  };
}

export function loadPeoplePlanets(planets) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    Promise.all(planets.map(url => {
        return fetch(url).then(response => response.json());
      })
    ).then(allPlanets => {
      planets = [...allPlanets];
      dispatch(loadPeoplePlanetsSuccess(planets));
    }).catch(error => {
      throw(error);
    });
  };
}
