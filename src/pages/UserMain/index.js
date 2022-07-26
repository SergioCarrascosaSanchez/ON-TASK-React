import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SimpleNavBar from '../../components/SimpleNavBar';
import ListOfSimpleTasks from '../../components/ListOfSimpleTasks'
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import './styles.css' 

export default function UserMainPage(){
    
    const [groupIds, setGroupIds] = useState([]);
    const [groupNames, setGroupNames] = useState({});
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const fetchData = () => {
        fetch('http://localhost:8080/users/'+urlParam.username,{
                method: 'GET',
            }
        )
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(data => {
                    if(data.groups.length > 0){
                        const groupArray = data.groups
                        fetch('http://localhost:8080/tasksOfuser/'+urlParam.username,{
                            method: "POST",
                            body: JSON.stringify({
                                groups: data.groups
                            }),
                            headers: {                              
                                "Content-Type": "application/json"    
                            }
                        }
                        )
                        .then(response => response.json())
                        .then(data => {
                            setGroupIds(groupArray.sort())
                            setGroupNames(data.names);
                            setTasks(data.tasks);
                            setLoading(false)
                            
                        })
                        .catch(error => {
                            console.log(error)
                            setError(true)
                            setLoading(false)
                        })
                    }
                    else{
                        setLoading(false)
                    }
                })
            }
            else{
                if(response.status === 404){
                    setErrorMessage("El usuario no ha sido encontrado")
                }
                setLoading(false)
                setError(true)
            }
        }
        )
        .catch(error => {
            console.log(error)
            setError(true)
            setLoading(false)
        })
    }

    const urlParam = useParams();
    useEffect(() => {
        window.localStorage.setItem('user', urlParam.username)
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
    else if(groupIds.length === 0){
        return(
            <>
            <SimpleNavBar/>
            <div className="content">
                <h1 className="display-5 mb-4">Hola, <span className="text-primary">{urlParam.username}</span></h1>
                <h4 className="mb-4">Parece que no estas en ningún grupo...</h4>
                <Link to="/create-group">
                    <Button className="me-4 mt-1">Crear un grupo</Button>
                </Link>
                <Link to="/join-group">
                    <Button variant="outline-primary" className="me-4 mt-1">Unirse a un grupo</Button>
                </Link>
            </div>
            </>
        )
    }
    else{
        return(
            <>
            <SimpleNavBar/>
            <div className="content">
                <h1 className="display-5">Hola, <span className="text-primary">{urlParam.username}</span></h1>
                <Row>
                    <Col className="col-4" >
                        <h1 className="mt-4">Tus grupos</h1>
                    </Col>
                    <Col className="col-2">
                        <Link to="/create-group">
                            <Button className="mt-4">Crear un grupo</Button>
                        </Link>
                    </Col>
                    <Col className="col-3">
                        <Link to="/join-group">
                            <Button variant="outline-primary" className="mt-4">Unirse a un grupo</Button>
                        </Link>
                    </Col>
                </Row>
                {groupIds.map(id => <ListOfSimpleTasks key={"GroupId"+id} groupId={id} group={groupNames[id.toString()]} tasks={tasks[id.toString()]}/>)}
            </div>
            </>
        )
    }
    
}

