import { createStore } from 'redux'

let CSSreset = require('../helpers/reset.css'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    Link = require('react-router').Link,
    DashboardPage = require('./pages/Dashboard/Dashboard.js').default;


let store = createStore(admin);

ReactDOM.render((
    <Router>
        <Route path="*" component={DashboardPage}/>
    </Router>
), document.querySelector('.application'));
