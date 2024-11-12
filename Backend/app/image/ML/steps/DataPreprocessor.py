from typing import List, Optional, Tuple
from typing_extensions import Annotated
from torchvision.transforms import (
    Compose,
    Normalize,
    Resize,
    RandomRotation,
    RandomAdjustSharpness,
    ToTensor
)
import gc
from imblearn.over_sampling import RandomOverSampler

import logging
logger = logging.getLogger(__name__)

def sample_data(
    df: pd.DataFrame,
    random_state: int = 91
) -> pd.DataFrame:
    ros = RandomOverSampler(random_state=random_state)
    df['label'] = df['label'].map({'real': 'REAL', 'fake-v2': 'FAKE'})
    df, y_resampled = ros.fit_resample(df.drop(columns=['label']), df['label'])
    df['label'] = y_resampled
    del y_resampled
    gc.collect()
    info = ', \n'.join([f'{category}: {count} rows' for category, count in df['label'].value_counts().items()])
    logger.info(f"Dataset sampled \n {info}")
    return df

def compose_data(
    image_mean: list,
    image_std: list,
    size: int,
    rotate: int = 90,
    sharpness: int = 2
) -> Tuple:
    normalizer = Normalize(mean=image_mean, std=image_std)
    train_transformer = Compose([
        Resize((size, size)),
        RandomRotation(rotate),
        RandomAdjustSharpness(sharpness),
        ToTensor(),
        normalizer
    ])
    val_transformer = Compose([
        Resize((size, size)),
        ToTensor(),
        normalizer
    ])

    def train_transforms(examples):
        examples['pixel_values'] = [train_transformer(image.convert("RGB")) for image in examples['image']]
        return examples

    def val_transforms(examples):
        examples['pixel_values'] = [val_transformer(image.convert("RGB")) for image in examples['image']]
        return examples

    logger.info("Data transformations composed for training and validation!")
    return train_transforms, val_transforms
