import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { object, string } from 'yup';

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const schema = object({
        name: string().required().min(2).max(12),
        email: string().email().required(),
        password: string().required()
            .test('password', 'Password must contain at least one letter, one number and be at least 4 characters long', (value) => {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/.test(value)
            })
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const isValid = schema.validateSync({ name, email, password })
            if (!isValid) {
                throw new Error("Invalid email or password")
            }

            const res = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong!')
            }
            alert(data.message)

            setName('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className='bg-slate-800 w-[90%] sm:w-1/3 border-2 border-slate-600 mx-auto px-4 py-5 rounded-lg text-white'>
                <h1 className='text-2xl font-semibold my-2'>Register</h1>
                <label htmlFor="username" className='text-lg w-1/4'>Name: </label>
                <input
                    type="text"
                    className='w-2/4 h-3/4 bg-slate-800 text-lg my-2 p-2 rounded-lg border-none focus:outline-none'
                    placeholder='John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <hr className='border-slate-600' />
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
                <button className='bg-slate-600 text-lg w-2/4 h-3/4 my-2 py-1 rounded-lg'>Register</button>
                <p>
                    already have an account? {" "}
                    <Link to={'/login'} className='underline'>
                        click here
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Register
