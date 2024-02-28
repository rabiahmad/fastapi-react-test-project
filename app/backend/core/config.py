from pydantic import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URI = Optional[str] = "sqlite:///example.db"


settings = Settings()
