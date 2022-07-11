import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SimpleNavBar from '../../components/SimpleNavBar'
import PrincipalImage from '../../resources/undraw_MainPage.svg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css'

export default class MainPage extends Component {
  render() {
    return (
        <div>
            <SimpleNavBar/>
            <Container className="rowSytle">
                <Row>
                    <Col>
                        <img src={PrincipalImage}></img>
                    </Col>
                    <Col>
                        <h1>Gestor de tareas</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <Link to="/sign-up" className="buttons">
                            <Button className="me-4 mt-1">Crea tu cuenta</Button>
                        </Link>
                        <Link to="/login" className="buttons">
                            <Button className="mt-1" variant="outline-primary">Inicia sesión</Button>
                        </Link>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}
