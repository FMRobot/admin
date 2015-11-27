let React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    Link = require('react-router').Link,
    ControlPanel = require('./components/ControlPanel/ControlPanel.js');


ReactDOM.render((
    <Router>
        <Route path="*" component={ControlPanel}/>
    </Router>
), document.querySelector('.application'));

//
// ReactDOM.render(
//     React.createElement("span", null, "Hello")
//     , document.querySelector('.application'));
