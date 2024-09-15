from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel
from typing import List
from bson import ObjectId
from pymongo import MongoClient
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:5173",  # Añade aquí el dominio de tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client["gallery"]
collection = db["illustrations"]

class Illustration(BaseModel):
    name: str
    description: str
    likes: int
    image_path: str

class UpdateLikes(BaseModel):
    new_likes: int

@app.post("/illustrations/")
async def add_illustration(illustration: Illustration):
    try:
        illustration_dict = illustration.dict()
        illustration_id = collection.insert_one(illustration_dict).inserted_id
        return {"message": "Illustration added", "id": str(illustration_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving illustration: {str(e)}")

@app.get("/illustrations/")
async def get_illustrations():
    illustrations = list(collection.find())
    for illustration in illustrations:
        illustration["_id"] = str(illustration["_id"])
    return illustrations

@app.get("/illustrations/{illustration_id}")
async def get_illustration(illustration_id: str):
    illustration = collection.find_one({"_id": ObjectId(illustration_id)})
    if illustration:
        illustration["_id"] = str(illustration["_id"])
        return illustration
    raise HTTPException(status_code=404, detail="Illustration not found")

@app.put("/illustrations/{illustration_id}/likes")
async def update_likes(illustration_id: str, update_data: UpdateLikes):
    result = collection.update_one({"_id": ObjectId(illustration_id)}, {"$set": {"likes": update_data.new_likes}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Illustration not found")
    return {"message": "Likes updated"}

@app.delete("/illustrations/{illustration_id}")
async def delete_illustration(illustration_id: str):
    illustration = collection.find_one({"_id": ObjectId(illustration_id)})
    if illustration:
        if illustration.get("image_path") and os.path.exists(illustration["image_path"]):
            os.remove(illustration["image_path"])
        collection.delete_one({"_id": ObjectId(illustration_id)})
        return {"message": "Illustration deleted"}
    raise HTTPException(status_code=404, detail="Illustration not found")
