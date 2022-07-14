import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './styles.css'
export default class SimpleTask extends Component {
  
    constructor(props){
        super()
        console.log(props)
        this.state={
            title : props.title,
            description: props.description
        }
    }

    render() {
    return (
        <Card className="CardStyled">
            <Card.Header className="text-justify"> <h3>{this.state.title}</h3> </Card.Header>
            <Card.Body> {this.state.description} </Card.Body>
        </Card>
    )
  }
}
