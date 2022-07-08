import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './styles.css'
import LoginForm from '../../components/LoginForm'
import SimpleNavBar from '../../components/SimpleNavBar'

export default class LoginPage extends Component {
  render() {
    return (
        <div>
            <nav>
                <SimpleNavBar />
            </nav>
            <div className="Content">
                <Card className="cardStyle">
                    <LoginForm />
                </Card>
            </div>
        </div>
    )
  }
}
