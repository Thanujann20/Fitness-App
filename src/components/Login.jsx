import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/account.css"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "", 
        password: ""
    })

    const handleChange = (e) => {
        setFormData ({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = formData.username.trim()
        const password = formData.password.trim()

        if (!username || !password) {
            alert("Please fill in all fields")
            return
        }
        try {
            const response = await api.post("/auth/login", {
                username,
                password
            })

            // Save JWT token to localStorage
            localStorage.setItem("token", response.data.token)
            // Saving user info
            localStorage.setItem("user", JSON.stringify(response.data.user))

            console.log("Login successful, token saved:", response.data.token ? "YES" : "NO")
            alert(response.data.message)
            navigate("/")
        } 
        catch (error) {
            alert(error.response?.data?.message || "Login failed")
        }
    }

    return (   
            <div className="account-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange} 
                        />
                    </div>
                    <button className= "accBtn" type="submit">Login</button>
                </form>
                <h3>Don't have an account? <Link to="/SignUp">Sign Up</Link></h3>
            </div>
        )
}