// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { localStorageManager } from '../middleware';
import rootReducer from '../modules/reducers';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, localStorageManager, router);

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer);
}
