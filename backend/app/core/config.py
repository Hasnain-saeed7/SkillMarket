import os


def env(key: str, default: str | None = None) -> str | None:
    """Tiny env helper (keeps config centralized)."""
    return os.getenv(key, default)


DATABASE_URL = env(
    "DATABASE_URL",
    "postgresql://postgres:hass4321@localhost:5432/skillmarket_db",
)

# IMPORTANT: change in production
SECRET_KEY = env("SECRET_KEY", "change-me-in-production")
JWT_ALGORITHM = env("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(env("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))  # 7 days

# CORS
# Default includes both localhost and 127.0.0.1 for Vite dev server
CORS_ORIGINS = [
    o.strip()
    for o in env("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if o.strip()
]

# Uploads
UPLOAD_DIR = env("UPLOAD_DIR", "uploads")
SERVICE_UPLOAD_SUBDIR = env("SERVICE_UPLOAD_SUBDIR", "services")

# Basic upload limits (bytes). Optional but recommended.
MAX_IMAGE_BYTES = int(env("MAX_IMAGE_BYTES", str(5 * 1024 * 1024)))  # 5MB

