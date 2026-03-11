import "../styles/foodCard.css";

export default function FoodCard ({description, calories, protein, carbs, fat, onDelete}) {
    
    return (
        <div className="FoodCard">
            <h2>{description}</h2>
            <p>Calories: {Math.round(calories * 10) / 10}</p>
            <p>Protein: {Math.round(protein * 10) / 10} g</p>
            <p>Carbs: {Math.round(carbs * 10) / 10} g</p>
            <p>Fat: {Math.round(fat * 10) / 10} g</p>
            {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
    )
}