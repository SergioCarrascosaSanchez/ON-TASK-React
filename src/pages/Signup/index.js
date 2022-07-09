import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './styles.css'
import SignupForm from '../../components/SignupForm'
import SimpleNavBar from '../../components/SimpleNavBar'

export default class SignupPage extends Component {
  render() {
    return (
        <div>
            <nav>
                <SimpleNavBar />
            </nav>
            <div className="Content">
                <Card>
                    <h2  className="pe-5 ps-5 pt-5">Crea tu cuenta</h2>
                    <SignupForm />
                </Card>
            </div>
        </div>
    )
  }
}
