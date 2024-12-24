from transformers import pipeline
from abc import ABC, abstractmethod
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

class AIDetector:
    def __init__(self,categorie):
        self.pipe = pipeline(
            f"{categorie.lower()}-classification",
            model=f"R1Amine/{categorie.capitalize()}AiDetection",
            token=os.getenv("TOKEN")
        )
    def process(self, file):
        return self.pipe(file)
