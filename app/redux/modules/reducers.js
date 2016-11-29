// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import views from './views';
import counter from './counter';

const rootReducer = combineReducers({
  routing,
  views,
  counter
});

export default rootReducer;
