from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user import User
from utils.auth import create_token
from passlib.context import CryptContext

router = APIRouter()

# ✅ FIXED

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(password)

    user = User(name=name, email=email, password=hashed_password)
    db.add(user)
    db.commit()

    return {"message": "User created"}


@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()

    if not user or not pwd_context.verify(password, user.password):
        return {"error": "Invalid credentials"}

    token = create_token({"user_id": user.id})
    return {"access_token": token}