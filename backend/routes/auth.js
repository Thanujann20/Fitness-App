import dotenv from "dotenv"
dotenv.config({ path: './.env' })
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

console.log("JWT_SECRET in auth.js:", JWT_SECRET ? "loaded" : "NOT LOADED")

// Handling post request for SignUp
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    try {
        // Check if username or email exists
        const existingUser = await User.findOne({ username })
        const existingEmail = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" })
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newUser = new User({ 
            username, 
            email, 
            password: password.trim()
        })

        const savedUser = await newUser.save()

        // Exclude password in response
        const { password: _, ...userData } = savedUser._doc

        res.status(201).json({ message: "Signup successful!", user: userData })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

console.log("JWT_SECRET :", process.env.JWT_SECRET) 

// Handling post request for Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        const isMatch = await bcrypt.compare(password.trim(), user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        // Generate JWT
        console.log("About to generate JWT, secret defined:", JWT_SECRET ? "YES" : "NO")
        const token = jwt.sign({ 
            id: user._id, 
            username: user.username
        }, 
            JWT_SECRET, 
            { 
                expiresIn: "1h"
            }
        )

        // hide password
        const { password: _, ...userData } = user._doc

        res.status(200).json({ message: "Login successful", token, user: userData })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export default router;