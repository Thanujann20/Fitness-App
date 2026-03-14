import Card from "./Card"
import "../styles/card.css";
import "../styles/workouts.css"
import chestImg from "../assets/chest.jpeg";
import armImg from "../assets/arm.jpeg";
import backImg from "../assets/back.jpeg";
import legsImg from "../assets/legs.jpeg";
import coreImg from "../assets/core.jpeg";

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Workouts() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/Login")
        }
    }, [navigate])

    return (
        <div>
            <h1 className="Header">Choose Target Area, Create or Start Workout</h1>
            <div className="container">
                <Card title="Chest" image={chestImg} to="/Chest" />
                <Card title="Arms and Shoulders" image={armImg} to="/Arms" />
                <Card title="Back" image={backImg} to="/Back" />
                <Card title="Legs" image={legsImg} to="/Legs" />
                <Card title="Core" image={coreImg} to="/Core" />
            </div>
        </div>
    )
}