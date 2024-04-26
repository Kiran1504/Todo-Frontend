import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import TodoInput from './components/TodoInput';
import Login from './components/Login';
import Register from './components/Register';
// import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   (
  //     async function () {
  //       try {
  //         const res = await fetch('http://localhost:5000/api/users/verify', {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           credentials: 'include'
  //         })
  //         const data = await res.json()
  //         console.log(data)
  //       } catch (error) {
  //         console.log(error)
  //         alert('Something went wrong!')
  //       }
  //     }
  //   )()
  // }, [])
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
