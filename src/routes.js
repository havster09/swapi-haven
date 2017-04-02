import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PeoplePage from './components/people/PeoplePage';
import PeopleDetailContainer from './components/people/PeopleDetailContainer';
import * as peopleActions from './actions/peopleActions';
import {store} from './index';

function peopleDetailHandler(nextState, replaceWith, next) {
  store.dispatch(
    peopleActions.loadPeopleDetail(nextState.params.id, next));
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="people" component={PeoplePage}/>
    <Route path="people/:id" component={PeopleDetailContainer} onEnter={peopleDetailHandler}
    />
  </Route>
);


