# import subprocess
import os
from pathlib import Path
import kaggle
from typing import Optional

def download_kaggle_dataset(
    dataset_name: str = 'superpotato9/dalle-recognition-dataset',
    download_dir: str = 'app/Data/data',
    force_download: bool = False
) -> str:
    try:
        Path(download_dir).mkdir(parents=True, exist_ok=True)
        is_empty = len(os.listdir(download_dir)) == 0

        if is_empty or force_download:
            print(f"Downloading dataset '{dataset_name}' to {download_dir}")
            kaggle.api.dataset_download_files(
                dataset_name,
                path=download_dir,
                unzip=True
            )
            print("Download completed successfully!")
            return download_dir
        else:
            print(f"Directory {download_dir} is not empty. Skipping download.")
            return ''

    except kaggle.ApiError as e:
        print(f"Kaggle API error: {str(e)}")
        raise
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise

# def download_dataset(dataset_name="/superpotato9/dalle-recognition-dataset", download_path="./app/Data"):
#     bash_script_path = os.path.join(os.path.dirname(__file__), 'download_data.sh')
#     if not os.access(bash_script_path, os.X_OK):
#         os.chmod(bash_script_path, 0o755)

#     result = subprocess.run(
#         [bash_script_path, dataset_name, dataset_path],
#         capture_output=True,
#         text=True
#     )
#     path = result.stdout.strip().splitlines()[-1]
#     return path
