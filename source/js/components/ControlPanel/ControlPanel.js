class ControlPanel extends React.Component {
    render() {
        return (
            <section className="control-panel">
                <menu type="toolbar" className="control-panel__menu">
                    <button type="button" className="control-panel__button control-panel__button_users">Пользователи</button>
                    <button type="button" className="control-panel__button control-panel__button_article">Добавить<br/>Статью</button>
                    <button type="button" className="control-panel__button control-panel__button_translation">Перевод<br/>Перевод</button>
                </menu>
            </section>
        )
    }
}

export default ControlPanel
