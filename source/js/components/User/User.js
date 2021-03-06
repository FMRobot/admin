import React, {Component} from 'react';

class User extends Component {
  render() {
    return (
      <article className="user" data-id="">
        <figure className="user__details">
          <img src="" alt="avatar" className="user__avatar"/>
          <figcaption className="user__name"></figcaption>
        </figure>
        <menu className="user__controls" type="toolbar">
          <button type="button">Удалить</button>
          <button type="button">Редактировать</button>
        </menu>
      </article>
    );
  }
}

export default User;
