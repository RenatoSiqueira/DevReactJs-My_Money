import React, { useEffect } from 'react'
import { usePost } from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8xc4ELSK0Uc2SfFMtYJIcnEb1PW8aIyo'

const Login = () => {
    const [postData, signin] = usePost(url)
    useEffect(() => {
        if (Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken)
        }
    }, [postData])
    const login = async () => {
        await signin({
            email: "renato@mymoney.com",
            password: "abc123",
            returnSecureToken: true
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login