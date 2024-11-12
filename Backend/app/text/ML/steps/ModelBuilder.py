import pandas as pd
from transformers import BertTokenizer, BertForSequenceClassification, TrainingArguments, Trainer
from app.utils.Functions import compute_metrics
import logging
logger = logging.getLogger(__name__)

def model_initializer(
    model_str: str = 'bert-base-uncased',
    num_labels: int = 2
) -> dict:
    try:
        if num_labels < 2:
            raise ValueError("num_labels should be greater than 1")

        model = BertForSequenceClassification.from_pretrained(
            model_str,
            num_labels=num_labels,
            problem_type="single_label_classification"
        )

        logger.info(f"Model initialized with model {model_str}.")
        return model,tokenizer

    except Exception as e:
        logger.error(f"Error initializing model: {e}")
        return None

def training_arguments_initializer(
    params: Dict[str, Any] = None,
    output_dir: str = 'app/text/Data/outputs'
) -> TrainingArguments:
    default_params = {
        'num_train_epochs': 10,
        'weight_decay': 0.02,
        'warmup_steps': 50,
        'learning_rate': 1e-6,
    }

    if params:
        default_params.update(params)

    try:
        training_args = TrainingArguments(
            output_dir=output_dir,
            learning_rate=default_params['learning_rate'],
            num_train_epochs=default_params['num_train_epochs'],
            per_device_train_batch_size=8,
            per_device_eval_batch_size=8,
            warmup_ratio=0.1,
            weight_decay=default_params['weight_decay'],
            warmup_steps=default_params['warmup_steps'],
            logging_dir='app/text/Data/loggers',
            logging_steps=100,
            evaluation_strategy="steps",
            eval_steps=500,
            save_strategy="steps",
            save_steps=500,
            load_best_model_at_end=True,
            metric_for_best_model='f1',
            push_to_hub=False,
        )
        logging.info("Training arguments initialized.")
        return training_args
    except Exception as e:
        logging.error(f"Error initializing TrainingArguments: {e}")
        raise

def trainer_initializer(
    model,
    args,
    train_data,
    test_data
) -> Trainer:
    try:
        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_data,
            eval_dataset=test_data,
            compute_metrics=compute_metrics,
        )
        logger.info("Trainer initialized.")
        return trainer

    except Exception as e:
        logger.error(f"Error initializing Trainer: {e}")
        return None
