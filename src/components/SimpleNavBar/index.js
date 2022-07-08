import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'

export default class SimpleNavBar extends Component {
  render() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>
                <span className="navbarBrand">Gestor de tareas</span>
            </Navbar.Brand>
        </Navbar>
    )
  }
}
