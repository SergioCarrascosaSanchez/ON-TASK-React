import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JoinGroupForm() {
    const [Group, setGroup] = useState("")
    const [Empty, setEmpty] = useState("d-none")
    const [Incorrect, setIncorrect] = useState("d-none")
    const [AlreadyIn, setAlreadyIn] = useState("d-none")

    let navigate = useNavigate() 

    const handleChange = (event) => {
        setGroup({[event.target.name]: event.target.value});
    }
    
    const handleSubmit = () => {
        setEmpty("d-none")
        setIncorrect("d-none")
        setAlreadyIn('d-none')
        if(Group === ''){
            setEmpty("d-block text-danger")
        }
        else{
            window.localStorage.setItem('user', 'sergio')
            const url = 'http://localhost:8080/users/'+window.localStorage.getItem('user')+'/groups/'+Group.groupId.toString()+'?type=add'
            fetch(url, {
                    method: 'PUT'
                }
            )
            .then(response => {
                if(response.status === 200){
                    const urlUser = "/users/"+window.localStorage.getItem('user')
                    navigate(urlUser)
                }
                else if(response.status === 404){
                    setIncorrect('d-block text-danger')
                }
                else if(response.status === 400){
                    setAlreadyIn('d-block text-danger')
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
            <Form.Label className={Incorrect}>El grupo no existe</Form.Label>
            <Form.Label className={AlreadyIn}>Ya te has unido a este grupo</Form.Label>

            <Form.Group className="mb-3" controlId="groupId">
                <Form.Label>Identificador del grupo</Form.Label>
                <Form.Control name="groupId" type="number" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
                Unirme al grupo
            </Button>
        </Form>
        </div>
    );
}

export default JoinGroupForm;