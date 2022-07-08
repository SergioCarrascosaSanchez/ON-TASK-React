import React, { Component} from 'react'
import {Form, Button} from 'react-bootstrap'
export default class LoginForm extends Component {
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.username.length === 0 || this.state.password.length === 0){
      this.setState({vacio : 'text-danger'})
    }
    else{
      this.setState({vacio : 'd-none'})
      console.log("Api call")
    }
    console.log("submit");
  }

  constructor(props){
    super(props);
    this.state={
      username : '',
      password: '',
      vacio: 'd-none',
      incorrecto: 'd-none'
    }
  }

  render() {
    return (
      <Form className="pe-5 ps-5 pb-5 pt-4">
      <Form.Label className={this.state.vacio}>Debes rellenar todos los campos</Form.Label>
      <Form.Label className={this.state.incorrecto}>Usuario o contraseña incorrectos</Form.Label>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Usuario</Form.Label>
        <Form.Control name="username" type="text" onChange={this.handleChange}/>
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

