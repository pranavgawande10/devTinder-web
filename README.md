# 🚀 DevTinder — Client UI Service (Frontend)

> ⚠️ **Microservices Architecture:** This repository contains the independent React.js Frontend UI service. The decoupled Node.js Backend API service that powers this application can be found here: [👉 DevTinder Backend Repository](https://github.com/pranavgawande10/devTinder)

Welcome to the frontend client for **DevTinder**! Designed in a **microservices-oriented architecture**, this highly responsive React application acts as an independent presentation layer. It communicates with the backend APIs via REST and WebSockets to deliver a seamless developer networking experience.

## 🛠️ Tech Stack

- **Core:** React.js, React Router DOM
- **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
- **Styling:** Tailwind CSS
- **WebSockets:** `socket.io-client`

---

## ✨ Detailed Feature Breakdown

### 1. ⚡ Global State Management Architecture
To handle complex data flows asynchronously from the backend, the application relies on **Redux Toolkit**.
*   **User Slice:** Manages authentication state globally, storing user data and conditionally rendering protected routes.
*   **Feed Slice:** Caches the array of potential developer matches. As a user swipes, the top card is popped off the Redux store instantly, creating a zero-latency UI experience.
*   **Connection Slice:** Manages pending requests and accepted connections, updating UI badges dynamically.

### 2. 🃏 Dynamic Swipe Interface
The core discovery mechanic is built to be intuitive and engaging.
*   Developers are presented in a sleek, card-based layout.
*   Action buttons (Ignore / Interested) trigger API calls to the backend service while simultaneously updating the local Redux store.

### 3. 💬 Real-Time Chat UI
A dedicated chat interface that unlocks only for mutually connected developers.
*   Utilizes `socket.io-client` to maintain an active WebSocket connection with the backend chat service.
*   Features optimistic UI updates: messages appear instantly on-screen while transmitting to the server.

### 4. ✨ DevSpark AI Integration
A seamless UI wrapper around the backend's Gemini AI service.
*   Within the "Edit Profile" section, users can click an "Enhance with AI" button.
*   The frontend triggers the AI route and injects a beautifully rewritten professional bio and headline directly back into the input fields.

### 5. 📱 Responsive & Component-Driven Design
*   Built entirely with **Tailwind CSS**, ensuring that the application looks flawless on mobile devices, tablets, and desktop monitors.
*   The codebase follows a strict component-driven architecture, keeping UI elements decoupled and highly reusable.

---
*Built with ❤️ by Pranav Gawande*
