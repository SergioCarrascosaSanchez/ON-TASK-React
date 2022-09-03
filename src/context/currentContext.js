import React, {useState, createContext} from 'react'

const CurrentContext = createContext()

export function CurrentContextProvider({children}){
    const[group, setGroup] = useState('')

    return (
        <CurrentContext.Provider value={{group, setGroup}}>
            {children}
        </CurrentContext.Provider>
    )
}

export default CurrentContext