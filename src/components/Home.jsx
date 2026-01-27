import "../styles/home.css";
import "../styles/card.css";
import Card from "./Card";
import workoutImg from "../assets/workout.avif";
import mealsImg from "../assets/Meals.webp";
import progressImg from "../assets/progress.png";


function Home() {

    return (
        <div>
            <h1 className="Header">Fuel Your Body, Own Your Goals</h1>
            <h1 className="Header">Welcome, Name</h1>
            <div className="container">
                <Card title="Log workouts and check your progress" image= {workoutImg} to="/Workouts"></Card>
                <Card title="Track your daily macro intake" image= {mealsImg} to="/Meals"></Card>
                <Card title="Create and monitor goals" image= {progressImg} to="/Goals"></Card>
            </div>
        </div>
    )
}

export default Home;