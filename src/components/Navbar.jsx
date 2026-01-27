import "../styles/nav.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className = "nav">
            <p>PowerUp</p>
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/Workouts">Workouts</Link></li>
                <li><Link to = "/Meals">Meals</Link></li>
                <li><Link to = "/Goals">Goals</Link></li>
            </ul>
        </nav>
    )
}