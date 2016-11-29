// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './views/Home';
import HistoryPage from './views/History';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/history" component={HistoryPage} />
  </Route>
);
