# PowerUp

PowerUp is a full-stack fitness tracker that helps users log exercises and track daily meals. Users can add, edit, and delete exercises, search for meals via the USDA Food Database API, and maintain a record of their fitness progress. 

## Live Demo
Check out the deployed app: [Frontend (Netlify)](https://powerup-fitness1.netlify.app)  
Backend (Render API): [https://powerup-backend-f15s.onrender.com](https://powerup-backend-f15s.onrender.com)

## Demo account
You can use the following account to access the site on netlify 
Username: powerup1.0
Password: qwe123asd

## Tech Stack
**Frontend:**  
- React + Vite  
- React Router  
- React Datepicker  
- Axios  

**Backend:**  
- Express  
- Node.js  

**Authentication and Security:**  
- bcrypt  
- JWT  

**Database:**  
- MongoDB  

**Email Verification:**  
- Resend  

**APIs:**  
- USDA Food Database API

## Installation and setup
1. Clone the repository. <br>
2. Copy .env.example → .env <br>
3. Install dependencies: npm install <br>
4. Start the dev server: npm run dev <br>
5. Repeat steps 2-4 for the backend .env.example <br>

Both frontend and backend .env files must be filled in with your own API keys, MongoDB URI, JWT secret, and email info.

## Features:
* Log exercises by muscle group and date

* Add, edit, complete, and delete exercises

* Search meals using USDA Food Database API

* Add your own custom meals

* Track daily calories and macros

* Email verification for new accounts
