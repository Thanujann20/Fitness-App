import { useState, useEffect } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"
import "../styles/meals.css"
import FoodCard from "./FoodCard"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Meals() {
	const apiKey = import.meta.env.VITE_EDAMAM_API_KEY
  	const navigate = useNavigate()

  	const [searchTerm, setSearchTerm] = useState("")
  	const [results, setResults] = useState([])
  	const [meals, setMeals] = useState([])
  	const [isSearched, setSearched] = useState(false)
  	const [portion, setPortion] = useState({})
  	const [addingCustom, setAddingCustom] = useState(false)
	const [userCreatedAt, setUserCreatedAt] = useState(null)
  	
	const [selectedDate, setSelectedDate] = useState(new Date())
	
	function formatDateLocal(date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const day = String(date.getDate()).padStart(2, "0")
		return `${year}-${month}-${day}`
	}

	const formattedDate = formatDateLocal(selectedDate)

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	const [formData, setFormData] = useState({
		description: "",
		calories: "",
		protein: "",
		carbs: "",
		fat: "",
	})

	// Fetch meals if logged in, redirect on error
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"))
		const token = localStorage.getItem("token")
		console.log("Meals useEffect token:", token)
		console.log("Meals useEffect user:", storedUser)

		if (!storedUser || !token) {
			console.log("No stored user or token, redirecting")
			navigate("/Login")
			return
		}

		api.get(`/meals?date=${formattedDate}`)
			.then(res => setMeals(res.data))
			.catch(err => {
				console.log("Error fetching meals:", err.response?.status, err.message)
				if (err.response?.status === 401) {
					localStorage.clear()
					navigate("/Login")
				}
			})
	}, [navigate, formattedDate])

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))
		if (user?.createdAt) {
			setUserCreatedAt(new Date(user.createdAt))
		}
	}, [])

	// Search USDA database for food items
	const handleSearch = async () => {
		try {
			const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&api_key=${apiKey}`)
			const data = await response.json()
			setResults(data.foods || [])
			setSearched(true)
		} catch (err) {
			console.error(err)
			alert("Failed to search USDA database")
		}
	}

	const handleAdd = (meal) => {
		api.post("/meals", {...meal, date: formattedDate })
		.then(res => setMeals([...meals, res.data]))
		.catch(err => console.log(err))
	}

	// Save custom meal
	const handleSave = () => {
		const { description, calories, protein, carbs, fat } = formData

		// Validate Description
		if (!description.trim()) {
			alert("Description cannot be empty")
			return
		}

		if (!calories.trim() || !/^\d+$/.test(calories)) {
			alert("Calories must be a number")
			return
		}

		if (!protein.trim() || !/^\d+$/.test(protein)) {
			alert("Protein must be a number")
			return
		}

		if (!carbs.trim() || !/^\d+$/.test(carbs)) {
			alert("Carbs must be a number")
			return
		}

		if (!fat.trim() || !/^\d+$/.test(fat)) {
			alert("Fat must be a number")
			return
		}

		const meal = {
			description,
			calories: Number(calories),
			protein: Number(protein),
			carbs: Number(carbs),
			fat: Number(fat),
		}

		api.post("/meals", {...meal, date: formattedDate})
			.then(res => setMeals([...meals, res.data]))
			.catch(err => console.log(err))

		setFormData({ description: "", calories: "", protein: "", carbs: "", fat: "" })
		setAddingCustom(false)
	}


	const handleFormChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleDelete = (id) => {
		api.delete(`/meals/${id}`)
			.then(() => setMeals(meals.filter((meal) => meal._id !== id)))
			.catch((err) => console.log(err))
  	}

	return (
		<div>
		<div className="backBtn">
			<button onClick={() => navigate(-1)}>Back</button>
		</div>

		<h1>Meals</h1>

		<div className="date-meals">
			<p>Select Date:</p>
			<DatePicker selected={selectedDate} onChange={handleDateChange} minDate={userCreatedAt} maxDate={new Date()} />
		</div>

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
					setAddingCustom(false)
					setFormData({
						description: "",
						calories: "",
						protein: "",
						carbs: "",
						fat: "",
					})
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
				const calories = food.foodNutrients.find((n) => n.nutrientName === "Energy")?.value || 0
				const protein = food.foodNutrients.find((n) => n.nutrientName === "Protein")?.value || 0
				const carbs = food.foodNutrients.find((n) => n.nutrientName === "Carbohydrate, by difference",)?.value || 0
				const fat =food.foodNutrients.find((n) => n.nutrientName === "Total lipid (fat)",)?.value || 0

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
							const val = Number(e.target.value)
							if (!isNaN(val) && val > 0) {
							setPortion({ ...portion, [food.fdcId]: val })
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
				)
			})}
			</div>
		)}
		<h2>Meals for {formattedDate}</h2>
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
	)
}
