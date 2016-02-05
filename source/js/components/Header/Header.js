import React, {Component} from 'react';
import Profile from '../Profile/Profile.js';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Profile/>
      </header>
    );
  }
}

export default Header;
