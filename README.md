# 🚀 DevTinder — Where Code Meets Its Match

DevTinder is a full-stack developer networking platform inspired by swipe-based apps. It helps developers discover, connect, and collaborate with other developers for projects, hackathons, mentorship, and startups.

![DevTinder Logo](/devTinder.png)

---

## ✨ Features

### 👤 Developer Profiles
* Create and manage detailed profiles.
* Add key developer skills (e.g., MERN, Python, DevOps, etc.).
* Edit your bio, profile photo, age, gender, and other personal details.

### 🔐 Secure Authentication
* Secure Signup & Login utilizing JSON Web Tokens (JWT).
* JWTs stored securely in HTTP-only cookies to mitigate XSS.
* Password hashing with `bcrypt`.
* Robust input validation using `validator`.

### 🧭 Smart Discovery Feed
* Discover new and relevant developers.
* The feed engine automatically hides:
  * Ignored users
  * Already interacted users
  * Accepted or rejected connections

### 🔁 Connection System (State-Based)
DevTinder uses a state machine to manage interactions:

| State | Description |
| :--- | :--- |
| `ignored` | User dismissed the profile |
| `interested` | Connection request sent |
| `accepted` | Both users connected |
| `rejected` | Request declined |

### 🧠 Connection Logic
* Prevents duplicate requests.
* Avoids spam.
* Ensures a clean user experience.
* Easily scalable for future features (e.g., chat, recommendations).

---

## 🛠️ Tech Stack

### Frontend
* **React.js (v19)** — Component library
* **Tailwind CSS (v4)** — Styling
* **daisyUI (v5)** — UI Component themes
* **Redux Toolkit** — State management
* **React Router DOM (v7)** — Navigation

### Backend
* **Node.js** & **Express.js** — API server
* **MongoDB** & **Mongoose** — Database and ODM
* **Authentication & Security** — JWT, Cookie-Parser, bcrypt, Validator.js

---

## 🏗️ System Architecture

```
Client (React + Redux)
        ↓
Express API (Node.js)
        ↓
Auth & Validation Middleware
        ↓
MongoDB (Users & Connections)
```

---

## ⚙️ Development Setup

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/) (running instance)

### 2. Frontend Installation
Navigate to the project root directory and run:
```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### 3. Backend Setup
Make sure the DevTinder backend repository is running locally on port `3000` (configurable in `src/utils/constants.js`).

---

## 📝 Development Steps Checklist (History)
The following steps were implemented during the development of this repository:

- [x] Create vite + react application
- [x] Remove unnecessary code and create hello world app
- [x] Install Tailwind CSS
- [x] Install daisyUI
- [x] Add navbar component to `App.jsx`
- [x] Create a `NavBar.jsx` separate component file
- [x] Install react-router-dom
- [x] Create `BrowserRouter` > `Routes` > `Route=/Body` > `Route Children`
- [x] Create an outlet in the `Body` component
- [x] Create `Footer`
- [x] Create `Login` Page
- [x] Install `axios`
- [x] Set up CORS in backend (`credentials: true`, configure origin)
- [x] Configure axios to pass `{ withCredentials: true }`
- [x] Install react-redux + `@reduxjs/toolkit`
- [x] Configure store, Provider, slice reducers
- [x] Connect authentication details to Redux Store
- [x] Make `NavBar` update dynamically when user logs in/out
- [x] Refactor folders to have a `constants.js` file and component directories
- [x] Implement routing guards (redirect to login if unauthenticated)
- [x] Add logout functionality
- [x] Load and store feed items in Redux
- [x] Build the Tinder-like `UserCard` on the Feed page
- [x] Add Edit Profile functionality
- [x] Display toast message on successful profile update
- [x] Create "Connections" page to view accepted connections
- [x] Create "Requests" page to view incoming connection requests
- [x] Enable Accept/Reject operations for connection requests
- [x] Implement Interested/Ignored swiping actions on the feed card