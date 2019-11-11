import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { usePost } from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8xc4ELSK0Uc2SfFMtYJIcnEb1PW8aIyo'

const Login = () => {
    const [postData, signin] = usePost(url)
    const [logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(() => {
        if (Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken)
            window.location.reload()
        }
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLogado(true)
        }
    })
    const login = async () => {
        await signin({
            email,
            password: senha,
            returnSecureToken: true
        })
    }
    const onChangeEmail = evt => {
        setEmail(evt.target.value)
    }
    const onChangeSenha = evt => {
        setSenha(evt.target.value)
    }
    if (logado) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <h1>Login</h1>
            {JSON.stringify(postData)}
            {
                postData.error && postData.error.length > 0 &&
                <p>Email e/ou Senha Inválidos</p>
            }
            <input type='text' value={email} onChange={onChangeEmail} placeholder='Seu Email' />
            <input type='password' value={senha} onChange={onChangeSenha} placeholder='Senha' />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login