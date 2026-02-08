import logging


def setup_logging() -> None:
    # Basic production-friendly logging setup.
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )

