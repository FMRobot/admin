import React, {Component} from 'react'
let css = require('./Header.css'),
    Profile = require('../Profile/Profile.js').default;

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Profile  />
            </header>
        )
    }
}

export default Header;
