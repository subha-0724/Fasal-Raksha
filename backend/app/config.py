from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    APP_NAME: str = "Fasal Raksha"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api"

    SECRET_KEY: str = Field(..., min_length=16)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    DATABASE_URL: str = "sqlite:///./fasal_raksha.db"

    CORS_ORIGINS: str = "http://localhost:5173"

    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 25

    ALLOWED_IMAGE_TYPES: str = "image/jpeg,image/png,image/webp"
    ALLOWED_VIDEO_TYPES: str = "video/mp4,video/webm"

    AI_MODE: str = "demo"
    AI_MODEL_PATH: str = "app/ai/weights/wildlife_yolov8.pt"
    AI_CONFIDENCE_THRESHOLD: float = 0.5

    DEMO_MODE: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [
            item.strip()
            for item in self.CORS_ORIGINS.split(",")
            if item.strip()
        ]

    @property
    def allowed_image_types_list(self) -> List[str]:
        return [
            item.strip()
            for item in self.ALLOWED_IMAGE_TYPES.split(",")
            if item.strip()
        ]

    @property
    def allowed_video_types_list(self) -> List[str]:
        return [
            item.strip()
            for item in self.ALLOWED_VIDEO_TYPES.split(",")
            if item.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()