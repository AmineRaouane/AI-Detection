from transformers import ViTImageProcessor,ViTForImageClassification,pipeline
from abc import ABC, abstractmethod
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

class AIDetector(ABC):

    def __init__(self):
        self.TOKEN = os.getenv("TOKEN")

    @abstractmethod
    def process(self, file):
        pass

class ImageDetector(AIDetector):
    def process(self, file):
        pipe = pipeline("image-classification", model="R1Amine/ImageAiDetection", token=self.TOKEN)
        return pipe(file)


class AudioDetector(AIDetector):
    def process(self, file):
        pass

class TextDetector(AIDetector):
    def process(self, file):
        pass

class VideoDetector(AIDetector):
    def process(self, file):
        pass
