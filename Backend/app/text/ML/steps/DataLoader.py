import pandas as pd
from datasets import load_dataset

import logging
logger = logging.getLogger(__name__)

def load_data(
) -> pd.DataFrame:
    ds = load_dataset("ahmadreza13/human-vs-Ai-generated-dataset")
    df = ds['train'].to_pandas()
    logger.info(f"Dataset with {len(df)} texts loaded!")
    return df
