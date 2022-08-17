import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class SimpleNavBar extends Component {

  handleLogout = () => {
    window.localStorage.removeItem('groups')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('group')
  }

  render() {
    return (
        <Navbar bg="primary" variant="dark">
          <div className="container-fluid">
            <Navbar.Brand>
              <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
                <span className="navbarBrand">ON TASK</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Text className="d-flex me-5" onClick={this.handleLogout}>
              <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
                Log out
              </Link>
            </Navbar.Text>
          </div>
        </Navbar>
    )
  }
}
