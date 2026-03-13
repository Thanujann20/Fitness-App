import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/home.css";
import "../styles/card.css";
import Card from "./Card";
import workoutImg from "../assets/workout.avif";
import mealsImg from "../assets/Meals.webp";
import progressImg from "../assets/progress.png";


function Home() {
    const token = localStorage.getItem("token")
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = JSON.parse(localStorage.getItem("user"));
            setUser(userData);
        }
    }, []); 

    return (
        <div>
            <h1 className="Header">Fuel Your Body, Own Your Goals</h1>
            <h1 className="Header">Welcome{user ? `, ${user.username}!` : "" }</h1>
            <div className="container">
                <Card title="Log workouts and check your progress" image= {workoutImg} to="/Workouts"></Card>
                <Card title="Track your daily macro intake" image= {mealsImg} to="/Meals"></Card>
                <Card title="Create and monitor goals. Coming soon!" image= {progressImg} ></Card>
            </div>
        </div>
    )
}

export default Home;