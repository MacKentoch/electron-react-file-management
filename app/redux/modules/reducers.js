// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import views from './views';
import files from './files';
import notifications from './notifications';

const rootReducer = combineReducers({
  routing,
  views,
  files,
  notifications
});

export default rootReducer;
