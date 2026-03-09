import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/meals.css";
import FoodCard from "./FoodCard"

export default function Meals() {

  const apiKey = import.meta.env.VITE_EDAMAM_API_KEY;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [meals, setMeals] = useState([])
  const [isSearched, setSearched] = useState(false)
  const [portion, setPortion] = useState({})
  
  const handleSearch = async () => {

    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&api_key=${apiKey}`
    );

    const data = await response.json()

    setSearched(true)
    setResults(data.foods)
  }

  return (
    <div>
      <div className="backBtn">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <h1>Meals</h1>
      <p>Search for your favorite meals and track your macros</p>
    
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Food..."
        />
        {isSearched && (
          <button onClick={() => setSearched(false)}> Close Results</button>
        )}
        <button onClick={handleSearch}> Search </button>
      </div>

      {isSearched && (
        <div className="results">
          {results.map(food => {
            const calories = food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0;
            const protein = food.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0;
            const carbs = food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0;
            const fat = food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0;

            return (
              <div key={food.fdcId} className="foodCard">
                <FoodCard description={food.description} calories={calories} protein={protein} carbs={carbs} fat={fat}/>
                <label>Portions:</label>
                <input 
                  type="number" 
                  min ="0.1" 
                  value={portion[food.fdcId] || 1} 
                  onChange={(e) => { 
                    const val = Number(e.target.value)
                    if (!isNaN(val) && val > 0) {
                      setPortion({...portion, [food.fdcId]: val})
                    }
                  }} 
                />
                <button onClick={() => setMeals([...meals, { description: food.description, calories: calories * (portion[food.fdcId] || 1), protein: protein * (portion[food.fdcId] || 1), carbs: carbs * (portion[food.fdcId] || 1), fat: fat * (portion[food.fdcId] || 1) }])}>+ Add Meal</button>
              </div>
            )
          })}
        </div>
      )}
      <h2>Today's Meals</h2>
      <div className="meals">
        {meals.map((meal, index) => (
          <FoodCard key={index} description={meal.description} calories={meal.calories} protein={meal.protein} carbs={meal.carbs} fat={meal.fat}/>
        ))}
      </div>
    </div>

  )
  
}