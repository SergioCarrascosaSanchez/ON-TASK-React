import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JoinGroupForm() {
    const [Group, setGroup] = useState("")
    const [Empty, setEmpty] = useState("d-none")
    const [Incorrect, setIncorrect] = useState("d-none")
    let navigate = useNavigate()
    const Regex = /^[a-zA-Z0-9]+[a-zA-Z0-9 ]*$/

    const handleChange = (event) => {
        setGroup({[event.target.name]: event.target.value});
    }
    
    const handleSubmit = () => {
        setEmpty("d-none")
        setIncorrect("d-none")
        if(Group === ''){
            setEmpty("d-block text-danger")
        }
        else if(!Regex.test(Group.groupId.toString())){
            setIncorrect("d-block text-danger")
        }
        else{
            window.localStorage.setItem('user', 'sergio')
            const url = 'http://localhost:8080/groups/'
            fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({name : Group.groupId.toString()}),
                    headers: {                              
                        "Content-Type": "application/json"    
                    }
                }
            )
            .then(response => {
                if(response.status === 201){
                    response.json()
                    .then(
                        data => {
                            const url = 'http://localhost:8080/users/'+window.localStorage.getItem('user')+'/groups/'+data.id.toString()+'?type=add'
                            fetch(url, {
                                    method: 'PUT',
                                }
                            )
                            .then(response => {
                                if(response.status === 200){
                                    const urlUser = "/users/"+window.localStorage.getItem('user')
                                    navigate(urlUser)
                                }
                                else{
                                    response.text().then(text => console.log(text))
                                }
                            })
                            const urlUser = "/users/"+window.localStorage.getItem('user')
                            navigate(urlUser)
                        }
                    )
                }
                else{
                    response.text().then(text => console.log(text))
                }
            })
        }
    }
    return (
        <div>
        <Form className="pe-5 ps-5 pb-5 pt-4">
            <Form.Label className={Empty}>Debes rellenar todos los campos</Form.Label>
            <Form.Label className={Incorrect}>El nombre del grupo no es válido, solo puedes usar letras y números</Form.Label>

            <Form.Group className="mb-3" controlId="groupId">
                <Form.Label>Nombre del grupo</Form.Label>
                <Form.Control name="groupId" type="text" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
                Crear Grupo
            </Button>
        </Form>
        </div>
    );
}

export default JoinGroupForm;