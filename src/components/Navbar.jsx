import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducer/authReducer'

const Navbar = () => {

    const loginStatus = useSelector(state => state.authStatus.isLogedIn)
    const dispatch = useDispatch()

    const handleLogout = () => {
        axios.get('https://fire-ai-todo-backend.onrender.com/api/users/logout', {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
                dispatch(logout())
                window.location.href = '/login'
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='sticky flex justify-between items-center bg-slate-800 p-4 mb-5 text-white border-b-white border-b-2'>
            <nav className=' px-4 flex justify-between items-center'>
                <h1 className='text-2xl'>Todo App</h1>
            </nav>
            <div>
                <ul className='flex justify-end gap-5'>
                    <li>
                        <Link to='/' className=''>Home</Link>
                    </li>
                    {!loginStatus ?
                        <>
                            <li>
                                <Link to='/login' className=''>Login</Link>
                            </li>
                            <li>
                                <Link to='/register' className=''>Register</Link>
                            </li>
                        </>
                        :
                        <li>
                            <button
                                className='focus:outline-none outline-none border-none'
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar
