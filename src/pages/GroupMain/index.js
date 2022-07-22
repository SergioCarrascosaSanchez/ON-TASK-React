import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SimpleNavBar from '../../components/SimpleNavBar';
import { Button, Spinner, Row, Col, CardGroup } from 'react-bootstrap';
import Usercard from '../../components/Usercard'
import './styles.css'
import SimpleTask from '../../components/SimpleTask';

function GroupMainPage() {
    const [name, setName] = useState("")
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchData = () => {
        const url = "http://localhost:8080/groups/"+urlParam.groupId
        fetch(url, {
                method: 'GET'
            }
        ).then(response => {
            if(response.status === 200){
                response.json()
                .then(data => {
                    console.log(data)
                    setName(data.name)
                    setUsers(data.users.sort((a, b) => a.name.localeCompare(b.name)))
                    setTasks(data.tasks.sort((a,b)=> {return a.id - b.id}))
                    setLoading(false)
                })
            }
            else{
                if(response.status === 404){
                    setErrorMessage("El grupo no ha sido encontrado")
                }
                setLoading(false)
                setError(true)
            }
        })
        .catch(error => {
            setError(true)
            setLoading(false)
            console.log(error)
        })
        
    }

    const urlParam = useParams();
    useEffect(() => {
        setLoading(true)
        fetchData()
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
                <h4 className="text-muted">{errorMessage}</h4>
            </div>
            </>
        )
    }
    else{
        return (
            <>
            <SimpleNavBar/>
            <div className="content">
                <h1 className="mb-5">{name}</h1>
                <Row>
                    <Col className="d-flex align-items-start col-2">
                        <h2>Users</h2>
                    </Col>
                    <Col className="d-flex align-items-start col-10">
                        <Link to={"/edit-group/"+urlParam.groupId}>
                            <Button variant="outline-primary" className="mb-4">Editar grupo</Button>
                        </Link>
                    </Col>
                </Row>
                <Row xs={1} s={2} md={4} className="gy-2 mb-5 mt-1">
                    {users.map(user => <Col><Usercard key={"User"+user["username"]} username={user["username"]} name={user["name"]}/></Col>)}
                </Row>
                <Row>
                    <Col className="d-flex align-items-start col-2 mt-3">
                        <h2>Tasks</h2>
                    </Col>
                    <Col className="d-flex align-items-start col-10  mt-3">
                        <Link to="/create-task">
                            <Button variant="outline-primary" className="mb-4">Añadir tarea</Button>
                        </Link>
                    </Col>
                </Row>
                <Row xs={1} md={4} className="gy-2">
                    {tasks.map(task => <Col><SimpleTask key={"Task"+task["id"]} id={task["id"]} title={task["name"]} description={task["description"]}/></Col>)}
                </Row>
            </div>
            </>
        );
    }
    
}

export default GroupMainPage;