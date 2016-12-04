// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import views from './views';
import counter from './counter';
import files from './files';

const rootReducer = combineReducers({
  routing,
  views,
  files,
  counter
});

export default rootReducer;
