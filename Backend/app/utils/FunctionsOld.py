from zenml.logger import get_logger
import evaluate
from sklearn.metrics import roc_auc_score

logger = get_logger(__name__)

def collate_fn(examples: list) -> dict:
    try:
        pixel_values = torch.stack([example["pixel_values"] for example in examples])
        labels = torch.tensor([example['label'] for example in examples])
        logger.info("Collate function applied to batch.")
        return {"pixel_values": pixel_values, "labels": labels}

    except Exception as e:
        logger.error(f"Error in collate_fn: {e}")
        return None

def compute_metrics(eval_pred):
    accuracy = evaluate.load("accuracy")
    precision = evaluate.load("precision")
    recall = evaluate.load("recall")
    f1 = evaluate.load("f1")
    predictions = eval_pred.predictions
    label_ids = eval_pred.label_ids
    predicted_labels = predictions.argmax(axis=1)

    acc_score = accuracy.compute(predictions=predicted_labels, references=label_ids)['accuracy']
    precision_score = precision.compute(predictions=predicted_labels, references=label_ids, average="binary")['precision']
    recall_score = recall.compute(predictions=predicted_labels, references=label_ids, average="binary")['recall']
    f1_score = f1.compute(predictions=predicted_labels, references=label_ids, average="binary")['f1']

    try:
        auc_score = roc_auc_score(label_ids, predictions[:, 1])
    except ValueError:
        auc_score = None

    return {
        "accuracy": acc_score,
        "precision": precision_score,
        "recall": recall_score,
        "f1": f1_score,
        "auc": auc_score
    }
