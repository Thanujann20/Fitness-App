# PowerUp

PowerUp is a full-stack fitness tracker that helps users log exercises and track daily meals. Users can add, edit, and delete exercises, search for meals via the USDA Food Database API, and maintain a record of their fitness progress. 

## Live Demo
Check out the deployed app: (https://powerup-fitness1.netlify.app)

## Demo account
You can use the following account to access the site on netlify 
Username: powerup1.0
Password: qwe123asd

## Tech Stack
Frontend: React + Vite, React Router, React Datepicker, Axios
Backend: Express, Node.js
Authentication and Security: bcrypt, JWT
Database: MongoDB
Email Verification: Resend
APIs: USDA Food Database API

## Installation and setup
1. Clone the repository.
### Frontend:
Copy .env.example → .env
Install dependencies: npm install
Start the dev server: npm run dev

### Backend:
Copy .env.example → .env
Install dependencies: npm install
Start the backend server: npm run dev

Both frontend and backend .env files must be filled in with your own API keys, MongoDB URI, JWT secret, and email info.

## Features:
* Log exercises by muscle group and date

* Add, edit, complete, and delete exercises

* Search meals using USDA Food Database API

* Add your own custom meals

* Track daily calories and macros

* Email verification for new accounts
