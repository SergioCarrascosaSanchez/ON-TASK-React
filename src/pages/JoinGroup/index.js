import React from 'react';
import JoinGroupForm from '../../components/JoinGroupForm';
import SimpleNavBar from '../../components/SimpleNavBar'
import { Card } from 'react-bootstrap'
import './styles.css'

  
function JoinGroupPage() {
    return (
        <>
        <nav>
            <SimpleNavBar />
        </nav>
        <div className="Content">
            <Card className="cardStyle shadow">
                <h2  className="pe-5 ps-5 pt-5">Únete a un grupo</h2>
                <JoinGroupForm />
            </Card>
        </div>
        </>
    );
}

export default JoinGroupPage;