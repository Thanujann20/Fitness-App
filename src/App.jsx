import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts'
import Meals from './components/Meals'
import Goals from './components/Goals'
import Chest from "./components/Chest";
import Arms from "./components/Arms";
import Back from "./components/Back";
import Legs from "./components/Legs";
import Core from "./components/Core";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/Workouts' element={<Workouts/>}/>
        <Route path='/Meals' element={<Meals/>}/>
        <Route path='/Goals' element={<Goals/>}/>
        <Route path="/Chest" element={<Chest />} />
        <Route path="/Arms" element={<Arms />} />
        <Route path="/Back" element={<Back />} />
        <Route path="/Legs" element={<Legs />} />
        <Route path="/Core" element={<Core />} />
      </Routes>
      
    </div>
  )
}

export default App
