import React, {Component} from 'react'
let css = require('./Profile.css');

class Profile extends React.Component {
    render() {
        return (
            <section className="profile">
                <p className="profile__name">
                    <span className="profile__role"></span>
                </p>
                <a className="profile__logout" href="/logout/">Выход</a>
            </section>
        )
    }
}

export default Profile;
