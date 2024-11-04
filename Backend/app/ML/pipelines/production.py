from PIL import Image
import io
import torch
import os
import json
from typing import Dict, Any
from transformers import ViTImageProcessor,ViTForImageClassification

class ModelService:
    def __init__(self, model_dir: str = "app/Data/models"):
        model_folders = [f for f in os.listdir(model_dir) if f.startswith("best_model_")]
        if not model_folders:
            raise RuntimeError("No model found in the models directory")
        latest_model = sorted(model_folders)[-1]
        model_path = os.path.join(model_dir, latest_model)
        training_args_path = os.path.join(model_path, "training_args.json")
        with open(training_args_path, 'r') as f:
            self.training_args = json.load(f)
        self.image_processor = ViTImageProcessor.from_pretrained(model_path)
        self.model = ViTForImageClassification..from_pretrained(model_path)

    @torch.no_grad()
    def predict(self, image: Image.Image) -> Dict[str, Any]:
        inputs = self.image_processor(image, return_tensors="pt")
        logits = self.model(**inputs).logits
        predicted_label = logits.argmax(-1).item()
        response = self.model.config.id2label[predicted_label]
        return response
