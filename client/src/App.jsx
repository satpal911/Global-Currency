import React from 'react'
import Converter from './pages/Converter'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Converter/>}/>
      </Routes>
    </div>
  )
}

export default App
