# NEXORA — Full Stack MERN App

## 🚀 Getting Started

### Backend (Express + MongoDB)
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Frontend (React + Vite)
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 📁 Project Structure

```
NEXORA/
├── backend/
│   ├── src/
│   │   ├── config/       → db.js (MongoDB connection)
│   │   ├── controllers/  → userController.js
│   │   ├── middleware/   → errorHandler.js
│   │   ├── models/       → User.js
│   │   ├── routes/       → userRoutes.js
│   │   ├── app.js        → Express app setup
│   │   └── index.js      → Entry point
│   └── .env              → PORT, MONGO_URI
│
└── frontend/
    ├── src/
    │   ├── components/   → UserList.jsx
    │   ├── services/     → api.js (axios)
    │   └── App.jsx
    └── .env              → VITE_API_URL
```

## 🛠 API Endpoints

| Method | URL              | Description       |
|--------|------------------|-------------------|
| GET    | /api/users       | Get all users     |
| POST   | /api/users       | Create user       |
| GET    | /api/users/:id   | Get user by ID    |
| DELETE | /api/users/:id   | Delete user       |

## ⚙️ Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexora
NODE_ENV=development
```

### frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```
