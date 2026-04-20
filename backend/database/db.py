from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import hashlib

DATABASE_URL = "postgresql://postgres:Kiran*12@localhost:5432/taskdb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

