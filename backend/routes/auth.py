from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user import User
from utils.auth import create_token, verify_token
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, field_validator
from logger import setup_logger

logger = setup_logger(__name__)
router = APIRouter()

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

# Pydantic models for validation
class SignupRequest(BaseModel):
    """User signup request model"""
    name: str
    email: EmailStr
    password: str
    
    @field_validator('name')
    @classmethod
    def name_not_empty(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Name cannot be empty')
        if len(v) < 2:
            raise ValueError('Name must be at least 2 characters')
        if len(v) > 50:
            raise ValueError('Name must be less than 50 characters')
        return v.strip()
    
    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        if len(v) > 100:
            raise ValueError('Password must be less than 100 characters')
        return v

class LoginRequest(BaseModel):
    """User login request model"""
    email: EmailStr
    password: str

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """Create a new user account"""
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            logger.warning(f"Signup attempt with existing email: {request.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password and create user
        hashed_password = pwd_context.hash(request.password)
        user = User(name=request.name, email=request.email, password=hashed_password)
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create JWT token
        token = create_token({"user_id": user.id})
        
        logger.info(f"User created successfully: {user.email}")
        return {
            "message": "User created successfully",
            "access_token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )

@router.post("/login", status_code=status.HTTP_200_OK)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """User login endpoint"""
    try:
        user = db.query(User).filter(User.email == request.email).first()

        if not user or not pwd_context.verify(request.password, user.password):
            logger.warning(f"Failed login attempt: {request.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        token = create_token({"user_id": user.id})
        logger.info(f"User logged in: {user.email}")
        return {
            "access_token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to login"
        )

@router.get("/me")
def get_current_user(payload: dict = Depends(verify_token), db: Session = Depends(get_db)):
    """Get current authenticated user"""
    try:
        user_id = payload.get("user_id")
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            logger.warning(f"User not found: {user_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get current user error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user"
        )

  