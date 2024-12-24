from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from models import AIDetector
from PIL import Image
import io
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
    return AIDetector('video')


app = FastAPI(title="Multi-File API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.post("/upload/text")
async def upload_text(
        file: str = Body(...),
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


@app.post("/upload/audio")
async def upload_audio(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an audio file")
    try:
        contents = await file.read()
        #todo Processing
        return {"message": "Audio file received successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")


@app.post("/upload/video")
async def upload_video(file: UploadFile = File(...)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not a video file")
    try:
        contents = await file.read()
        #todo Processing
        return {"message": "Video file received successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")


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
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Multi-File API is running. Use the respective endpoints to upload image, audio, text, or video files."}
