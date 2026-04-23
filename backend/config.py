"""
Configuration management for the application.
Loads environment variables and provides configuration settings.
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    
    @classmethod
    def is_production(cls):
        return cls.ENVIRONMENT == "production"
    
    @classmethod
    def is_development(cls):
        return cls.ENVIRONMENT == "development"
