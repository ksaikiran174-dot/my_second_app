from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user import User
from utils.auth import create_token, verify_token
from passlib.context import CryptContext
from pydantic import BaseModel

router = APIRouter()

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

# Pydantic models for validation
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Validate password strength
    if len(request.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters"
        )
    
    hashed_password = pwd_context.hash(request.password)
    user = User(name=request.name, email=request.email, password=hashed_password)
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Return JWT token immediately after signup
    token = create_token({"user_id": user.id})
    return {
        "message": "User created successfully",
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not pwd_context.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_token({"user_id": user.id})
    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@router.get("/me")
def get_current_user(payload: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = payload.get("user_id")
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }