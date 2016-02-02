import React, {Component} from 'react'

let Header = require('../../components/Header/Header.js').default;

class DashboardPage extends React.Component {
    render() {
        return (
            <section className="page">
                <Header/>
            </section>
        )
    }
}

export default DashboardPage
