import {Routes, Route} from "react-router-dom"
import { useLocation } from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts'
import Meals from './components/Meals'
import Goals from './components/Goals'
import Muscle from "./components/Muscle"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import VerifyEmail from "./components/VerifyEmail"

function App() {

  const location = useLocation()

  const hideNavbar = ["/verify-email"]
  
  return (
    <div>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/Workouts' element={<Workouts/>}/>
        <Route path='/Meals' element={<Meals/>}/>
        <Route path='/Goals' element={<Goals/>}/>
        <Route path="/Chest" element={<Muscle muscleGroup="Chest" />} />
        <Route path="/Arms" element={<Muscle muscleGroup="Arms" />} />
        <Route path="/Back" element={<Muscle muscleGroup="Back" />} />
        <Route path="/Legs" element={<Muscle muscleGroup="Legs" />} />
        <Route path="/Core" element={<Muscle muscleGroup="Core" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      
    </div>
  )
}

export default App
