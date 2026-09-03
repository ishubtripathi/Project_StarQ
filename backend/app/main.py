from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.query import router as query_router
from app.api.routes.documents import router as documents_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="StarQ API",
    description="AI-powered PDF and CSV document intelligence platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(query_router)
app.include_router(documents_router)


@app.get("/")
async def root():
    return {
        "message": "StarQ API is running",
        "status": "healthy",
    }