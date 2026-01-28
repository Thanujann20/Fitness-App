import Card from "./Card"
import "../styles/card.css";
import "../styles/workouts.css"
import chestImg from "../assets/chest.jpeg";
import armImg from "../assets/arm.jpeg";
import backImg from "../assets/back.jpeg";
import legsImg from "../assets/legs.jpeg";
import coreImg from "../assets/core.jpeg";

export default function Workouts() {
    return (
        <div>
            <h1 className="Header">Choose Target Area, Create or Start Workout</h1>
            <div className="container">
                <Card title="Chest" image={chestImg} to="/Chest" />
                <Card title="Arms" image={armImg} to="/Arms" />
                <Card title="Back" image={backImg} to="/Back" />
                <Card title="Legs" image={legsImg} to="/Legs" />
                <Card title="Core" image={coreImg} to="/Core" />
            </div>
        </div>
    )
}