from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.task import Task
from utils.auth import verify_token
from pydantic import BaseModel, field_validator
from typing import List, Optional
from logger import setup_logger

logger = setup_logger(__name__)
router = APIRouter()

# Pydantic models for validation
class TaskCreate(BaseModel):
    """Task creation request model"""
    title: str
    description: str = ""
    
    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Title cannot be empty')
        if len(v) < 3:
            raise ValueError('Title must be at least 3 characters')
        if len(v) > 200:
            raise ValueError('Title must be less than 200 characters')
        return v.strip()
    
    @field_validator('description')
    @classmethod
    def description_validation(cls, v):
        if len(v) > 1000:
            raise ValueError('Description must be less than 1000 characters')
        return v

class TaskUpdate(BaseModel):
    """Task update request model"""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    
    @field_validator('title')
    @classmethod
    def title_validation(cls, v):
        if v is not None:
            if len(v.strip()) == 0:
                raise ValueError('Title cannot be empty')
            if len(v) < 3:
                raise ValueError('Title must be at least 3 characters')
            if len(v) > 200:
                raise ValueError('Title must be less than 200 characters')
            return v.strip()
        return v
    
    @field_validator('status')
    @classmethod
    def status_validation(cls, v):
        if v is not None and v not in ["pending", "in progress", "done"]:
            raise ValueError('Status must be one of: pending, in progress, done')
        return v

class TaskResponse(BaseModel):
    """Task response model"""
    id: int
    title: str
    description: str
    status: str
    user_id: int
    
    class Config:
        from_attributes = True

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks", status_code=status.HTTP_201_CREATED, response_model=dict)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    """Create a new task"""
    try:
        new_task = Task(
            title=task.title,
            description=task.description,
            status="pending",
            user_id=user["user_id"]
        )
        
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        
        logger.info(f"Task created: {new_task.id} by user {user['user_id']}")
        return {
            "message": "Task created successfully",
            "task": {
                "id": new_task.id,
                "title": new_task.title,
                "description": new_task.description,
                "status": new_task.status
            }
        }
    except Exception as e:
        logger.error(f"Error creating task: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create task"
        )

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db), user=Depends(verify_token)):
    """Get all tasks for authenticated user"""
    try:
        tasks = db.query(Task).filter(Task.user_id == user["user_id"]).all()
        logger.info(f"Retrieved {len(tasks)} tasks for user {user['user_id']}")
        return tasks
    except Exception as e:
        logger.error(f"Error fetching tasks: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch tasks"
        )

@router.put("/tasks/{task_id}", response_model=dict)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    """Update a task"""
    try:
        db_task = db.query(Task).filter(
            Task.id == task_id,
            Task.user_id == user["user_id"]
        ).first()

        if not db_task:
            logger.warning(f"Task not found: {task_id} for user {user['user_id']}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        if task.title is not None:
            db_task.title = task.title
        if task.description is not None:
            db_task.description = task.description
        if task.status is not None:
            db_task.status = task.status

        db.commit()
        db.refresh(db_task)
        
        logger.info(f"Task updated: {task_id} by user {user['user_id']}")
        return {
            "message": "Task updated successfully",
            "task": {
                "id": db_task.id,
                "title": db_task.title,
                "description": db_task.description,
                "status": db_task.status
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating task: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update task"
        )

@router.delete("/tasks/{task_id}", response_model=dict)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    """Delete a task"""
    try:
        db_task = db.query(Task).filter(
            Task.id == task_id,
            Task.user_id == user["user_id"]
        ).first()

        if not db_task:
            logger.warning(f"Task not found for deletion: {task_id} for user {user['user_id']}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        db.delete(db_task)
        db.commit()
        
        logger.info(f"Task deleted: {task_id} by user {user['user_id']}")
        return {"message": "Task deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting task: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete task"
        )
