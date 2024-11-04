from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch

app = FastAPI(title="Image Classification API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_service = None

@app.on_event("startup")
async def startup_event():
    global model_service
    try:
        model_service = ModelService()
    except Exception as e:
        print(f"Failed to load model: {e}")
        raise

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, content="No file provided")
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, content="File must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        result = model_service.predict(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    if model_service is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    return {"status": "healthy", "model_loaded": True}

@app.get("/")
async def root():
    return {"message": "Image Classification API is running. Use POST /predict with an image file to get predictions."}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
