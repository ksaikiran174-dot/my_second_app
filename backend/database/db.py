from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import hashlib
from config import Config

DATABASE_URL = Config.DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

