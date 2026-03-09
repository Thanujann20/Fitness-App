import "../styles/foodCard.css";

export default function FoodCard ({description, calories, protein, carbs, fat}) {
    
    return (
        <div className="FoodCard">
            <h2>{description}</h2>
            <p>Calories: {calories}</p>
            <p>Protein: {protein} g</p>
            <p>Carbs: {carbs} g</p>
            <p>Fat: {fat} g</p>
        </div>
    )
}