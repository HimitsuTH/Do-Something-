
import Homepage from './pages/Homepage'

import Login from './components/Login'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}  />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
 

    </>
  )
}

export default App
