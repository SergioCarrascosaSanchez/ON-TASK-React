import React, { useContext } from 'react'
import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CurrentContext from '../../context/currentContext'
import UserLoginContext from '../../context/userLoginContext'
import * as Icon from 'react-bootstrap-icons';

export default function SimpleNavBar(){
  const userContext = useContext(UserLoginContext)
  const currentContext = useContext(CurrentContext)

  const handleLogout = () => {
    userContext.setUsername("")
    userContext.setToken("")
    userContext.setGroups([])
    currentContext.setGroup("")
    /*window.localStorage.removeItem('groups')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('group')
    window.localStorage.removeItem('token')*/
  }

  const profileLink = () => {
    if(userContext.username !== ""){
      return(
        <>
          <div className="d-inline">
            <Link to={"/users/"+userContext.username}>
              <Icon.PersonCircle color="white" size={30}/>
            </Link>
          </div>
          <Navbar.Text  className="d-inline ms-3 strong align-text-top" onClick={handleLogout}>
            <Link to="/" style={{ textDecoration: 'none', color:'white', fontWeight: "bold" }}>
              CERRAR SESIÓN
            </Link>
          </Navbar.Text>
        </>
        
      )
    }
    else{
      return (<></>)
    }
  }

  
  return (
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
              <span className="navbarBrand">ON TASK</span>
            </Link>
          </Navbar.Brand>
          <div className="me-5">
          {profileLink()}
          </div>
        </div>
      </Navbar>
  )
}
