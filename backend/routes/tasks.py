from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.task import Task
from utils.auth import verify_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks")
def create_task(title: str, description: str, db: Session = Depends(get_db), user=Depends(verify_token)):
    new_task = Task(
        title=title,
        description=description,
        status="pending",
        user_id=user["user_id"]
    )

    db.add(new_task)
    db.commit()
    return {"message": "Task created"}

@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db), user=Depends(verify_token)):
    tasks = db.query(Task).filter(Task.user_id == user["user_id"]).all()
    return tasks

@router.put("/tasks/{task_id}")
def update_task(task_id: int, title: str, description: str, status: str,
                db: Session = Depends(get_db), user=Depends(verify_token)):

    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user["user_id"]).first()

    if not task:
        return {"error": "Task not found"}

    task.title = title
    task.description = description
    task.status = status

    db.commit()
    return {"message": "Task updated"}

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user=Depends(verify_token)):

    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user["user_id"]).first()

    if not task:
        return {"error": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}