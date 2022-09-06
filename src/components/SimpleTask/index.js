import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.css'
export default class SimpleTask extends Component {
  
    constructor(props){
        super()
        this.state={
            id : props.id,
            title : props.title,
            description: props.description
        }
    }

    render() {
    return (
        <Card className="CardStyled">
            <Card.Header> <h5>{this.state.title}</h5> </Card.Header>
            <Card.Body> {this.state.description} </Card.Body>
        </Card>
    )
  }
}
