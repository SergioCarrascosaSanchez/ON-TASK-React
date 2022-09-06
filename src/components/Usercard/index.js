import React from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import './styles.css'

function Usercard({username, name}) {
    
    return (
        <Card className="cardStyled" bg="primary">
            <Row>
                <Col className="d-flex justify-content-center align-self-center col-4">
                    <Icon.PersonCircle color="white" size={35} className="ms-2"/>
                    
                </Col>
                <Col className="col-8">
                    <Row>
                        <Col className="d-flex justify-content-start p-0 mt-1 text-white">
                            <h5>{name}</h5>  
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-start p-0 mb-2 fs-6 text-white">
                            {username}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default Usercard;