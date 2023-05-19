/* eslint-disable import/no-anonymous-default-export */
import React, {Component} from 'react'

export default class Graphic extends Component {
    render() {
        const {name, download} = this.props
        return (
            <div>
                <p>{name}---------{download}</p> 
            </div>
        )
    }
}