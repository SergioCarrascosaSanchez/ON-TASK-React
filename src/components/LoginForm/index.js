import React, { Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import { Navigate, Link } from 'react-router-dom'
import userLoginContext from '../../context/userLoginContext'

export default class LoginForm extends Component {
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({empty : 'd-none'})
    this.setState({incorrect: 'd-none'})

    if(this.state.username.length === 0 || this.state.password.length === 0){
      this.setState({empty : 'text-danger'})
    }
    else{
      fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({name : "", username: this.state.username, email: "", password: this.state.password}),
        headers: {                              
            "Content-Type": "application/json"    
        }
      })
      .then(response => {
        if(response.status === 200){
          response.json()
          .then((data) => {
            this.setState({login : true})
            this.context.setUsername(this.state.username)
            this.context.setToken(data.token)
          })
        }
        else if(response.status === 400){
          this.setState({incorrect : 'text-danger'})
        }
        else{
          this.setState({error : true})
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({error : true})
      })
    }
  }

  constructor(props){
    super(props);
    this.state={
      username : '',
      password: '',
      empty: 'd-none',
      incorrect: 'd-none',
      error: false,
      errorMessage: "",
      login: false,
    }
  }

  static contextType = userLoginContext;

  render() {
    if(this.state.error){
      return(
        <div className="ms-5 mb-4">
            <h4 className="text-muted">Error al iniciar sesión</h4>
        </div>
    )
    }
    else if(this.state.login){
      /*window.localStorage.removeItem('user')
      window.localStorage.setItem('user', this.state.username)
      window.localStorage.removeItem('token')
      window.localStorage.setItem('token', this.state.token)*/
      return (<Navigate to={"/users/"+this.state.username} />);
    }
    else{
      return (
        <Form className="pe-5 ps-5 pb-5 pt-4">
        <Form.Label className={this.state.empty}>Debes rellenar todos los campos</Form.Label>
        <Form.Label className={this.state.incorrect}>Usuario o contraseña incorrectos</Form.Label>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Usuario</Form.Label>
          <Form.Control name="username" type="text" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control name="password" type="password" onChange={this.handleChange}/>
        </Form.Group>
        <Link to="/sign-up" style={{ textDecoration: 'none'}}>
          <p className="d-block pt-1 pb-2 text-primary">Aún no estás registrado?</p>
        </Link>
        <Button variant="primary" onClick={this.handleSubmit}>
          Iniciar sesión
        </Button>
      </Form>
      )
    }
  }
}

