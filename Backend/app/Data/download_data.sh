#!/bin/bash

DATASET_NAME=$1
DATASET_PATH=$2

if [ -d "$DATASET_PATH" ] && [ "$(find "$DATASET_PATH" -type d | wc -l)" -gt 1 ]; then
    echo "Dataset already exists at $DATASET_PATH"
    echo "$DATASET_PATH"
else
    echo "No dataset found. Downloading $DATASET_NAME from Kaggle..."
    kaggle datasets download -d "$DATASET_NAME" -p "$DATASET_PATH"
    unzip "$DATASET_PATH/$DATASET_NAME.zip" -d "$DATASET_PATH"
    rm "$DATASET_PATH/$DATASET_NAME.zip"
    echo "$DATASET_PATH"
fi
