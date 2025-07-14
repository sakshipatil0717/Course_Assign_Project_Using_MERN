 📚 Course Assigning Project Using MERN

A full-stack **MERN** web application to manage students and courses, allowing admins to assign multiple courses to students and view detailed records. Built using **MongoDB**, **Express.js**, **React (Vite)**, and **Node.js**.

---

## 🚀 Features

- Add, edit, and delete students
- Add, edit, and delete courses
- Assign multiple courses to students
- View assigned courses with student and course details populated
- Fast and responsive UI with React + Vite
- RESTful API for all resources
- MongoDB for persistent data storage

---

## 🛠 Tech Stack

| Layer         | Tech Stack                 |
|---------------|----------------------------|
| Frontend      | React (Vite), Bootstrap    |
| Backend       | Node.js, Express.js        |
| Database      | MongoDB, Mongoose          |
| State Mgmt    | React Hooks                |
| Package Mgmt  | npm                        |

---

## 📁 Project Structure
Course_Assign_Project_Using_MERN/
│
├── frontend/ # React (Vite) frontend
│ ├── src/ # React components and logic
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── backend/ # Node.js + Express backend
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route handlers
│ ├── index.js # Server entry point
│ └── package.json
│
├── .gitignore
└── README.md



1. Setup Backend
cd backend
npm install
npm start

2. Setup Frontend
cd ../frontend
npm install
npm run dev


🌐 API Endpoints
👨‍🎓 Student Routes
| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | `/api/student`     | Get all students |
| POST   | `/api/student`     | Add a student    |
| PUT    | `/api/student/:id` | Update a student |
| DELETE | `/api/student/:id` | Delete a student |



📘 Course Routes
| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/course`     | Get all courses |
| POST   | `/api/course`     | Add a course    |
| PUT    | `/api/course/:id` | Update a course |
| DELETE | `/api/course/:id` | Delete a course |



📎 Assigned Course Routes
| Method | Endpoint                 | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| GET    | `/api/assign-course`     | Get all assigned courses with details |
| POST   | `/api/assign-course`     | Assign a course to a student          |
| DELETE | `/api/assign-course/:id` | Remove an assigned course             |
