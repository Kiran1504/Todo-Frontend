import React, { useState } from 'react'

const TodoList = ({ todo }) => {

    const handleComplete = (e) => {
        const id = e.target.name
        todo.completed = !todo.completed
    }
    const [editMode, setEditMode] = useState(false)
    return !editMode ? (
        <div
            className={`${!todo.completed ? "bg-slate-900 text-white" : "bg-slate-600 text-slate-500"} 
            `}>
            <input type="checkbox" name={todo.id} value={todo.completed} onChange={handleComplete} />
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <p>{todo.isImportant ? "Important" : "Not important"}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button>Delete</button>
        </div>)
        :
        (
            <div className='bg-slate-900 text-white '>

            </div>
        )
}

export default TodoList
