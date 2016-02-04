import React, {Component} from 'react';

import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <section className="profile">
        <p className="profile__name">
          <span className="profile__role"/>
        </p>
        <a className="profile__logout" href="/logout/">Выход</a>
      </section>
    );
  }
}

export default Profile;
