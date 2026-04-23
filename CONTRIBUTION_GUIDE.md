# Contributing Guide

Thank you for your interest in contributing to the Task Management Application! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Ask questions if unclear
- Help others succeed

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/task-management.git
cd task-management
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Set Up Development Environment

```bash
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

## Development Workflow

### Backend Development

1. **Code Style**
   - Follow PEP 8
   - Use type hints
   - Add docstrings to functions

```python
def create_task(title: str, description: str) -> dict:
    """Create a new task and return task data."""
    # Implementation
    pass
```

2. **Testing**
   - Write tests for new features
   - Ensure existing tests pass
   - Test error cases

3. **Commit Messages**
   - Clear, descriptive messages
   - Use imperative mood

```
git commit -m "Add task status filter feature"
git commit -m "Fix API validation error message"
```

### Frontend Development

1. **Code Style**
   - Follow ESLint rules
   - Use meaningful variable names
   - Avoid console.log in production code

2. **React Best Practices**
   - Use functional components
   - Use hooks appropriately
   - Memoize expensive calculations

3. **Testing**
   - Test component rendering
   - Test user interactions
   - Test API integration

## Feature Development

### Adding a New Feature

1. **Plan**
   - Discuss with maintainers
   - Check existing issues/PRs
   - Design API changes

2. **Backend Changes**
   - Add/modify routes
   - Update database models
   - Add validation
   - Write tests

3. **Frontend Changes**
   - Update API service
   - Create/modify components
   - Update styling
   - Add error handling

4. **Documentation**
   - Update README if needed
   - Add code comments
   - Document new endpoints

### Example: Add Task Priority Feature

```python
# Backend: models/task.py
class Task(Base):
    __tablename__ = "tasks"
    priority = Column(String, default="medium")  # low, medium, high

# Backend: routes/tasks.py
class TaskCreate(BaseModel):
    title: str
    description: str = ""
    priority: str = "medium"

# Frontend: components/TaskForm.js
<select value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="low">Low Priority</option>
    <option value="medium">Medium Priority</option>
    <option value="high">High Priority</option>
</select>
```

## Testing

### Backend Testing

```bash
# Install pytest
pip install pytest

# Create test file: backend/test_routes.py
import pytest
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

# Run tests
pytest backend/test_routes.py
```

### Frontend Testing

```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Create test file: frontend/src/__tests__/TaskForm.test.js
import { render, screen } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

test('renders task form', () => {
    render(<TaskForm loadTasks={() => {}} />);
    expect(screen.getByPlaceholderText(/Enter task title/i)).toBeInTheDocument();
});

# Run tests
npm test
```

## Performance Optimization

### Backend Optimization

1. **Database Queries**
   - Use indexes
   - Avoid N+1 queries
   - Use pagination

2. **Caching**
   ```python
   from functools import lru_cache
   
   @lru_cache(maxsize=128)
   def expensive_operation(param):
       pass
   ```

3. **Async Operations**
   ```python
   @router.get("/tasks")
   async def get_tasks(db: Session = Depends(get_db)):
       tasks = await db.query(Task).all()
       return tasks
   ```

### Frontend Optimization

1. **Component Memoization**
   ```javascript
   const TaskItem = React.memo(({ task, onUpdate }) => {
       return <div>{task.title}</div>;
   });
   ```

2. **Lazy Loading**
   ```javascript
   const Dashboard = lazy(() => import('./Dashboard'));
   ```

3. **Code Splitting**
   ```javascript
   <Suspense fallback={<Loading />}>
       <Dashboard />
   </Suspense>
   ```

## Debugging

### Backend Debugging

```python
# Using print for debugging
print(f"Task created: {task.id}")

# Using debugger
import pdb; pdb.set_trace()

# Using logging
import logging
logger = logging.getLogger(__name__)
logger.info("Task created successfully")
```

### Frontend Debugging

```javascript
// Browser console
console.log("Task data:", taskData);

// React DevTools
// Install browser extension for React DevTools

// Network tab
// Check API requests and responses
```

## Pull Request Process

1. **Before Submitting**
   - Pull latest main branch
   - Test all changes
   - Run linter/formatter
   - Update tests if needed

2. **Submit PR**
   - Clear title and description
   - Reference related issues
   - Include screenshots if UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   Describe how to test these changes
   
   ## Screenshots (if applicable)
   Add screenshots of UI changes
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   ```

4. **Code Review**
   - Respond to feedback
   - Make requested changes
   - Push updates to same branch

## Documentation Standards

### Code Comments

```python
# Good: Explains WHY, not WHAT
# Skip invalid records to prevent validation errors
if not is_valid(record):
    continue

# Avoid: Redundant comments
# Increment counter
counter += 1
```

### Docstrings

```python
def create_task(title: str, description: str, db: Session) -> dict:
    """
    Create a new task for the authenticated user.
    
    Args:
        title: Task title (required)
        description: Task description (optional)
        db: Database session
        
    Returns:
        Dictionary with created task data
        
    Raises:
        ValueError: If title is empty
        HTTPException: If database operation fails
    """
```

## Reporting Issues

### Bug Report Template

```markdown
## Describe the Bug
Clear description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: (if frontend)
- Python version: (if backend)
```

### Feature Request Template

```markdown
## Description
What would you like to add?

## Use Case
Why is this needed?

## Proposed Solution
How should it work?

## Alternatives
Other possible solutions?
```

## Development Tips

### Useful Commands

```bash
# Backend
python main.py                          # Start server
pip install -r requirements.txt        # Install dependencies
python -m pytest backend/              # Run tests

# Frontend
npm start                               # Start dev server
npm run build                           # Create production build
npm test                                # Run tests
npm run lint                            # Check code style
```

### Database Debugging

```bash
# SQLite
sqlite3 database.db ".tables"           # List tables
sqlite3 database.db "SELECT * FROM users;" # Query data

# PostgreSQL
psql -U username dbname                 # Connect
\dt                                     # List tables
SELECT * FROM users;                    # Query data
```

## Getting Help

1. **Ask Questions**
   - Use discussions/issues
   - Be specific about the problem
   - Include error messages

2. **Find Resources**
   - Check existing issues
   - Review documentation
   - Search Stack Overflow

3. **Contact Maintainers**
   - @mention maintainers on PR
   - Send detailed description

## Recognition

- Contributors will be listed in README
- Acknowledge your help in commits
- Thank you for contributing! 🙏

---

**Happy coding! Let's build something awesome together!**
