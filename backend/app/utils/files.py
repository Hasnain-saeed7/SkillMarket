import os
import uuid
from pathlib import Path
from typing import Iterable

from fastapi import UploadFile

from app.core.config import MAX_IMAGE_BYTES, SERVICE_UPLOAD_SUBDIR, UPLOAD_DIR


ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
EXT_BY_TYPE = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}


def ensure_upload_dirs() -> Path:
    base = Path(UPLOAD_DIR) / SERVICE_UPLOAD_SUBDIR
    base.mkdir(parents=True, exist_ok=True)
    return base


async def save_upload_file(upload_dir: Path, f: UploadFile) -> str:
    """
    Save UploadFile to disk with validation and size limit.
    Returns relative path like: uploads/services/<uuid>.jpg
    """
    if f.content_type not in ALLOWED_IMAGE_TYPES:
        raise ValueError("Unsupported image type. Allowed: jpeg, png, webp")

    ext = EXT_BY_TYPE.get(f.content_type, "bin")
    filename = f"{uuid.uuid4()}.{ext}"
    dest = upload_dir / filename

    size = 0
    try:
        with dest.open("wb") as out:
            while True:
                chunk = await f.read(1024 * 1024)  # 1MB chunks
                if not chunk:
                    break
                size += len(chunk)
                if size > MAX_IMAGE_BYTES:
                    raise ValueError(f"Image too large. Max {MAX_IMAGE_BYTES} bytes")
                out.write(chunk)
    finally:
        await f.close()

    # store relative path for DB
    return str(Path(UPLOAD_DIR) / SERVICE_UPLOAD_SUBDIR / filename).replace("\\", "/")


def delete_files(paths: Iterable[str]) -> None:
    for p in paths:
        try:
            os.remove(p)
        except OSError:
            pass

