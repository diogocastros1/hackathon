import React, { Component } from "react";
import Main from "../templates/Main";
import axios from 'axios'


const headerProps = {
    icon: 'line-chart',
    title: 'APPs',
    subtitle: 'Consumo de cada APP.'
}

const baseUrl = 'http://localhost:3001/app'
const initialState = {
    app: { name: '', download: '' },
    list: []
}

export default class DataUsage extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })


    }

    renderTabel() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(app => {
            return (
                <tr key={app.pid}>
                    <td>{app.pid}</td>
                    <td>{app.name}</td>
                    <td>{app.download}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTabel()}
            </Main>
        )
    }
}