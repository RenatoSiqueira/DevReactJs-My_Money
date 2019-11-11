import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [logado, setLogado] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLogado(true)
        } else {
            setLogado(false)
        }
    }, [logado])
    const logout = () => {
        localStorage.removeItem('token')
        setLogado(false)
        window.location.reload()
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link className='navbar-brand' to='/'>My Money</Link>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Alterna navegação'>
                <span className='navbar-toggler-icon'></span>
            </button>
            {
                logado &&
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>Home <span className='sr-only'>(Página atual)</span></Link>
                        </li>
                        <li className='nav-item'>
                            <button className='nav-link' onClick={logout}>Sair</button>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}

export default Header