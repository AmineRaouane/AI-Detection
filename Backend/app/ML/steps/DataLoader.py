from app.Data.DataDownloader import download_kaggle_dataset
import os
import pandas as pd
from datasets import Dataset, ClassLabel, Image
import PIL
PIL.Image.MAX_IMAGE_PIXELS = 1e9
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

import logging
logger = logging.getLogger(__name__)

def load_data(
) -> pd.DataFrame:
    directory = download_kaggle_dataset()
    file_names = []
    labels = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            path = os.path.join(root, file)
            if path.endswith(('png', 'jpg')):
                file_names.append(path)
                labels.append(path.split('/')[-2])
    df = pd.DataFrame({"image": file_names, "label": labels})
    logger.info(f"Dataset with {len(df)} images loaded!")
    return df


def create_data(
    df: pd.DataFrame
) -> Dataset:
    dataset = Dataset.from_pandas(df).cast_column("image", Image())
    class_labels = ClassLabel(num_classes=2, names=['REAL', 'FAKE'])

    def map_label2id(example):
        example['label'] = class_labels.str2int(example['label'])
        return example

    dataset = dataset.map(map_label2id, batched=True)
    dataset = dataset.cast_column('label', class_labels)
    logger.info("Dataset created and labels mapped!")
    return dataset
