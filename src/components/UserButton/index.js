import React, {useState} from "react";
import { Card } from "react-bootstrap";

function UserButton(props) {
    const username = props.username
    const[selected, setSelected] = useState("secondary")

    const handleOnClick = () => {
        if(selected === "secondary"){
            setSelected("primary")
        }
        else{
            setSelected("secondary")
        }
    }

    return ( 
        <Card onClick={handleOnClick} style={{ cursor: "pointer"}} bg={selected} className="d-inline-block">
            <Card.Body className="text-white p-2">{username}</Card.Body>
        </Card>
    );
}

export default UserButton;