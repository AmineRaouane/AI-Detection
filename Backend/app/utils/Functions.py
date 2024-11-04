import torch
import logging
import evaluate
from sklearn.metrics import roc_auc_score, confusion_matrix
import numpy as np
import mlflow
from typing import Dict, Any

import logging
logger = logging.getLogger(__name__)

def collate_fn(examples: list) -> dict:
    try:
        pixel_values = torch.stack([example["pixel_values"] for example in examples])
        labels = torch.tensor([example['label'] for example in examples])
        logger.info("Collate function applied to batch.")
        return {"pixel_values": pixel_values, "labels": labels}

    except Exception as e:
        logger.error(f"Error in collate_fn: {e}")
        raise e

def compute_metrics(eval_pred) -> Dict[str, Any]:
    try:
        accuracy = evaluate.load("accuracy")
        precision = evaluate.load("precision")
        recall = evaluate.load("recall")
        f1 = evaluate.load("f1")

        predictions = eval_pred.predictions
        label_ids = eval_pred.label_ids
        predicted_labels = predictions.argmax(axis=1)

        metrics = {
            "accuracy": accuracy.compute(predictions=predicted_labels, references=label_ids)['accuracy'],
            "precision": precision.compute(predictions=predicted_labels, references=label_ids, average="binary")['precision'],
            "recall": recall.compute(predictions=predicted_labels, references=label_ids, average="binary")['recall'],
            "f1": f1.compute(predictions=predicted_labels, references=label_ids, average="binary")['f1'],
        }

        try:
            metrics["auc"] = roc_auc_score(label_ids, predictions[:, 1])
        except (ValueError, IndexError) as e:
            logger.warning(f"Could not compute AUC score: {e}")
            metrics["auc"] = None
        try:
            cm = confusion_matrix(label_ids, predicted_labels)
            metrics.update({
                "true_negatives": cm[0][0],
                "false_positives": cm[0][1],
                "false_negatives": cm[1][0],
                "true_positives": cm[1][1]
            })

            metrics["specificity"] = cm[0][0] / (cm[0][0] + cm[0][1]) if (cm[0][0] + cm[0][1]) > 0 else 0
            metrics["balanced_accuracy"] = (metrics["recall"] + metrics["specificity"]) / 2

        except Exception as e:
            logger.warning(f"Could not compute confusion matrix metrics: {e}")

        if mlflow.active_run():
            mlflow.log_metrics({
                k: v for k, v in metrics.items()
                if v is not None and isinstance(v, (int, float))
            })

            try:
                import seaborn as sns
                import matplotlib.pyplot as plt

                plt.figure(figsize=(8, 6))
                sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
                plt.title('Confusion Matrix')
                plt.ylabel('True Label')
                plt.xlabel('Predicted Label')
                mlflow.log_figure(plt.gcf(), "confusion_matrix.png")
                plt.close()
            except Exception as e:
                logger.warning(f"Could not log confusion matrix plot: {e}")

        logger.info(f"Metrics computed successfully: {metrics}")
        return metrics

    except Exception as e:
        logger.error(f"Error in compute_metrics: {e}")
        return {
            "accuracy": 0.0,
            "precision": 0.0,
            "recall": 0.0,
            "f1": 0.0,
            "auc": None
        }

def setup_logging(
    log_file: str = 'app/Data/loggers/training.log',
    level: int = logging.INFO
) -> None:
    file_handler = logging.FileHandler(log_file)
    console_handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    root_logger = logging.getLogger()
    root_logger.setLevel(level)
    root_logger.handlers = []
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)
