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
        <Link to={"/users/"+userContext.username}>
          <Icon.PersonCircle color="white" size={25} className=""/>
        </Link>
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
          {profileLink()}
          <Navbar.Text className="d-flex me-5" onClick={handleLogout}>
            <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
              Log out
            </Link>
          </Navbar.Text>
        </div>
      </Navbar>
  )
}
