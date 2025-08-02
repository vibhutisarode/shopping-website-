# 🚀 ElectroStore - Getting Started Guide

## Prerequisites
1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)

## Quick Start Instructions

### Step 1: Install Dependencies
```bash
# In the project root directory
npm run install-deps
```

### Step 2: Database Setup
If using local MongoDB:
1. Start MongoDB service on your system
2. MongoDB will be accessible at `mongodb://localhost:27017`

If using MongoDB Atlas:
1. Create a free account at MongoDB Atlas
2. Create a cluster and get the connection string
3. Update the `MONGODB_URI` in `backend/.env`

### Step 3: Environment Configuration
```bash
# Copy the environment template
copy backend\.env.example backend\.env
```

Edit `backend/.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/electrostore
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

### Step 4: Seed Database (Optional)
```bash
cd backend
npm run seed
```

### Step 5: Start Servers

#### Option A: Start Both Servers Together
```bash
# From project root
npm run dev
```

#### Option B: Start Servers Separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

## Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/products

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on your system
- Check the connection string in `.env`
- For Windows: Start MongoDB from Services or command line

### Port Already in Use
- Backend (5000): Change PORT in `backend/.env`
- Frontend (3000): React will automatically suggest port 3001

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure
```
electrostore/
├── backend/           # Node.js + Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   └── .env          # Environment variables
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/    # Redux store
│   │   └── utils/
│   └── public/
└── package.json      # Root scripts
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start only backend
- `npm run client` - Start only frontend
- `npm run install-deps` - Install all dependencies

### Backend (/backend)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend (/frontend)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Features
✅ User authentication (login/register)
✅ Product catalog with categories
✅ Shopping cart functionality
✅ Responsive design
✅ Search and filtering
✅ Product ratings and reviews
✅ Beautiful UI with animations

## Sample Accounts
After seeding, you can create accounts or use the registration form.

## Support
If you encounter any issues:
1. Check this guide first
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check console for error messages

Happy coding! 🎉
