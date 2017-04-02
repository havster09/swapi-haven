import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import {loadPeoplePlanets} from './planetActions';

export function loadPeopleSuccess(people) {
  return {
    type:types.LOAD_PEOPLE_SUCCESS,
    people
  };
}

export function loadPeopleDetailSuccess(peopleDetail) {
  return {
    type:types.LOAD_PEOPLE_DETAIL_SUCCESS,
    peopleDetail
  };
}


export function loadPeople() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetch('http://swapi.co/api/people/?page=1')
      .then(response => response.json()).then((data) => {
      let planets = [];
        data.results.forEach((person)=>{
          if(planets.indexOf(person['homeworld'])===-1) {
            planets = [
              ...planets,person['homeworld']
            ];
          }
        });
        dispatch(loadPeoplePlanets(planets));
        return data;
      })
      .then((data) => {
      dispatch(loadPeopleSuccess(data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadPeopleDetail(id, next) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetch(`http://swapi.co/api/people/${id}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(loadPeopleDetailSuccess(data));
        next();
      }).catch(error => {
        throw(error);
      });
  };
}



