from app.text.Ml.steps.DataLoader import load_data
from app.text.Ml.steps.DataPreprocessor import preprocess_data
from app.text.Ml.steps.DataSplitter import split_data
from app.text.Ml.steps.ModelBuilder import (
    model_initializer,
    training_arguments_initializer,
    trainer_initializer
)

import os
import optuna
import mlflow
from optuna.samplers import TPESampler
from typing import Dict, Any
import logging
from transformers import TrainingArguments
from functools import partial
import accelerate

def objective(
    trial: optuna.Trial,
    train_dataset,
    test_dataset,
    model_data: Dict[str, Any],
    base_output_dir: str = 'app/Data/outputs'
) -> float:
    params = {
        'learning_rate': trial.suggest_float('learning_rate', 1e-6, 1e-4, log=True),
        'weight_decay': trial.suggest_float('weight_decay', 0.01, 0.1),
        'weight_decay': trial.suggest_int('weight_decay', 0.01, 0.1),
        'warmup_steps': trial.suggest_int('warmup_steps', 30, 100),
    }
    trial_output_dir = f"{base_output_dir}/trial_{trial.number}"
    model_save_dir = "app/text/Data/models"

    os.makedirs(model_save_dir, exist_ok=True)

    training_args = TrainingArguments(
        output_dir=trial_output_dir,
        learning_rate=params['learning_rate'],
        num_train_epochs=params['num_train_epochs'],
        per_device_train_batch_size=8,
        per_device_eval_batch_size=8,
        warmup_ratio=0.1,
        weight_decay=params['weight_decay'],
        warmup_steps=params['warmup_steps'],
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


    model,tokenizer = model_initializer()
    trainer = trainer_initializer(model, training_args, train_dataset, test_dataset)
    train_result = trainer.train()
    metrics = trainer.evaluate()

    mlflow.log_metrics({
        'eval_loss': metrics['eval_loss'],
        'eval_accuracy': metrics['eval_accuracy']
    })
    study = trial.study
    current_accuracy = metrics['eval_accuracy']

    if len(study.trials) == 1 or current_accuracy > study.best_value:
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        model_name = f"best_model_{timestamp}_acc_{current_accuracy:.4f}"
        save_path = os.path.join(model_save_dir, model_name)
        trainer.save_model(save_path)
        mlflow.log_param("best_model_path", save_path)
        logging.info(f"Saved best model to {save_path}")
        training_args.save_to_json(os.path.join(save_path, "training_args.json"))

    return metrics['eval_accuracy']

def training_pipeline(
    n_trials: int = 10,
    study_name: str = "Text_model_optimization",
    base_output_dir: str = 'app/text/Data/outputs'
):
    try:
        mlflow.set_tracking_uri("mlruns")
        mlflow.set_experiment(study_name)
        df = load_data()
        dataset = preprocess_data(df)
        train, test = split_data(dataset, 0.15)

        model_data = model_initializer()

        study = optuna.create_study(
            study_name=study_name,
            direction="maximize",
            sampler=TPESampler(),
            pruner=optuna.pruners.MedianPruner()
        )
        with mlflow.start_run(run_name=study_name):
            # mlflow.log_params({
            #     "model_type": model_data.get("model_name", "unknown")
            # })

            objective_func = partial(
                objective,
                train_dataset=train,
                test_dataset=test,
                model_data=model_data,
                base_output_dir=base_output_dir
            )
            study.optimize(objective_func, n_trials=n_trials)
            mlflow.log_params(study.best_params)
            mlflow.log_metrics({
                "best_accuracy": study.best_value,
                "n_trials": n_trials
            })
            fig = optuna.visualization.plot_optimization_history(study)
            mlflow.log_figure(fig, "optimization_history.png")

            return {
                "best_params": study.best_params,
                "best_value": study.best_value,
                "study": study
            }

    except Exception as e:
        logging.error(f"Error in training pipeline: {e}")
        raise
