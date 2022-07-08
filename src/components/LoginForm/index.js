import React, { Component} from 'react'
import {Form, Button} from 'react-bootstrap'
export default class LoginForm extends Component {
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state.username);
    console.log(this.state.password);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    /*Object.keys(this.state).forEach((e) => {
        if(this.state[e].length === 0){
            this.setState({vacio : true})
        }
    })*/
    console.log("submit");
  }

  constructor(props){
    super(props);
    this.state={
      username : '',
      password: ''
    }
  }

  render() {
    return (
      <Form className="p-5">
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Usuario</Form.Label>
        <Form.Control name="username" type="email" onChange={this.handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control name="password" type="password" onChange={this.handleChange}/>
      </Form.Group>
      <Button variant="primary" onClick={this.handleSubmit}>
        Iniciar sesión
      </Button>
    </Form>
    )
  }
}

