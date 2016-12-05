// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import views from './views';
import files from './files';

const rootReducer = combineReducers({
  routing,
  views,
  files
});

export default rootReducer;
