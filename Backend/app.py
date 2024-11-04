from app.utils.Functions import setup_logging
from app.ML.pipelines.training import training_pipeline
import logging

if __name__ == "__main__":
    setup_logging()
    logger = logging.getLogger(__name__)

    logger.info("Application started")
    try:
        training_pipeline()
    except Exception as e:
        logger.error("Application error", exc_info=True)
