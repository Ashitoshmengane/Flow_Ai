AI Prompt Dashboard A full-stack MERN application that lets you type a message (e.g., "Sale 50% Off"), get an AI-generated response via OpenRouter, and save both the prompt and response to MongoDB. Includes a live "Online Store" preview panel. --- ## Tech Stack - **Frontend:** React, React Flow - **Backend:** Node.js, Express - **Database:** MongoDB (Atlas) - **AI:** OpenRouter API (Gemini 2.0 Flash Lite / Mistral 7B) - **Deployment:** Render.com / Vercel / Fly.io --- ## Features - Type a prompt in the App Dashboard and click **Ask AI** - AI response generated via a secure backend route (`/api/ask-ai`) - Click **Save** to store the prompt + response in MongoDB - Live "Online Store" preview reflects saved messages - API key is never exposed to the frontend --- ## Prerequisites - Node.js v18+ - MongoDB Atlas account (or local MongoDB) - OpenRouter account + API key → https://openrouter.ai --- ## Getting Started ### 1. Clone the repository ```bash git clone https://github.com/your-username/your-repo-name.git cd your-repo-name

2. Set up the Backend

cd server npm install
Create a .env file inside /server:

PORT=5001 MONGO_URI=your_mongodb_connection_string OPENROUTER_API_KEY=your_openrouter_api_key
Start the server:

npm run dev
The server runs on http://localhost:5001

3. Set up the Frontend

cd client npm install npm start
The React app runs on http://localhost:5173/

API Endpoints

POST /api/ask-ai

Receives a user prompt, calls the OpenRouter API, and returns the AI response.

Request body:

{ "prompt": "Sale 50% Off" }
Response:

{ "answer": "Huge savings await! Get 50% off everything in store today only..." }
POST /api/save

Saves the prompt and AI response to MongoDB.

Request body:

{ "prompt": "Sale 50% Off", "response": "Huge savings await..." }
GET /api/messages

Returns all saved prompt/response records from MongoDB.

AI Model

This project uses a free model via OpenRouter to avoid API costs:

google/gemini-2.0-flash-lite-preview-02-05:free
Alternative:

mistralai/mistral-7b-instruct:free
Folder Structure

root/ ├── client/ # React frontend │ ├── src/ │ │ ├── components/ # Dashboard, StorePreview, FlowCanvas │ │ └── App.js │ └── package.json ├── server/ # Express backend │ ├── routes/ │ │ └── ai.js # /api/ask-ai and /api/save routes │ ├── models/ │ │ └── Message.js # Mongoose schema │ ├── index.js │ └── package.json └── README.md
Deployment

Backend (Render.com)

Push your repo to GitHub
Go to render.com → New Web Service
Connect your GitHub repo, set root to /server
Add environment variables (MONGO_URI, OPENROUTER_API_KEY, PORT)
Deploy
Frontend (Vercel)

Go to vercel.com → Import Project
Set root to /client
Add env variable: REACT_APP_API_URL=https://your-render-backend-url.com
Deploy
Demo Video

Watch the 2-3 minute walkthrough here:
YouTube / Loom Link

The video covers:

Typing a message in the Dashboard and clicking Save
The message appearing live in the Online Store preview
The saved record shown in MongoDB
