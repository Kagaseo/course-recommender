from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import pandas as pd
from app.services.recommendation import CourseRecommender

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize recommendation service
recommender = CourseRecommender()

# Load and process course data
@app.on_event("startup")
async def startup_event():
    try:
        # Load course data from CSV
        courses_df = pd.read_csv("data/courses.csv")
        recommender.process_data(courses_df)
    except Exception as e:
        print(f"Error loading course data: {e}")

@app.get("/")
async def root():
    return {"message": "Welcome to CourseCompass API"}

@app.post("/api/recommendations")
async def get_recommendations(preferences: dict):
    try:
        recommendations = recommender.get_recommendations(preferences)
        return {"recommendations": recommendations}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/courses/{course_id}/similar")
async def get_similar_courses(course_id: int):
    try:
        similar_courses = recommender.get_similar_courses(course_id)
        return {"similar_courses": similar_courses}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
