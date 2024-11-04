from app.Ml.steps.DataLoader import load_data,create_data
from app.Ml.steps.DataPreprocessor import sample_data,compose_data
from app.Ml.steps.DataSplitter import split_data
from app.Ml.steps.ModelBuilder import (
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
        'num_train_epochs': trial.suggest_int('num_train_epochs', 5, 15),
        'warmup_steps': trial.suggest_int('warmup_steps', 30, 100),
        'per_device_train_batch_size': trial.suggest_categorical('per_device_train_batch_size', [32, 64, 128])
    }
    trial_output_dir = f"{base_output_dir}/trial_{trial.number}"
    model_save_dir = "app/Data/models"

    os.makedirs(model_save_dir, exist_ok=True)

    training_args = TrainingArguments(
        output_dir=trial_output_dir,
        evaluation_strategy="epoch",
        learning_rate=params['learning_rate'],
        per_device_train_batch_size=params['per_device_train_batch_size'],
        per_device_eval_batch_size=32,
        num_train_epochs=params['num_train_epochs'],
        weight_decay=params['weight_decay'],
        warmup_steps=params['warmup_steps'],
        remove_unused_columns=False,
        save_strategy='epoch',
        load_best_model_at_end=True,
        save_total_limit=1,
        report_to="mlflow",
        metric_for_best_model="eval_accuracy",
        greater_is_better=True
    )

    model = model_initializer()
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
    study_name: str = "Image_model_optimization",
    base_output_dir: str = 'app/Data/outputs'
):
    try:
        mlflow.set_tracking_uri("mlruns")
        mlflow.set_experiment(study_name)
        df = load_data()
        df = sample_data(df)
        dataset = create_data(df)
        train, test = split_data(dataset, 0.15)

        model_data = model_initializer()

        train_transforms, val_transforms = compose_data(
            model_data['image_mean'],
            model_data['image_std'],
            model_data['size']
        )
        train.set_transform(train_transforms)
        test.set_transform(val_transforms)

        study = optuna.create_study(
            study_name=study_name,
            direction="maximize",
            sampler=TPESampler(),
            pruner=optuna.pruners.MedianPruner()
        )
        with mlflow.start_run(run_name=study_name):
            mlflow.log_params({
                "model_type": model_data.get("model_name", "unknown"),
                "image_size": model_data.get("size", "unknown"),
            })

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


# def training_pipeline():
#     df = load_data()
#     df = sample_data(df)
#     dataset = create_data(df)
#     train,test = split_data(dataset,0.15)

#     model_data = model_initializer()
#     args = training_arguments_initializer()

#     train_transforms, val_transforms = compose_data(model_data['image_mean'],model_data['image_std'],model_data['size'])
#     train.set_transform(train_transforms)
#     test.set_transform(val_transforms)

#     Trainer = trainer_initializer(model_data,args,train,test)
#     Trainer.train()
#     metrics = Trainer.evaluate()
#     return metrics
