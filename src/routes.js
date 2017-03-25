import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PeoplePage from './components/people/PeoplePage';
import PeoplePageContainer from './components/people/PeoplePageContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="people" component={PeoplePage}/>
    <Route path="people/:id" component={PeoplePageContainer}/>
  </Route>
);


