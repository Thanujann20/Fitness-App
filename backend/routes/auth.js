import dotenv from "dotenv"
dotenv.config({ path: './.env' })
import express from "express"
import bcrypt from "bcrypt"
import { Resend } from "resend"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
const resend = new Resend(process.env.RESEND_API_KEY)

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

        const verificationToken = jwt.sign({ 
            id: savedUser._id 
            }, 
            JWT_SECRET, 
            { 
                expiresIn: "1d" 
            }
        )
        const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`
        try {
            await resend.emails.send({
                from: "PowerUp <onboarding@resend.dev>",
                to: "thanujann12345@gmail.com",
                subject: "Verify your email",
                html: `
                    <p>Username: ${savedUser.username},</p>
                    <a href="${verificationLink}">Verify Email</a>
                `
            })
            console.log("Verification email sent")
            console.log("Verification link:", verificationLink)
        } catch (emailErr) {
            console.error("Resend email error:", emailErr)
        }

        // Exclude password in response
        const { password: _, ...userData } = savedUser._doc
        res.status(201).json({ message: "Signup successful! Please verify your email.", user: userData })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get("/verify-email", async (req, res) => {
    const token = req.query.token
    if (!token) {
        return res.status(400).json({ message: "Verification link is missing" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const userId = decoded.id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "Invalid verification token" })
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email already verified" })
        }

        user.isVerified = true
        await user.save()

        res.status(200).json({ message: "Email verified successfully! You can now log in." })
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired verification link" })
    }
})

console.log("JWT_SECRET :", process.env.JWT_SECRET) 

// Handling post request for Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" })
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
                expiresIn: "7d"
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