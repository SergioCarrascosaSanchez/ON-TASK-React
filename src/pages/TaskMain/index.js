import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Spinner} from 'react-bootstrap'
import SimpleNavBar from '../../components/SimpleNavBar'
import UserCard from '../../components/Usercard'
import './styles.css'

function TaskMainPage() {
    const urlParams = useParams()
    const url = 'http://localhost:8080/tasks/'+urlParams.task+'?type=complete'

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(url)
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(data => {
                    setName(data.name)
                    setDescription(data.description)
                    setUsers(data.users.sort((a, b) => a.name.localeCompare(b.name)))
                    setLoading(false)
                })
            }
            else{
                console.log(error)
                setLoading(false)
                setError(true)
            }
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            setError(true)
        })
    }, [])
    
    if(loading){
        return (
            <div>
                <SimpleNavBar/>
                <Spinner animation="border" role="status" className="spinner"></Spinner>
            </div>
            
        )
    }
    else if(error){
        return (
            <>
            <SimpleNavBar/>
            <div className="content">
                <h1>Error</h1>
            </div>
            </>
        )
    }
    else{
        return (
            <>
            <SimpleNavBar/>
            <div className="content">
                <Row className="mb-3">
                    <Col className="">
                        <h1>{name}</h1>
                    </Col>
                    <Col className="">
                        <Link to={"/edit-task/"+urlParams.task}>
                            <Button variant="outline-primary" className="mb-4">Editar tarea</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <h4 className="text-muted">Usuarios asignados:</h4>
                </Row>
                <Row xs={1} s={2} md={4} className="gy-2 mb-5 mt-1">
                    {users.map(user => 
                        <Col>
                            <Link to={"/users/" + user["username"]} style={{ textDecoration: 'none', color:'black' }}>
                                <UserCard key={"User-"+user["username"]} username={user["username"]} name={user["name"]}/>
                            </Link>
                        </Col>)}
                </Row>
                <div className="">
                    <h3>{description}</h3>
                </div>
            </div>
            </>
        );
    }
}

export default TaskMainPage;