from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
from models import AIDetector
from tools import read_video,run_inference
from PIL import Image
import io
import tempfile
import os
import logging
from transformers import VivitForVideoClassification

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
MAX_FILE_SIZE_MB = 10

async def validate_file_size(request: Request):
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File size exceeds the allowed limit.")

def get_image_detector():
    return AIDetector('image')

def get_text_detector():
    return AIDetector('text')

def get_audio_detector():
    return AIDetector('audio')

def get_video_detector():
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
    await validate_file_size(request)
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image file")
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        result = detector.process(image)
        return {
            "data" : result[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


@app.post("/detect/text")
async def upload_text(
        file: str = Body(..., embed=True),
        detector: AIDetector = Depends(get_text_detector)
    ):
    if not file:
        raise HTTPException(status_code=400, detail="No text content provided")
    try:
        result = detector.process(file)
        return {
            "data": result[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing text: {str(e)}")


@app.post("/detect/audio")
async def upload_audio(
        file: UploadFile = File(...),
        detector: AIDetector = Depends(get_audio_detector)
    ):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an audio file")
    try:
        contents = await file.read()
        result = detector.process(contents)
        return {
            "data": result[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")

@app.post("/detect/video")
async def upload_video(
        file: UploadFile = File(...),
        model: VivitForVideoClassification = Depends(get_video_detector)
    ):
    if file.content_type is None or not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not a video file")
    try:
        # with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        #     contents = await file.read()
        #     temp_video.write(contents)
        #     temp_video_path = temp_video.name
        contents = await file.read()
        video = read_video(io.BytesIO(contents))
        result = run_inference(model, video)
        return {"data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")
# @app.post("/detect/video")
# async def upload_video(
#         file: UploadFile = File(...),
#         detector: AIDetector = Depends(get_video_detector)
#     ):
#     # Validate file type
#     if file.content_type is None or not file.content_type.startswith("video/"):
#         raise HTTPException(status_code=400, detail="Uploaded file is not a video file")

#     try:
#         # Create temporary file
#         with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
#             contents = await file.read()
#             temp_video.write(contents)
#             temp_video_path = temp_video.name

#         logger.info(f"Processing video file at: {temp_video_path}")
#         result = detector.process(temp_video_path)

#         # Clean up temporary file
#         os.unlink(temp_video_path)

#         return {"data": result[0]}
#     except Exception as e:
#         logger.error(f"Error processing video: {str(e)}")
#         # Clean up temporary file in case of error
#         if 'temp_video_path' in locals():
#             os.unlink(temp_video_path)
#         raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")



@app.post("/test")
async def test(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")
    try:
        contents = await file.read()
        return {
            "message": "File received successfully",
            "filename": file.filename,
            "content_type": file.content_type,
            "contents": contents
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Multi-File API is running. Use the respective endpoints to upload image, audio, text, or video files."}
