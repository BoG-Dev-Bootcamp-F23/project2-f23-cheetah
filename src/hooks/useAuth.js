import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [username, setUsername] = useState(null);

    const login = (data) => {
        setUserId(data._id)
        setAdmin(data.admin)
        setUsername(data.fullName)
    }

    const logout = () => {
        setUserId(null)
        setAdmin(null)
        setUsername(null)
    };

    return (
        <AuthContext.Provider value={{ userId, admin, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}