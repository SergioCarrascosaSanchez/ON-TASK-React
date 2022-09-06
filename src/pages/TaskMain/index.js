import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Spinner} from 'react-bootstrap'
import SimpleNavBar from '../../components/SimpleNavBar'
import UserCard from '../../components/Usercard'
import './styles.css'
import UserLoginContext from "../../context/userLoginContext";
import CurrentContext from "../../context/currentContext";

function TaskMainPage() {
    const userContext = useContext(UserLoginContext)
    const currentContext = useContext(CurrentContext)

    const urlParams = useParams()

    const navigate = useNavigate()

    const url = 'http://localhost:8080/tasks/'+urlParams.task+'?type=complete'
    const deleteUrl = 'http://localhost:8080/tasks/'+urlParams.task+'/groups/'+currentContext.group

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [users, setUsers] = useState([])

    const completedOnClick = () => {
        setLoading(true)
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + userContext.token
            }
        })
        .then(response => {
            if(response.status === 200){
                setLoading(false)
                navigate('/groups/'+currentContext.group)
            }
            else if (response.status === 401){
                navigate("/login")
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
    }

    useEffect(() => {
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + userContext.token
            }
        })
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
            else if (response.status === 401){
                navigate("/login")
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
        if(!users.map(user => user.username).includes(userContext.username)){
            return (
                <>
                <SimpleNavBar/>
                <div className="content">
                    <Row className="mb-3">
                        <Col className="col-7">
                            <h1>{name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-muted">Usuarios asignados:</h4>
                    </Row>
                    <Row xs={1} s={2} md={4} className="gy-2 mb-5 mt-1">
                        {users.map(user => 
                            <Col key={"Col-"+user["username"]}>
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
        else{
            return (
                <>
                <SimpleNavBar/>
                <div className="content">
                    <Row className="mb-3">
                        <Col className="col-7">
                            <h1>{name}</h1>
                        </Col>
                        <Col>
                            <Button variant="primary" className="mb-4" onClick={completedOnClick}>Tarea completada!</Button>
                        </Col>
                        <Col>
                            <Link to={"/edit-task/"+urlParams.task}>
                                <Button variant="outline-primary" className="mb-4 d-none">Editar tarea</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-muted">Usuarios asignados:</h4>
                    </Row>
                    <Row xs={1} s={2} md={4} className="gy-2 mb-5 mt-1">
                        {users.map(user => 
                            <Col key={"Col-"+user["username"]}>
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
}

export default TaskMainPage;