import React, {Component} from 'react';

import {users} from './fixture.js';

class UserList extends Component {
  getInitialState() {
    return {users};
  }

  render() {
    return (
      <section className="user-list">
        <form action="/user-list/filter/" method="post">
          <fieldset>
            <input name="text" name="name" placeholder="Имя"/>
            <input name="text" name="login" placeholder="Логин"/>
            <label>
              <input type="checkbox" name="inteam"/> В редакции
            </label>
            <label>
              <input type="checkbox" name="notinteam"/> Не в редакции
            </label>
          </fieldset>
        </form>
        <menu type="toolbar" className="user-list__menu">
          <button type="button" className="user-list__add-user">Создать пользователя</button>
        </menu>
      </section>
    );
  }
}

export default UserList;
