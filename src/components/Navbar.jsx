import { useLocation, Link } from "react-router-dom";
import "../styles/nav.css";

export default function Navbar() {
    const location = useLocation();
    const token = localStorage.getItem("token");

    // If user is logged in, show logout option
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/Login";
    };

    // Hide navbar on login page
    if (location.pathname === "/Login" || location.pathname === "/SignUp") return null;

    return (
        <nav className="nav">
            <p>PowerUp</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Workouts">Workouts</Link></li>
                <li><Link to="/Meals">Meals</Link></li>
                <li>Goals</li>
                {!token ? (
                    <li><Link to="/Login">Log In</Link></li>
                    
                ) : (
                    <li><button onClick={handleLogout}>Log Out</button></li>
                )}
            </ul>
        </nav>
    )
}