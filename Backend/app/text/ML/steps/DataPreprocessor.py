import pandas as pd

import logging
logger = logging.getLogger(__name__)

def preprocess_data(
    df: pd.DataFrame,
    model_str: str = 'bert-base-uncased',
    MaxLength: int = 14200
) -> pd.DataFrame:
    tokenizer = BertTokenizer.from_pretrained(model_str)
    df.drop('model',axis=1,inplace=True)
    def preprocess_function(examples):
        return tokenizer(examples['data'], truncation=True, padding='max_length', max_length=MaxLength)
    df['data'] = df['data'].apply(preprocess_function)
    tokenized_datasets = Dataset.from_pandas(df)
    logger.info(f"Dataset processed and tokenized with {MaxLength} max length!")
    return tokenized_datasets
