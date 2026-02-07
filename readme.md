# 📝 Task & Note Manager API

A RESTful API built with Node.js and Express for managing users, todos, and notes.

## 🚀 Base URL

`http://localhost:5000/api/v1`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)**.

- For protected routes, include the token in the headers:
  `Authorization: Bearer <your_token>`

---

## 🚦 API Endpoints

### 👤 User Routes

Handles user registration, authentication, and profile management.

| Method | Endpoint          | Description              | Auth    |
| :----- | :---------------- | :----------------------- | :------ |
| `POST` | `/users/register` | Register a new user      | No      |
| `POST` | `/users/login`    | Login and receive JWT    | No      |
| `GET`  | `/users/profile`  | Get current user profile | **Yes** |
| `GET`  | `/users/users`    | Get all registered users | **Yes** |

---

### 📋 Todo Routes

Manage tasks and completion status.

| Method   | Endpoint      | Description              | Auth    |
| :------- | :------------ | :----------------------- | :------ |
| `GET`    | `/todos/todo` | Fetch all user todos     | **Yes** |
| `POST`   | `/todos/todo` | Create a new todo        | **Yes** |
| `PUT`    | `/todos/todo` | Update todo content      | **Yes** |
| `PATCH`  | `/todos/todo` | Toggle completion status | **Yes** |
| `DELETE` | `/todos/todo` | Delete a todo            | **Yes** |

---

### 📓 Note Routes

Endpoints for managing personal notes.

| Method   | Endpoint     | Description            | Auth    |
| :------- | :----------- | :--------------------- | :------ |
| `GET`    | `/notes`     | Get all notes          | **Yes** |
| `POST`   | `/notes`     | Create a new note      | **Yes** |
| `PUT`    | `/notes/:id` | Update a specific note | **Yes** |
| `DELETE` | `/notes/:id` | Delete a specific note | **Yes** |

---

## 🛠️ Utility Routes

| Method | Endpoint | Description                        |
| :----- | :------- | :--------------------------------- |
| `GET`  | `/test`  | Health check to see if API is live |

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   ```
