from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "CourseCompass API"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"  # Change this in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "sqlite:///./coursecompass.db"  # Default to SQLite
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]  # Frontend URL
    
    # ML Model Settings
    MODEL_PATH: str = "models"
    MIN_SIMILARITY_SCORE: float = 0.3
    MAX_RECOMMENDATIONS: int = 10
    
    # Redis Settings (for caching)
    REDIS_URL: Optional[str] = None
    CACHE_EXPIRE_MINUTES: int = 60
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
