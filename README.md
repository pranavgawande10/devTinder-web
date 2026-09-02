# 🚀 DevTinder — Where Code Meets Its Match (Frontend)

> ⚠️ **Looking for the Backend?** This repository contains the React.js Frontend UI. The Node.js Backend API that powers this application can be found here: [👉 DevTinder Backend Repository](https://github.com/pranavgawande10/devTinder)

Welcome to the frontend repository for **DevTinder**! This is a highly responsive, interactive React application that serves as the user-facing side of the platform, enabling developers to discover, connect, and collaborate seamlessly.

## 🛠️ Tech Stack

- **Core:** React.js, React Router DOM
- **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
- **Styling:** Tailwind CSS
- **WebSockets:** `socket.io-client`

---

## ✨ Detailed Feature Breakdown

### 1. ⚡ Global State Management Architecture
To handle complex data flows efficiently, the application relies on **Redux Toolkit**.
*   **User Slice:** Manages authentication state globally, storing user data and conditionally rendering protected routes.
*   **Feed Slice:** Caches the array of potential developer matches. As a user swipes, the top card is popped off the Redux store instantly, creating a zero-latency UI experience.
*   **Connection Slice:** Manages pending requests and accepted connections, updating UI badges dynamically.

### 2. 🃏 Dynamic Swipe Interface
The core discovery mechanic is built to be intuitive and engaging.
*   Developers are presented in a sleek, card-based layout.
*   Action buttons (Ignore / Interested) trigger API calls to the backend while simultaneously updating the Redux store to transition to the next profile seamlessly.

### 3. 💬 Real-Time Chat UI
A dedicated chat interface that unlocks only for mutually connected developers.
*   Utilizes `socket.io-client` to maintain an active connection with the backend.
*   Features optimistic UI updates: messages appear instantly on-screen while transmitting to the server.

### 4. ✨ DevSpark AI Integration
A seamless UI wrapper around the backend's Gemini AI functionality.
*   Within the "Edit Profile" section, users can click an "Enhance with AI" button.
*   The frontend triggers the AI route and injects a beautifully rewritten professional bio and headline directly back into the input fields, ready to be saved.

### 5. 📱 Responsive & Component-Driven Design
*   Built entirely with **Tailwind CSS**, ensuring that the application looks flawless on mobile devices, tablets, and desktop monitors.
*   The codebase follows a strict component-driven architecture. UI elements like buttons, input fields, navigation bars, and user cards are decoupled and highly reusable.

---
*Built with ❤️ by Pranav Gawande*
