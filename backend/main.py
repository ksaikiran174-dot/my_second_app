from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from database.db import Base, engine
from models import user, task
from routes import auth, tasks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router , prefix="/api")
app.include_router(tasks.router)
