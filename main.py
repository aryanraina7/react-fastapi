from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
    
# Initialize the FastAPI app
app = FastAPI()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],  # Change "*" to specific domains later for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
    
# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory database
users_db = {}
    
# Request Models
class User(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    username: str   
    email: str
    
# Root route (for testing)
@app.get("/")
def read_root(): 
    return {"message": "Welcome to my FastAPI application!"}

# Sign-Up API
@app.post("/signup", response_model=UserOut)
def sign_up(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user.password)
    users_db[user.email] = {"username": user.username, "email": user.email, "password": hashed_password}
    return {"username": user.username, "email": user.email}
    
# Sign-In API
@app.post("/signin")
# def sign_in(email: str, password: str):
def sign_in(user: User):
    user = users_db.get(user.email)
    if not user or not pwd_context.verify(user.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": f"Welcome back, {user['username']}!"}
    
# List Users API
@app.get("/users", response_model=List[UserOut])
def list_users():
    return [UserOut(username=user["username"], email=user["email"]) for user in users_db.values()]

