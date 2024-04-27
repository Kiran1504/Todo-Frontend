import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup';
import { login } from '../reducer/authReducer';
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const schema = object({
        email: string().email().required(),
        password: string().required()
            .test('password', 'Password must contain at least one letter, one number and be at least 4 characters long', (value) => {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/.test(value)
            })
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const isValid = schema.validateSync({ email, password })
            if (!isValid) {
                throw new Error("Invalid email or password")
            }
            // const res = await fetch('https://fire-ai-todo-backend.onrender.com/api/users/signin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'

            //     },
            //     credentials: 'include',
            //     mode: "cors",
            //     body: JSON.stringify({ email, password })
            // })

            // const data = await res.json()
            // if (!res.ok) {
            //     throw new Error(data.message || 'Something went wrong!')
            // }
            axios.post('https://fire-ai-todo-backend.onrender.com/api/users/signin', { email, password }, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data)
                    dispatch(login(res.data.user))
                    alert(res.data.message)
                    navigate('/')
                    setEmail('')
                    setPassword('')
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className='bg-slate-800 w-[90%] sm:w-1/3 border-2 border-slate-600 mx-auto px-4 py-5 rounded-lg text-white'>
                <h1 className='text-2xl font-semibold my-2'>Login</h1>
                <label htmlFor="email" className='text-lg w-1/4'>Email: </label>
                <input
                    type="email"
                    className='w-2/4 h-3/4 bg-slate-800 text-lg my-2 p-2 rounded-lg border-none focus:outline-none'
                    placeholder='john@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <hr className='border-slate-600' />
                <label htmlFor="username" className='text-lg w-1/4'>Password: </label>
                <input
                    type="password"
                    className='w-2/4 h-3/4 bg-slate-800 text-lg my-2 p-2 rounded-lg border-none focus:outline-none'
                    placeholder='********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-slate-600 text-lg w-2/4 h-3/4 my-2 py-1 rounded-lg'>Login</button>
                <p>
                    don't have an account? {" "}
                    <Link to={'/register'} className='underline'>
                        click here
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Login
