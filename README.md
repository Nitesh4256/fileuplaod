# ⚡ QuickShare — Real-Time File Sharing App

A MERN stack real-time file sharing application. Upload files and they instantly appear on all connected devices.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Socket.IO Client, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, Socket.IO, JWT

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm run dev
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/quickshare
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/files | ✅ | Get all files |
| POST | /api/files/upload | ✅ | Upload file |
| DELETE | /api/files/:id | ✅ | Delete file |
| GET | /api/files/download/:id | ✅ | Download file |

## Socket.IO Events
- `fileUploaded` — broadcast when a file is uploaded
- `fileDeleted` — broadcast when a file is deleted
- `userConnected` — broadcast when a user connects

## Deployment (Render)
1. Deploy backend as a **Web Service** — set env vars in Render dashboard
2. Deploy frontend as a **Static Site** — set `VITE_API_URL` to your backend URL
3. Files are stored in `backend/uploads/` (temporary on Render free tier)
