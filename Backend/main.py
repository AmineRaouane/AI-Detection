from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
from models import AIDetector
from tools import read_video,run_inference,predict_single_sample,AudioCNN
from PIL import Image
import io
import os
import logging
from transformers import VivitForVideoClassification
import torch

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
MAX_FILE_SIZE_MB = 20

async def validate_file_size(request: Request):
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_FILE_SIZE_MB * 1024 * 1024:
        logger.warning("File size exceeds the allowed limit.")
        raise HTTPException(status_code=413, detail="File size exceeds the allowed limit.")

def get_image_detector():
    logger.info("Initializing image detector")
    return AIDetector('image')

def get_text_detector():
    logger.info("Initializing text detector")
    return AIDetector('text')

def get_audio_detector():
    logger.info("Initializing audio detection model")
    model = AudioCNN(num_classes=2)
    model_path = "./audio_cnn.pth"
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model

def get_video_detector():
    logger.info("Loading video detection model")
    model = VivitForVideoClassification.from_pretrained("R1Amine/VideoAiDetection")
    return model

app = FastAPI(title="Multi-File API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting API service")
    load_dotenv(find_dotenv())
    if not os.getenv("TOKEN"):
        logger.error("TOKEN environment variable not found")
        raise RuntimeError("TOKEN environment variable is required")

@app.post("/detect/image")
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    detector: AIDetector = Depends(get_image_detector)
    ):
    logger.info(f"Received image file: {file.filename}")
    await validate_file_size(request)
    if not file.content_type.startswith("image/"):
        logger.warning("Uploaded file is not an image")
        raise HTTPException(status_code=400, detail="Uploaded file is not an image file")
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        result = detector.process(image)
        logger.info("Image processed successfully")
        return {"data" : result[0]}
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/detect/text")
async def upload_text(
        file: str = Body(..., embed=True),
        detector: AIDetector = Depends(get_text_detector)
    ):
    logger.info("Received text data")
    if not file:
        logger.warning("No text content provided")
        raise HTTPException(status_code=400, detail="No text content provided")
    try:
        result = detector.process(file)
        logger.info("Text processed successfully")
        return {"data": result[0]}
    except Exception as e:
        logger.error(f"Error processing text: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing text: {str(e)}")

@app.post("/detect/audio")
async def upload_audio(
        file: UploadFile = File(...),
        model: AudioCNN = Depends(get_audio_detector)
    ):
    logger.info(f"Received audio file: {file.filename}")
    if not file.content_type.startswith("audio/"):
        logger.warning("Uploaded file is not an audio file")
        raise HTTPException(status_code=400, detail="Uploaded file is not an audio file")
    try:
        contents = await file.read()
        result = predict_single_sample(model, io.BytesIO(contents))
        logger.info("Audio processed successfully")
        return {"data": result}
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")

@app.post("/detect/video")
async def upload_video(
        file: UploadFile = File(...),
        model: VivitForVideoClassification = Depends(get_video_detector)
    ):
    logger.info(f"Received video file: {file.filename}")
    if file.content_type is None or not file.content_type.startswith("video/"):
        logger.warning("Uploaded file is not a video file")
        raise HTTPException(status_code=400, detail="Uploaded file is not a video file")
    try:
        contents = await file.read()
        video = read_video(io.BytesIO(contents))
        result = run_inference(model, video)
        logger.info("Video processed successfully")
        return {"data": result}
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "Multi-File API is running. Use the respective endpoints to upload image, audio, text, or video files."}
