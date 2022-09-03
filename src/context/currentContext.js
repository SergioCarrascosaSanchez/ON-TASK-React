import React, {useState} from 'react'

const currentContext = React.createContext({})

export function currentContextProvider({children}){
    const[group, setGroup] = useState('')

    return (
        <Context.Provider value={{group, setGroup}}>
            {children}
        </Context.Provider>
    )
}

export default currentContext