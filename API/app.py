from fastapi import FastAPI, HTTPException, Path, File, UploadFile
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

# Ruta de almacenamiento para las imágenes
UPLOAD_FOLDER = "./images"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class Illustration(BaseModel):
    name: str
    description: str
    likes: int
    image_path: str

class UpdateLikes(BaseModel):
    new_likes: int

@app.post("/illustrations/")
async def add_illustration(file: UploadFile = File(...), name: str = '', description: str = '', likes: int = 0):
    try:
        # Guardar el archivo
        file_location = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_location, "wb") as f:
            f.write(file.file.read())
        
        # Crear el documento
        illustration_dict = {
            "name": name,
            "description": description,
            "likes": likes,
            "image_path": file_location
        }
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
@app.delete("/illustrations/")
async def delete_all_illustrations():
    try:
        # Obtener todas las ilustraciones
        illustrations = list(collection.find())
        
        # Eliminar las ilustraciones y sus archivos asociados
        for illustration in illustrations:
            if illustration.get("image_path") and os.path.exists(illustration["image_path"]):
                os.remove(illustration["image_path"])
        
        # Eliminar todos los documentos de la colección
        result = collection.delete_many({})
        
        return {"message": f"Deleted {result.deleted_count} illustrations"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting illustrations: {str(e)}")