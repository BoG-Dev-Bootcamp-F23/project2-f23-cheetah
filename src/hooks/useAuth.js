import { useState, useEffect } from 'react'

const useAuth = () => {
    const [id, setId] = useState("6556af90510103a8a97e8386");
    const [admin, setAdmin] = useState(true);
    const [userName, setUserName] = useState("test2");

    const login = (userId) => {
        setId(userId)
    }

    function logout() {
        setId(null)
    }

    return {id, login, logout, admin, userName};
}

export default useAuth;