import React, { useEffect, useRef, useState } from 'react'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineDownloadDone, MdOutlineEdit } from "react-icons/md";

const TodoInput = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [todos, setTodos] = useState([])
    const [isImportant, setIsImportant] = useState(false)
    const [id, setId] = useState(0)
    const [editId, setEditId] = useState(-1)
    const [editMode, setEditMode] = useState([])
    const todosRef = useRef();
    todosRef.current = todos;
    const notifyImportantTaskRef = useRef();



    const notifyImportantTask = (id, todos) => {
        try {
            const impTodo = todosRef.current.find((todo) => todo.id === id)
            if (impTodo.completed === true || !impTodo) return
            alert(`You have an important task: ${impTodo.title}`)
        } catch (error) {
            console.log(error);
        }
    }
    notifyImportantTaskRef.current = notifyImportantTask;

    const editTodoFunction = async () => {
        const newTodos = todos.map((todo) => {
            if (todo.id === editId) {
                return {
                    ...todo,
                    title: title,
                    description: description,
                    isImportant: isImportant
                }
            }
            return todo
        })
        const cookies = document.cookie.split(';').reduce((cookies, item) => {
            const [name, value] = item.split('=').map(part => part.trim());
            cookies[name] = value;
            return cookies;
        }, {});

        const token = cookies['token'];

        const res = await fetch('http://localhost:5000/api/todos/edit', {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newTodos.find(todo => todo.id === editId))
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Something went wrong!')


        if (isImportant) {
            setTimeout(() => {
                if (todosRef.current.find(todo => todo.id === editId)) {
                    console.log('Notifying important task');
                    notifyImportantTaskRef.current(editId, newTodos)
                }
            }, 2000)
        }
        setTodos(newTodos)
        setEditMode(false)
        setTitle('')
        setDescription('')
        setIsImportant(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (!title || title.trim() === '') {
                alert('Please add a title')
                return
            }

            if (editMode && editId !== -1) {
                editTodoFunction()
                return
            }

            const newTodo = {
                id,
                title: title,
                description: description,
                isImportant: isImportant,
                completed: false
            };

            const cookies = document.cookie.split(';').reduce((cookies, item) => {
                const [name, value] = item.split('=').map(part => part.trim());
                cookies[name] = value;
                return cookies;
            }, {});

            const token = cookies['token'];

            const res = await fetch('https://fire-ai-todo-backend.onrender.com/api/todos/create', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newTodo)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Something went wrong!')

            setTodos(prevTodos => {
                const updatedTodos = [...prevTodos, newTodo];

                if (isImportant) {
                    console.log('Important task added');
                    setTimeout(() => {
                        if (todosRef.current.find(todo => todo.id === newTodo.id)) {
                            console.log('Notifying important task');
                            notifyImportantTaskRef.current(newTodo.id, updatedTodos)
                        }
                    }, 2000)
                }

                return updatedTodos;
            });


            setTitle('')
            setIsImportant(false)
            setDescription('')
            setId(id + 1)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (e, id) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        try {
            const cookies = document.cookie.split(';').reduce((cookies, item) => {
                const [name, value] = item.split('=').map(part => part.trim());
                cookies[name] = value;
                return cookies;
            }, {});
            const token = cookies['token'];
            const res = await fetch('http://localhost:5000/api/todos/delete', {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            })
            const data = await res.json()
            console.log(data)
            if (!res.ok) throw new Error(data.message || 'Something went wrong!')
            setTodos(newTodos)
        } catch (error) {

        }
    }

    const handleComplete = (e) => {
        const id = e.target.name
        const newTodos = [...todos]
        newTodos[id].completed = !newTodos[id].completed
        setTodos(newTodos)
    }

    const handleEdit = (e, todo) => {
        e.preventDefault()
        setEditMode(true)
        setEditId(todo.id)
        setTitle(todo.title)
        setDescription(todo.description)
        setIsImportant(todo.isImportant)
    }

    const markAllComplete = () => {
        const newTodos = todos.map((todo) => {
            return {
                ...todo,
                completed: true
            }
        })
        setTodos(newTodos)
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const cookies = document.cookie.split(';').reduce((cookies, item) => {
                    const [name, value] = item.split('=').map(part => part.trim());
                    cookies[name] = value;
                    return cookies;
                }, {});
                const token = cookies['token'];
                const res = await fetch('https://fire-ai-todo-backend.onrender.com/api/todos/all', {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Something went wrong!')
                setTodos(data.todos)
                setId(data.todos.length)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTodos()
    }, [])

    return (
        <>

            <div className='sm:w-1/2 bg-slate-800 rounded-lg shadow-sm shadow-gray-500 mx-auto px-5 py-2'>
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className='w-full h-3/4 bg-slate-800 text-white text-lg p-2 rounded-lg border-none focus:outline-none'
                        placeholder='Add a title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <hr className='border-slate-600 w-10/12' />
                    <input
                        type='text'
                        className='w-full h-3/4 bg-slate-800 text-white text-md p-2 rounded-lg border-none focus:outline-none'
                        placeholder='Add description...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='flex justify-end items-center gap-5'>
                        {
                            isImportant ?
                                <label htmlFor="important" className='text-white text-sm'>Important task</label> :
                                <label htmlFor="important" className='text-white text-sm'>Not an important task</label>
                        }
                        <input type="checkbox" value={isImportant} className="sr-only peer" checked={isImportant} onChange={() => setIsImportant(!isImportant)} />
                        <div
                            onClick={() => setIsImportant(!isImportant)}
                            className="relative w-10 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">

                        </div>
                        <button
                            className='bg-green-600 text-white text-2xl px-3 py-2 rounded-lg border-none focus:outline-none'
                            type='submit'>
                            <MdOutlineDownloadDone />
                        </button>
                    </div>
                </form>
            </div>




            <div
                className='sm:w-1/2 bg-slate-800 rounded-lg shadow-sm text-white shadow-gray-500 mx-auto my-5 p-0.5 sm:px-3 sm:py-3'>
                <div className='display flex justify-start gap-4 items-center'>

                    <p className='text-left px-4'>All your tasks...</p>
                    <button
                        className='px-4 p-2 border-2 rounded-xl font-semibold my-2 bg-green-600 text-black'
                        onClick={markAllComplete}>
                        Mark all completed
                    </button>
                </div>
                {todos.length > 0 && todos.map((todo) =>
                (<div key={todo.id}
                    className={`${!todo.completed ? "bg-slate-900 text-white" : "bg-gray-950 bg-opacity-25 text-opacity-25 text-slate-300"} 
                        flex justify-between items-center gap-4 px-5 py-2 rounded-lg my-2`}>
                    <input
                        type="checkbox"
                        id='green-checkbox'
                        name={todo.id}
                        checked={todo.completed}
                        onChange={handleComplete}
                        className='rounded-full p-4 text-green-600 w-4 h-4'
                    />
                    <div className='flex gap-2 flex-col w-[72%] text-left md:text-justify'>

                        <h1 className='text-xl'>{todo.title}</h1>
                        <p className={`text-sm text-slate-300 ${todo.completed ? "text-opacity-25" : ""} line-clamp-3 md:line-clamp-none`}>{todo.description}</p>
                    </div>
                    <div className='flex gap-3 justify-center items-center'>

                        <button onClick={(e) => handleEdit(e, todo)}>
                            <MdOutlineEdit className='text-lg sm:text-xl' />
                        </button>
                        <button onClick={(e) => handleDelete(e, todo.id)}>
                            <MdOutlineDelete className='text-lg sm:text-xl' />
                        </button>

                        <p>
                            {todo.isImportant ? <FaBookmark className='text-lg sm:text-xl' color='lightgreen' /> : <FaRegBookmark className='text-lg sm:text-xl' />}
                        </p>

                    </div>
                </div>)
                )}
            </div>
        </>
    )
}

export default TodoInput
