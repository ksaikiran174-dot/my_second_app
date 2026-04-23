# Quick Start Guide

Get the Task Management Application running in 5 minutes!

## Prerequisites

- Python 3.8+ installed
- Node.js 14+ installed
- Git installed

## 🚀 Quick Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd second_app
```

### 2. Backend Setup (2 minutes)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend
python main.py
```

Backend will run at: **http://localhost:8000**

### 3. Frontend Setup (2 minutes)

**In a new terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend will open at: **http://localhost:3000**

## ✅ You're Done!

The app is now running locally with:
- ✅ Backend API at `http://localhost:8000`
- ✅ Frontend at `http://localhost:3000`
- ✅ SQLite database (auto-created)
- ✅ Automatic hot-reload enabled

## 🧪 Quick Test

1. Go to `http://localhost:3000`
2. Sign up with test credentials:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Create a task
4. Check the dashboard analytics
5. Update task status
6. View completion rate

## 📁 Project Structure

```
second_app/
├── backend/          # FastAPI backend
│   ├── main.py      # Start here for API
│   └── routes/      # API endpoints
└── frontend/        # React frontend
    ├── src/
    └── package.json
```

## 🔧 Environment Configuration

Both frontend and backend work out of the box locally with defaults:

**Backend** uses SQLite by default (no database setup needed)
**Frontend** connects to local backend automatically

For customization, create `.env` files:

**backend/.env:**
```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=development-key
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:3000
```

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Make sure you're in the backend directory
cd backend

# Check if venv is activated (should see (venv) in terminal)
# If not, activate it:
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux

# Reinstall dependencies
pip install -r requirements.txt

# Try again
python main.py
```

### Frontend won't start?
```bash
# Make sure you're in the frontend directory
cd frontend

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try again
npm start
```

### Port already in use?
```bash
# Change backend port
# Edit main.py, change port from 8000 to 8001

# Change frontend port
# In frontend, run: PORT=3001 npm start
```

### "Cannot find module" error?
```bash
# Make sure all dependencies are installed
pip install -r backend/requirements.txt
npm install --prefix frontend
```

## 📱 Features to Try

1. **Authentication**
   - Sign up with new account
   - Login with credentials
   - See user info in navbar

2. **Task Management**
   - Create tasks with title + description
   - Edit task status (pending → in progress → done)
   - Delete tasks
   - Search tasks

3. **Analytics**
   - View completion rate
   - See task statistics
   - Check progress bar
   - Monitor task counts

## 💡 Tips

- Backend automatically creates database tables on first run
- Frontend automatically connects to backend
- No additional setup needed for local development
- All data is local (SQLite database)

## 📚 Next Steps

After getting familiar with the app:

1. **Read Documentation**
   - `PROJECT_README.md` - Full project guide
   - `DEPLOYMENT_GUIDE.md` - Deploy to production
   - `CONTRIBUTION_GUIDE.md` - Contributing to project

2. **Explore Code**
   - Backend: `backend/main.py` and `backend/routes/`
   - Frontend: `frontend/src/pages/` and `frontend/src/components/`

3. **Try Modifications**
   - Add new task fields
   - Modify styling in `App.css`
   - Add more analytics
   - Implement new features

## 🚀 Production Deployment

When ready to deploy:

1. Follow `DEPLOYMENT_GUIDE.md`
2. Set up PostgreSQL database
3. Configure production environment variables
4. Deploy backend and frontend to hosting

## 📞 Need Help?

- Check the full `PROJECT_README.md`
- Review error messages in browser console
- Check terminal output for API logs
- See `CONTRIBUTION_GUIDE.md` for debugging tips

---

**Happy coding! 🎉**

Stuck? Run these commands in order:
```bash
# Terminal 1: Backend
cd backend
python -m venv venv
./venv/Scripts/activate  # Windows only
pip install -r requirements.txt
python main.py

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

That's it! You should see the app running.
