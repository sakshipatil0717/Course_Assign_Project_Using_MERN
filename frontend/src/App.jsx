import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Course from './components/Course'

// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Student from './components/Student'
import Input from './components/Input'



function App() {

  return (
    <>

      {/* <h1>VITE</h1> */}
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Course />}></Route>
            <Route path={'/students'} element={<Student />}></Route>
            <Route path={'/input'} element={<Input />}></Route>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
