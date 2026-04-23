# Task Management Application

A full-stack task management application with authentication, analytics, and real-time task tracking.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (pending, in progress, done)
- **Analytics Dashboard**: Visual analytics with completion rate tracking
- **Real-time Progress Tracking**: Monitor completed and in-progress tasks
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error messages and validation
- **Environment Configuration**: Easy setup with environment variables

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL (optional, can use SQLite for development)

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- **Windows**:
```bash
.\venv\Scripts\activate
```
- **Mac/Linux**:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file from the example:
```bash
cp .env.example .env
```

6. Update `.env` with your configuration:
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
SECRET_KEY=your-super-secret-key-change-this-in-production
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

## 🚀 Running the Application

### Start Backend

```bash
cd backend
python main.py
```

The API will be available at `http://localhost:8000`

### Start Frontend

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
second_app/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── config.py              # Configuration management
│   ├── logger.py              # Logging setup
│   ├── requirements.txt        # Python dependencies
│   ├── database/
│   │   └── db.py             # Database connection
│   ├── models/
│   │   ├── user.py           # User model
│   │   └── task.py           # Task model
│   ├── routes/
│   │   ├── auth.py           # Authentication routes
│   │   └── tasks.py          # Task routes
│   └── utils/
│       └── auth.py           # Authentication utilities
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js        # API service
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskItem.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Tasks.js
│   │   ├── App.css           # Global styles
│   │   └── App.js
│   └── package.json
├── .gitignore
├── .env.example
└── README.md
```

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable configuration
- Input validation with Pydantic
- Proper error handling

## 🎨 UI/UX Features

- Dark theme with gradient backgrounds
- Responsive grid layouts
- Smooth animations and transitions
- Real-time form validation
- Character count indicators
- Error message display
- Loading states
- Toast notifications

## 📊 API Endpoints

### Authentication
- `POST /api/signup` - Create new user
- `POST /api/login` - Login user
- `GET /api/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{task_id}` - Update task
- `DELETE /api/tasks/{task_id}` - Delete task

### Health
- `GET /health` - Health check

## 🧪 Testing

### Test Signup/Login
1. Go to signup page
2. Enter name, email, and password
3. Click Sign Up
4. You'll be redirected to dashboard

### Test Task Creation
1. Navigate to Tasks page
2. Enter task title and description
3. Click Create Task
4. Task appears in the list

### Test Analytics
1. Create multiple tasks with different statuses
2. Go to Analytics Dashboard
3. See real-time completion rates

## 🐛 Debugging

### Backend Logs
- Check terminal output for API logs
- Enable verbose logging by setting `ENVIRONMENT=debug`

### Frontend Logs
- Open browser console (F12)
- Check Network tab for API requests
- Use React DevTools for component state

## 📦 Deployment

### Backend (Render, Heroku, etc.)
1. Set environment variables in platform dashboard
2. Ensure PostgreSQL database is configured
3. Deploy from Git repository

### Frontend (Vercel, Netlify, etc.)
1. Set `REACT_APP_API_URL` to production API
2. Deploy from Git repository
3. Enable auto-deployments

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning and development.

## 💬 Support

For issues or questions:
1. Check existing documentation
2. Review error messages
3. Check browser console for frontend errors
4. Check server logs for backend errors

## 🎯 Future Enhancements

- Task categories/labels
- Due dates and reminders
- Task priorities
- Collaboration features
- File attachments
- Email notifications
- Dark/Light theme toggle
- Advanced filtering and sorting

---

**Happy Task Managing! 🎉**
