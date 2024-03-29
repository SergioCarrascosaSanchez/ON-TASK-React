import React, { useEffect, useState, useContext } from "react";
import { Form, Row, Col, Button, Spinner} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import SimpleNavBar from "../SimpleNavBar";
import UserButton from "../UserButton";
import CurrentContext from '../../context/currentContext'
import UserLoginContext from "../../context/userLoginContext";

function CreateTaskForm() {

    const userContext = useContext(UserLoginContext)
    const currentContext = useContext(CurrentContext)
    const group = currentContext.group

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [users, setUsers] = useState([])
    const [usersAvalaible, setUsersAvalaible] = useState([])
    const [Empty, setEmpty] = useState("d-none")
    const [UsersEmpty, setUsersEmpty] = useState("d-none")
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        if(event.target.name === "title"){
            setTitle(event.target.value)
        }
        else if(event.target.name === "descripcion"){
            setDescription(event.target.value)
        }
        else{
            return
        }
    }

    const handleSubmit = () => {
        setEmpty("d-none")
        setUsersEmpty("d-none")

        if(title === '' || description === ''){
            setEmpty("d-block text-danger")
        }
        else if(users.length === 0){
            setUsersEmpty("d-block text-danger")
        }
        else{ 
            fetch("http://localhost:8080/tasks", {
                method: 'POST',
                body: JSON.stringify({name : title, description: description, group: group, users: users}),
                headers: {                              
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + userContext.token   
                }
            })
            .then(response => {
                if(response.status === 201){
                    setLoading(false)
                    navigate('/groups/'+group)
                }
                else if (response.status === 401){
                    navigate("/login")
                }
                else{
                    console.log(error)
                    setLoading(false)
                    setError(true)
                }
            }
            )
            .catch(error => {
                console.log(error)
                setLoading(false)
                setError(true)
            })
        }
    }

    const handleOnClickUserButton = (username) => {
        if(users.includes(username)){
            const index = users.indexOf(username)
            users.splice(index, 1);
        }
        else{
            users.push(username)
        }
    }

    const fetchData = () => {
        if(group === undefined){
            setError(true)
            setLoading(false)
        }
        else{
            const url = "http://localhost:8080/groups/"+group
            fetch(url, {
                    method: 'GET',
                    headers: {                              
                        'Authorization': 'Bearer ' + userContext.token    
                    }
                }
            ).then(response => {
                if(response.status === 200){
                    response.json()
                    .then(data => {
                        setUsersAvalaible(data.users.sort((a, b) => a.name.localeCompare(b.name)))
                        setLoading(false)
                    })
                }
                else if (response.status === 401){
                    navigate("/login")
                }
                else{
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
    }

    useEffect(() => {
        fetchData()
        setLoading(false)
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
            <div className="pe-5 ps-5 pb-5 pt-4">
                <Row>
                    <p>Usuarios</p>
                </Row>
                <Row xs={2} s={3} md={5} className="gy-2 mb-4 gx-5">
                    {usersAvalaible.map(user => 
                        <Col key={"Col"+user["username"]} onClick={() => handleOnClickUserButton(user["username"])}>
                            <UserButton key={"userBtn"+user["username"]} username={user["username"]}/>
                        </Col>)}
                </Row>
                <Form>
                    <Form.Label className={Empty}>Debes rellenar todos los campos</Form.Label>
                    <Form.Label className={UsersEmpty}>Al menos un usuario debe estar asignado</Form.Label>
                    <Form.Group>
                        <Form.Label>Título de la tarea</Form.Label>
                        <Form.Control name="title" type="text" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control as="textarea" name="descripcion" type="text" onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Crear tarea
                    </Button>
                </Form>
            
            </div>
        );
    }
}

export default CreateTaskForm;