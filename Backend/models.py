from transformers import ViTImageProcessor,ViTForImageClassification,pipeline
from abc import ABC, abstractmethod
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
IMAGE_AI_DETECTION = os.getenv("IMAGE_AI_DETECTION")

class AIDetector(ABC):
    @abstractmethod
    def process(self, file):
        pass

class ImageDetector(AIDetector):
    def __init__(self,model_name="R1Amine/ImageAiDetection"):
        self.model = ViTForImageClassification.from_pretrained(
            model_name, use_auth_token = IMAGE_AI_DETECTION
        )
        self.processor = ViTImageProcessor.from_pretrained(
            model_name, use_auth_token = IMAGE_AI_DETECTION
        )
        self.pipeline = pipeline(
            'image-classification',
            model=self.model,
            image_processor=self.processor,
            device=-1
        )
    def process(self, file):
        return self.pipeline(file)


class AudioDetector(AIDetector):
    def process(self, file):
        pass

class TextDetector(AIDetector):
    def process(self, file):
        pass

class VideoDetector(AIDetector):
    def process(self, file):
        pass
