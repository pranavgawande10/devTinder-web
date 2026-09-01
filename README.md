# 🚀 DevTinder — Where Code Meets Its Match (Frontend)

Welcome to the frontend repository for **DevTinder**! This repository houses the highly responsive, interactive React application that serves as the user-facing side of the platform.

## 🛠️ Tech Stack

- **Core:** React.js, React Router DOM
- **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
- **Styling:** Tailwind CSS
- **WebSockets:** `socket.io-client`

---

## ✨ Detailed Feature Breakdown

### 1. ⚡ Global State Management Architecture
To handle complex data flows without "prop drilling," the application relies heavily on **Redux Toolkit**.
*   **User Slice:** Manages the authentication state globally. Determines if a user is logged in, stores their data, and conditionally renders protected routes (like the Feed and Chat).
*   **Feed Slice:** Caches the array of potential developer matches. As a user swipes, the top card is popped off the Redux store instantly, creating a zero-latency UI experience.
*   **Connection Slice:** Manages the lists of pending requests and accepted connections, updating badges and UI states dynamically.

### 2. 🃏 Dynamic Swipe Interface
The core discovery mechanic is built to be intuitive and engaging.
*   Developers are presented in a card-based layout.
*   Action buttons (Ignore / Interested) trigger API calls to the backend while simultaneously updating the Redux store to transition to the next profile seamlessly.
*   The UI handles edge cases gracefully, such as displaying a "No more developers found" fallback when the feed is exhausted.

### 3. 💬 Real-Time Chat UI
A dedicated chat interface that unlocks only for mutually connected developers.
*   Utilizes `socket.io-client` to maintain an active connection with the backend.
*   Features optimistic UI updates: when a user sends a message, it appears instantly on their screen while transmitting to the server.
*   Includes "typing" indicators and online status markers to make the collaboration experience feel alive.

### 4. ✨ DevSpark AI Integration
A seamless UI wrapper around the backend's Gemini AI functionality.
*   Within the "Edit Profile" section, users can click an "Enhance with AI" button.
*   The frontend gathers their currently inputted skills and notes, triggers the AI route, and injects the beautifully rewritten professional bio and headline directly back into the input fields, ready to be saved.

### 5. 📱 Responsive & Component-Driven Design
*   Built entirely with **Tailwind CSS**, ensuring that the application looks flawless on mobile devices, tablets, and massive desktop monitors.
*   The codebase follows a strict component-driven architecture. UI elements like buttons, input fields, navigation bars, and user cards are decoupled and highly reusable, maintaining a clean and scalable React tree.

---
*Built with ❤️ by Pranav Gawande*
