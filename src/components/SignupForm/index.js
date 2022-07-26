import React, { Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default class SignupForm extends Component {

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    let doApiCall = true;

    event.preventDefault();

    this.setState({vacio : 'd-none'})
    this.setState({password2Repeated : ''})
    this.setState({passwordLength : ''})
    this.setState({usernameError : ''})
    this.setState({emailError : ''})

    if(this.state.username.length === 0 || this.state.name.length === 0 || this.state.email.length === 0 || this.state.password.length === 0 || this.state.password2.length === 0){
        this.setState({vacio : 'text-danger'})
        doApiCall = false;
    }
    if(this.state.password2 !== this.state.password){
      this.setState({password2Repeated : 'is-invalid'})
      doApiCall = false;
    }
    if(this.state.password.length < 8){
      this.setState({passwordLength : 'is-invalid'})
      doApiCall = false;
    }
    
    if(doApiCall){
      fetch('http://localhost:8080/sign-up', {
          method: 'POST',
          body: JSON.stringify({name : this.state.name, username: this.state.username, email: this.state.email, password: this.state.password}),
          headers: {                              
              "Content-Type": "application/json"    
          } 
      })
      .then(
        response => {
          if(response.status === 201){
            this.setState({created : true})
        }
        else{
            response.text()
            .then(text => {
              if(text === 'Username already in use'){
                this.setState({usernameError : 'is-invalid'})
              }
              else if(text === 'Email already in use'){
                this.setState({emailError : 'is-invalid'})
              }
              else{
                this.setState({error: true})
              }
            })
            
        }
        }
      )
      .catch(error => {
        console.log(error)
        this.setState({error: true})
      })
    }

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
      passwordLength: '',
      error:false,
      errorMessage: '',
      created: false,
      usernameError: '',
      emailError: ''
      
    }
  }
  render() {
    if(this.state.error){
      return(
        <div className="ms-5 mb-4">
            <h1>Error</h1>
            <h3 className="text-muted">{this.state.errorMessage}</h3>
        </div>
      )
    }
    else if(this.state.created){
        return(
        <div className="ms-5 mb-5 mt-3">
            <h4 className="text-primary mb-4">Usuario registrado con éxito</h4>
            <Link to={'/users/'+this.state.username}>
              <Button>Ir a mi perfil</Button>
            </Link>
        </div>
        )
    }
    else{
      return (
          <Form className="pe-5 ps-5 pb-5 pt-4">
          <Form.Label className={this.state.vacio}>Debes rellenar todos los campos</Form.Label>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Usuario</Form.Label>
            <Form.Control name="username" type="text" className={this.state.usernameError} onChange={this.handleChange}/>
            <div className="invalid-feedback">Este nombre de usuario ya esta en uso</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" type="text" onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" className={this.state.emailError} onChange={this.handleChange}/>
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
}