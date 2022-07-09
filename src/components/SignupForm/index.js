import React, { Component} from 'react'
import {Form, Button} from 'react-bootstrap'
export default class SignupForm extends Component {

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    let doApiCall = true;

    event.preventDefault();

    if(this.state.username.length === 0 || this.state.name.length === 0 || this.state.email.length === 0 || this.state.password.length === 0 || this.state.password2.length === 0){
        this.setState({vacio : 'text-danger'})
        doApiCall = false;
    }
    else{
      this.setState({vacio : 'd-none'})
    }
    
    if(this.state.password2 !== this.state.password){
      this.setState({password2Repeated : 'is-invalid'})
      doApiCall = false;
    }
    else{
      this.setState({password2Repeated : ''})
    }
    if(this.state.password.length < 8){
      this.setState({passwordLength : 'is-invalid'})
      doApiCall = false;
    }
    else{
      this.setState({passwordLength : ''})
    }
    
    if(doApiCall){
      console.log("Api call")
    }
    console.log("submit");

  }

  constructor(props){
    super(props);
    this.state={
      username : '',
      password: '',
      name: '',
      email:'',
      password2: '',
      vacio: 'd-none',
      password2Repeated: '',
      passwordLength: ''
    }
  }
  render() {
    return (
      <Form className="pe-5 ps-5 pb-5 pt-4">
      <Form.Label className={this.state.vacio}>Debes rellenar todos los campos</Form.Label>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Usuario</Form.Label>
        <Form.Control name="username" type="text" className="is-invalid" onChange={this.handleChange}/>
        <div className="invalid-feedback">Este nombre de usuario ya esta en uso</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name="name" type="text" onChange={this.handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" className="is-invalid" onChange={this.handleChange}/>
        <div className="invalid-feedback">Este email ya esta en uso</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control name="password" type="password"  className={this.state.passwordLength}onChange={this.handleChange}/>
        <div className="invalid-feedback">La contraseña debe superar los 8 caracteres</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirma tu contraseña</Form.Label>
        <Form.Control name="password2" type="password" className={this.state.password2Repeated} onChange={this.handleChange}/>
        <div className="invalid-feedback">Las contraseñas no coinciden</div>
      </Form.Group>

      <Button variant="primary" onClick={this.handleSubmit}>
        Crear cuenta
      </Button>
    </Form>
    )
  }
}