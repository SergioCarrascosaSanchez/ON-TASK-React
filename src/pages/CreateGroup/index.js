import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './styles.css'
import CreateGroupForm from '../../components/CreateGroupForm'
import SimpleNavBar from '../../components/SimpleNavBar'

export default class SignupPage extends Component {
  render() {
    return (
        <div>
            <nav>
                <SimpleNavBar />
            </nav>
            <div className="Content">
                <Card className="shadow">
                    <h2 className="pe-5 ps-5 pt-5">Crea un grupo</h2>
                    <CreateGroupForm />
                </Card>
            </div>
        </div>
    )
  }
}
