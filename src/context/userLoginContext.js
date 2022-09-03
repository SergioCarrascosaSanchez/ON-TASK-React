import React, {useState, createContext} from 'react'

const UserLoginContext = createContext()

export function UserLoginContextProvider({children}){
    const[groups, setGroups] = useState([])
    const[username, setUsername] = useState('')
    const[token, setToken] = useState('')

    return (
        <UserLoginContext.Provider value={{groups, setGroups, username, setUsername, token, setToken}}>
            {children}
        </UserLoginContext.Provider>
    )
}

export default UserLoginContext