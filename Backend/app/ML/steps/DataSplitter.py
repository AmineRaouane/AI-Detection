from typing import Tuple
from datasets import Dataset

import logging
logger = logging.getLogger(__name__)

def split_data(
    dataset: Dataset,
    test_size: float = 0.2
) -> Tuple[Dataset, Dataset]:
    split_data = dataset.train_test_split(test_size=test_size, shuffle=True, stratify_by_column="label")

    logger.info("Dataset split into train and test sets!")
    return split_data['train'], split_data['test']
