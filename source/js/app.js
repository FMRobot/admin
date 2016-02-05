import React from 'react';
import {Route, Router} from 'react-router';
import {render} from 'react-dom';

import DashboardPage from './pages/Dashboard/Dashboard.js';
import '../helpers/reset.css';

const app = (
  <Router>
    <Route path="*" component={DashboardPage}/>
  </Router>
);

render(app, document.querySelector('.application'));
