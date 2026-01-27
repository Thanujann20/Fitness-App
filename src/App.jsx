import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts'
import Meals from './components/Meals'
import Goals from './components/Goals'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/Workouts' element={<Workouts/>}/>
        <Route path='/Meals' element={<Meals/>}/>
        <Route path='/Goals' element={<Goals/>}/>
      </Routes>
      
    </div>
  )
}

export default App
