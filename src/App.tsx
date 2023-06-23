
import Homepage from './pages/Homepage'

import Login from './pages/Login'
import Register from './pages/Register'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {


  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}  />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
 

    </div>
  )
}

export default App
