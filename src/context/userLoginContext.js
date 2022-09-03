import React, {useState} from 'react'

const userLoginContext = React.createContext({})

export function userLoginContextProvider({children}){
    const[groups, setGroups] = useState([])
    const[username, setUsername] = useState('')
    const[token, setToken] = useState('')

    return (
        <Context.Provider value={{groups, setGroups, username, setUsername, token, setToken}}>
            {children}
        </Context.Provider>
    )
}

export default userLoginContext