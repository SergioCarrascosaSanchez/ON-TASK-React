import React, { useEffect, useState  } from "react";
import { Card } from 'react-bootstrap'
import CreateTaskForm from "../../components/CreateTaskForm";
import SimpleNavBar from "../../components/SimpleNavBar"
import './styles.css'

function CreateTaskPage() {
    return ( 
        <>
            <div>
            <nav>
                <SimpleNavBar />
            </nav>
            <div className="Content">
                <Card className="shadow">
                    <h2 className="pe-5 ps-5 pt-5">Crea un grupo</h2>
                    <CreateTaskForm />
                </Card>
            </div>
        </div>
        </> 
    );
}

export default CreateTaskPage;