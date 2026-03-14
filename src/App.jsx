import {Routes, Route} from "react-router-dom"
import { useLocation } from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts'
import Meals from './components/Meals'
import Goals from './components/Goals'
import Chest from "./components/Chest"
import Arms from "./components/Arms"
import Back from "./components/Back"
import Legs from "./components/Legs"
import Core from "./components/Core"
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
        <Route path="/Chest" element={<Chest />} />
        <Route path="/Arms" element={<Arms />} />
        <Route path="/Back" element={<Back />} />
        <Route path="/Legs" element={<Legs />} />
        <Route path="/Core" element={<Core />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      
    </div>
  )
}

export default App
