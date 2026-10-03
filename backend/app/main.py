from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app import __version__


settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=__version__,
    description="Unified farmer-first platform for crop damage reporting.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "version": __version__,
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "env": settings.APP_ENV,
        "ai_mode": settings.AI_MODE,
        "demo_mode": settings.DEMO_MODE,
    }