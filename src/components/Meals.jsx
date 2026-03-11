import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/meals.css";
import FoodCard from "./FoodCard";

export default function Meals() {
	const apiKey = import.meta.env.VITE_EDAMAM_API_KEY;
	const userId = "12345"; // hardcoded user ID for demo purposes
  	const navigate = useNavigate();

  	const [searchTerm, setSearchTerm] = useState("");
  	const [results, setResults] = useState([]);
  	const [meals, setMeals] = useState([]);
  	const [isSearched, setSearched] = useState(false);
  	const [portion, setPortion] = useState({});
  	const [addingCustom, setAddingCustom] = useState(false);

	const [formData, setFormData] = useState({
		description: "",
		calories: "",
		protein: "",
		carbs: "",
		fat: "",
	});

	//fetch meals from backend
	useEffect(() => {
		axios.get(`http://localhost:3000/api/meals/${userId}`)
			.then((res) => setMeals(res.data))
			.catch((err) => console.log(err));
	}, []);

	// Search USDA database for food items
	const handleSearch = async () => {
		try {
			const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&api_key=${apiKey}`);
			const data = await response.json();
			setResults(data.foods || []);
			setSearched(true);
		} catch (err) {
			console.error(err);
			alert("Failed to search USDA database");
		}
	};
	
	const handleAdd = (meal) => {
		axios.post("http://localhost:3000/api/meals", { ...meal, userId})
		.then(res => setMeals([...meals, res.data]))
		.catch(err => console.log(err));
	};

	const handleSave = () => {
		const { description, calories, protein, carbs, fat } = formData; 

		// Validate Description
		if (!description.trim()) {
			alert("Description cannot be empty");
			return;
		}

		if (!calories.trim() || !/^\d+$/.test(calories)) {
			alert("Calories must be a number");
			return;
		}

		if (!protein.trim() || !/^\d+$/.test(protein)) {
			alert("Protein must be a number");
			return;
		}

		if (!carbs.trim() || !/^\d+$/.test(carbs)) {
			alert("Carbs must be a number");
			return;
		}

		if (!fat.trim() || !/^\d+$/.test(fat)) {
			alert("Fat must be a number");
			return;
		}

		const meal = {
			description,
			calories: Number(calories),
			protein: Number(protein),
			carbs: Number(carbs),
			fat: Number(fat),
			userId,
		};

		axios.post("http://localhost:3000/api/meals", meal)
			.then(res => setMeals([...meals, res.data]))
			.catch(err => console.log(err));

		setFormData({ description: "", calories: "", protein: "", carbs: "", fat: "" });
		setAddingCustom(false);
	};


	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:3000/api/meals/${id}`)
			.then(() => setMeals(meals.filter((meal) => meal._id !== id)))
			.catch((err) => console.log(err));
  	};

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

		<div className="custom">
			{addingCustom && (
			<div className="customForm">
				<div className="customField">
				<label htmlFor="description">Description: </label>
				<input
					name="description"
					placeholder="e.g. Chicken Salad"
					value={formData.description}
					onChange={handleFormChange}
				/>
				</div>

				<div className="customField">
				<label htmlFor="calories">Calories: </label>
				<input
					name="calories"
					placeholder="e.g. 500"
					value={formData.calories}
					onChange={handleFormChange}
				/>
				</div>

				<div className="customField">
				<label htmlFor="protein">Protein (g): </label>
				<input
					name="protein"
					placeholder="e.g. 30"
					value={formData.protein}
					onChange={handleFormChange}
				/>
				</div>

				<div className="customField">
				<label htmlFor="carbs">Carbs (g): </label>
				<input
					name="carbs"
					placeholder="e.g. 20"
					value={formData.carbs}
					onChange={handleFormChange}
				/>
				</div>

				<div className="customField">
				<label htmlFor="fat">Fat (g): </label>
				<input
					name="fat"
					placeholder="e.g. 10"
					value={formData.fat}
					onChange={handleFormChange}
				/>
				</div>

				<div className="buttonRow">
				<button onClick={handleSave}>Save</button>
				<button
					onClick={() => {
					setAddingCustom(false);
					setFormData({
						description: "",
						calories: "",
						protein: "",
						carbs: "",
						fat: "",
					});
					}}
				>Cancel
				</button>
				</div>
			</div>
			)}

			{!addingCustom && <button onClick={() => setAddingCustom(true)}>Add Custom Meal</button>}
		</div>

		{isSearched && (
			<div className="results">
			{results.map((food) => {
				const calories = food.foodNutrients.find((n) => n.nutrientName === "Energy")?.value || 0;
				const protein = food.foodNutrients.find((n) => n.nutrientName === "Protein")?.value || 0;
				const carbs = food.foodNutrients.find((n) => n.nutrientName === "Carbohydrate, by difference",)?.value || 0;
				const fat =food.foodNutrients.find((n) => n.nutrientName === "Total lipid (fat)",)?.value || 0;

				return (
				<div key={food.fdcId} className="foodCard">
					<FoodCard
						description={food.description}
						calories={calories}
						protein={protein}
						carbs={carbs}
						fat={fat}
					/>
					<label>Portions:</label>
					<input
						type="number"
						min="0.1"
						value={portion[food.fdcId] || 1}
						onChange={(e) => {
							const val = Number(e.target.value);
							if (!isNaN(val) && val > 0) {
							setPortion({ ...portion, [food.fdcId]: val });
							}
						}}
					/>
					<button
						onClick={() =>
							handleAdd({
								description: food.description,
								calories: Math.round(calories * (portion[food.fdcId] || 1)),
								protein: protein * (portion[food.fdcId] || 1),
								carbs: carbs * (portion[food.fdcId] || 1),
								fat: fat * (portion[food.fdcId] || 1),
							})
						}
						>+ Add Meal
					</button>
				</div>
				);
			})}
			</div>
		)}
		<h2>Today's Meals</h2>
		<div className="meals">
			{meals.map((meal, index) => (
			<FoodCard
				key={meal._id}
				description={meal.description}
				calories={meal.calories}
				protein={meal.protein}
				carbs={meal.carbs}
				fat={meal.fat}
				onDelete={() => handleDelete(meal._id)}
			/>
			))}
		</div>
		<h2>Total Macros</h2>
		<div className="totals">
			<label className="calories">
				<h3>Calories</h3>
				<p>{Math.round(meals.reduce((sum, meal) => sum + meal.calories, 0) * 10) / 10}</p>
			</label>
			<label className="proteins">
				<h3>Protein</h3>
				<p>{Math.round(meals.reduce((sum, meal) => sum + meal.protein, 0) * 10) / 10}{" "}g</p>
			</label>
			<label className="carbs">
				<h3>Carbs</h3>
				<p>{Math.round(meals.reduce((sum, meal) => sum + meal.carbs, 0) * 10) /10}{" "}g</p>
			</label>
			<label className="fats">
				<h3>Fat</h3>
				<p>{Math.round(meals.reduce((sum, meal) => sum + meal.fat, 0) * 10) /10}{" "}g</p>
			</label>
		</div>
	</div>
	);
}
