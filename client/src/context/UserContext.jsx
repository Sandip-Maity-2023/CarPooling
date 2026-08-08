import React, { createContext, useState } from 'react'

export const UserDataContext = createContext({
    user: {
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    },
    setUser: () => {}
})


const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext
