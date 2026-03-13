import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/account.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        username: "", 
        email: "",
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
        const email = formData.email.trim()
        const password = formData.password.trim()
        const emailRegex = /\S+@\S+\.\S+/

        if (!username || !password || !email) {
            alert("Please fill in all fields")
            return
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long")
            return
        }

        if (!emailRegex.test(email)) {
            alert("Enter a valid email")
            return
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                username,
                email,
                password
            })

            localStorage.setItem("user", JSON.stringify(response.data.user))
            // Login user
            localStorage.setItem("token", response.data.token)

            alert(response.data.message)
            navigate("/")

        } 
        catch (error) {
            alert(error.response?.data?.message || "Signup failed")
        }
    }

    return (
        <div className="account-container">
            <h2>Sign Up</h2>
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
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
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
                <button className="accBtn"type="submit">Sign Up</button>
                <h3>Already have an account? <Link to="/Login">Login</Link></h3>
            </form>
        </div>
    )
}