# Task Management Application

## Overview
This is a full-stack “Task Management” application built using:
- **Frontend:** React + TypeScript (with Vite)
- **Backend:** Nest.js
- **Database:** PostgreSQL
- **Axios:** For making HTTP requests
- **React Hot Toast:** For notifications

The application allows users to:
- Register (sign up) and Log in (sign in) securely.
- View, create, update, and delete tasks.
- Mark tasks as complete/incomplete.
- Protected routes for tasks using JWT authentication.



## Features
### 1. Authentication
- **User Model:**
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string using bcrypt
- **Endpoints:**
  - `POST /auth/register`: Register a new user
  - `POST /auth/login`: Login and receive a JWT token
- **Security:**
  - Passwords are securely hashed using bcrypt.
  - JWT tokens are used to protect routes and verify user identity.

### 2. Tasks CRUD
- **Endpoints:**
  - `GET /tasks`: Retrieve a list of tasks for the authenticated user
  - `POST /tasks`: Create a new task
  - `PUT /tasks/:id`: Update a task (edit text, mark as complete)
  - `DELETE /tasks/:id`: Delete a task
- **Task Model:**
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default: false)
  - `userId`: Links tasks to the user who created them

## Project Structure
```
TASK-MANAGER/
│
├── backend/                     # Nest.js Backend
│   ├── src/
│   │   ├── auth/                 # Authentication Module
│   │   │   ├── auth.controller.ts  # Handles authentication routes (register, login)
│   │   │   ├── auth.service.ts     # logic for authentication (register, login)
│   │   │   ├── jwt-auth.guard.ts   # Protects routes using JWT tokens
│   │   │   └── jwt.strategy.ts     # Validates and extracts user from JWT
│   │   │
│   │   ├── tasks/                # Task Management Module
│   │   │   ├── task.controller.ts  # Handles task-related routes (CRUD)
│   │   │   ├── task.service.ts     # logic for task operations
│   │   │   └── task.entity.ts      # Task entity schema for database
│   │   │
│   │   └── main.ts               # Application entry point
│   │
│   └── .env                      # Backend Environment Variables
│
└── frontend/                    # React Frontend (Vite + TypeScript)
    ├── src/
    │   ├── api/apiClient.ts           # Centralized Axios instance for API requests
    │   ├── api/taskService.ts         # API logic for task-related requests
    │   │
    │   ├── components/            # Reusable UI Components
    │   │   ├── Auth/                # Authentication Pages
    │   │   │   ├── Login.tsx          # User Login Page
    │   │   │   └── Register.tsx       # User Registration Page
    │   │   │
    │   │   ├── tasks/               # Task Management Pages
    │   │   │   └── TaskList.tsx       # Displays and manages tasks
    │   │   │
    │   │   └── PrivateRoute.tsx     # Protects routes for authenticated users
    │   │
    │   ├── interfaces/            # TypeScript Interfaces
    │   │   └── Task.ts              # Interface for Task model
    │   │
    │   ├── App.tsx                # Main Application File with Routing
    │   └── main.tsx               # React Application Entry Point
    │
    └── .env                       # Frontend Environment Variables

```

## Environment Variables
### Backend (`backend/.env`):
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=supersecretkey123
PORT=5001
```
### Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:5001
```

## Installation and Setup
### Backend (Nest.js + PostgreSQL)
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up the PostgreSQL database:
   ```sql
   CREATE DATABASE task_manager;
   ```
3. Run the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend (React + TypeScript)
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Running the Application
- Visit the frontend at: `http://localhost:5173`
- Backend API is available at: `http://localhost:5001`

## Testing
- Used Postman and UI to test API endpoints.



## Video Demo
Link to the video demo showcasing:
- Link: https://www.youtube.com/watch?v=-R5QygFyzBY



## Side Note
- Hi, I just wanted to leave a quick note. Regardless of the outcome, I’d really appreciate any feedback to help me prepare for future opportunities.

This was my first time using Nest.js, and I didn't have much time to learn it since I only saw the email on Wednesday. I also spent about two and a half days troubleshooting issues with PostgreSQL. I'm not entirely sure what caused the problem, but I had to go through the documentation and GPT to figure it out. I ended up deleting all the files but later realized I should've deleted the installer as well, which left some residual files. It was quite  frustrating. I almsot gave up but gave it one last try and it worked. I'm still not fully sure what the issue was, but it wasn’t working before.

Additionally, I'm not sure why, but the project freezes on regular Chrome. It works perfectly fine in incognito mode or other browsers like Explorer. I initially thought it was due to an extension, but the issue persisted even after checking that, so I'm not entirely sure what's causing it. With more time, I would have had a better chance to debug it.
