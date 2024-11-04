import torch
from transformers import (
    ViTImageProcessor,
    ViTForImageClassification,
    TrainingArguments,
    Trainer
)
from app.utils.Functions import compute_metrics,collate_fn
import logging
logger = logging.getLogger(__name__)

def model_initializer(
    model_str: str = 'google/vit-base-patch16-224-in21k',
    id2label: dict = None,
    label2id: dict = None,
    num_labels: int = 2
) -> dict:
    try:
        if num_labels < 2:
            raise ValueError("num_labels should be greater than 1")

        processor = ViTImageProcessor.from_pretrained(model_str)
        image_mean = processor.image_mean
        image_std = processor.image_std
        size = processor.size['height']

        model = ViTForImageClassification.from_pretrained(
            model_str,
            num_labels=num_labels
        )
        model.config.id2label = id2label or {i: f"Label_{i}" for i in range(num_labels)}
        model.config.label2id = label2id or {v: k for k, v in model.config.id2label.items()}

        logger.info(f"Model and processor initialized with model {model_str}.")
        return {"model": model, "processor": processor, "image_mean": image_mean, "image_std": image_std, "size": size}

    except Exception as e:
        logger.error(f"Error initializing model: {e}")
        return None

def training_arguments_initializer(
    params: Dict[str, Any] = None,
    output_dir: str = 'app/Data/outputs'
) -> TrainingArguments:
    default_params = {
        'learning_rate': 1e-6,
        'num_train_epochs': 10,
        'weight_decay': 0.02,
        'warmup_steps': 50,
        'per_device_train_batch_size': 64,
    }

    if params:
        default_params.update(params)

    try:
        training_args = TrainingArguments(
            output_dir=output_dir,
            evaluation_strategy="epoch",
            learning_rate=default_params['learning_rate'],
            per_device_train_batch_size=default_params['per_device_train_batch_size'],
            per_device_eval_batch_size=32,
            num_train_epochs=default_params['num_train_epochs'],
            weight_decay=default_params['weight_decay'],
            warmup_steps=default_params['warmup_steps'],
            remove_unused_columns=False,
            save_strategy='epoch',
            load_best_model_at_end=True,
            save_total_limit=1,
            report_to="mlflow"
        )
        logging.info("Training arguments initialized.")
        return training_args
    except Exception as e:
        logging.error(f"Error initializing TrainingArguments: {e}")
        raise

def trainer_initializer(
    model_data: dict,
    args: TrainingArguments,
    train_data,
    test_data
) -> Trainer:
    try:
        trainer = Trainer(
            model=model_data["model"],
            args=args,
            train_dataset=train_data,
            eval_dataset=test_data,
            data_collator=collate_fn,
            compute_metrics=compute_metrics,
            tokenizer=model_data["processor"],
        )
        logger.info("Trainer initialized.")
        return trainer

    except Exception as e:
        logger.error(f"Error initializing Trainer: {e}")
        return None
