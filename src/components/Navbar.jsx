import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                    <li>
                        <Link to='/login' className=''>Login</Link>
                    </li>
                    <li>
                        <Link to='/register' className=''>Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
