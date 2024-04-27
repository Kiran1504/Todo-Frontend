import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import TodoInput from './components/TodoInput';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    (
      async () => {
        try {
          // const res = await fetch('https://fire-ai-todo-backend.onrender.com/api/users/verify', {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   credentials: 'include'
          // })
          // const data = await res.json()
          // console.log(data)
          axios.get('https://fire-ai-todo-backend.onrender.com/api/users/verify', {
            withCredentials: true
          })
            .then(res => {
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
        catch (error) {
          console.log(error)
          alert('Something went wrong!')
        }
      }
    )()
  }, [])
  return (
    <div className="App bg-slate-900 h-screen px-1 sm:px-0">
      <Navbar />
      <Routes>
        <Route path='/' exact element={<TodoInput />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
      </Routes>
      {/* <TodoInput /> */}
    </div>
  );
}

export default App;
