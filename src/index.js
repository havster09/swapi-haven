import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router,browserHistory} from 'react-router';
import routes from './routes';
import {loadPeople} from './actions/peopleActions';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export const store = configureStore();
store.dispatch(loadPeople());

render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
