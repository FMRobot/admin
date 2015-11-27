let users = [
    {
        login: 'silentimp'
        , name: 'Антон Немцев'
        , avatar: '//avatars0.githubusercontent.com/u/217308%3Fv=3&s=160'
        , url: 'http://frontender.info/'
        , team: true
        , id: 91283798
        , contacts: [
            {
                name: 'GitHub'
                , title: 'silentimp'
                , url: 'https://github.com/silentimp'
            }
            , {
                name: 'Twitter'
                , title: '@silentimp'
                , url: 'https://twitter.com/silentimp'
            }
            , {
                name: 'Сaйт'
                , title: 'frontender.info'
                , url: 'http://frontender.info/'
            }
        ]
    }
    , {
        login: 'yoksel'
        , name: 'Юля Бухвалова'
        , avatar: '//avatars1.githubusercontent.com/u/2571308?v=3&s=160'
        , url: 'http://css.yoksel.ru/'
        , team: true
        , id: 9128234
        , contacts: [
            {
                name: 'GitHub'
                , title: 'silentimp'
                , url: 'https://github.com/silentimp'
            }
            , {
                name: 'Twitter'
                , title: '@yoksel'
                , url: 'https://twitter.com/yoksel'
            }
            , {
                name: 'Сaйт'
                , title: 'css.yoksel.ru'
                , url: 'http://css.yoksel.ru/'
            }
        ]
    }
    , {
        login: 'pumpkin-king'
        , name: 'Jeremy Girard'
        , avatar: '//avatars3.githubusercontent.com/u/9434372?v=3&s=160'
        , url: 'http://www.pumpkin-king.com/'
        , team: false
        , id: 2128234
        , contacts: [
            {
                name: 'GitHub'
                , title: 'Pumpkin-King'
                , url: 'https://github.com/Pumpkin-King'
            }
            , {
                name: 'Twitter'
                , title: '@jeremymgirard'
                , url: 'https://twitter.com/jeremymgirard'
            }
            , {
                name: 'Сaйт'
                , title: 'www.pumpkin-king.com'
                , url: 'http://www.pumpkin-king.com/'
            }
        ]
    }
    , {
        login: 'mixu'
        , name: 'Mikito Takada'
        , avatar: '//avatars2.githubusercontent.com/u/398530?v=3&s=160'
        , url: 'http://mixu.net/'
        , team: false
        , id: 34528234
        , contacts: [
            {
                name: 'GitHub'
                , title: 'mixu'
                , url: 'https://github.com/mixu'
            }
            , {
                name: 'Twitter'
                , title: '@mikitotakada'
                , url: 'https://twitter.com/mikitotakada'
            }
            , {
                name: 'Сaйт'
                , title: 'mixu.net'
                , url: 'http://mixu.net/'
            }
        ]
    }
];

import React, {Component} from 'react'

class UserList extends Component {
    getInitialState: function(){
        return {
            users: users
        }
    }
    render: function () {
        return <section className="user-list">
                    <form action="/user-list/filter/" method="post">
                        <fieldset>
                            <input name="text" name="name" placeholder="Имя" />
                            <input name="text" name="login" placeholder="Логин" />
                            <label>
                                <input type="checkbox" name="inteam" /> В редакции
                            </label>
                            <label>
                                <input type="checkbox" name="notinteam" /> Не в редакции
                            </label>
                        </fieldset>
                    </form>
                    <menu type="toolbar" className="user-list__menu">
                        <button type="button" className="user-list__add-user">Создать пользователя</button>
                    </menu>
                </section>;
    }
}

export default UserList
