import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import "../styles/verification.css"

export default function VerifyEmail() {
    const [status, setStatus] = useState("Verifying...")
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            setStatus("Invalid verification link")
            return
        }
        api.get(`/auth/verify-email?token=${token}`)
            .then(res => {
                setStatus(res.data.message)
                setTimeout(() => {navigate("/Login")}, 3000)
            })
            .catch(err => setStatus(err.response?.data.message || "Verification failed"))
        }, [token])

    return <div className="verification">{status}</div>
}
