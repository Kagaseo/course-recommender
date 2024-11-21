from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pickle
import os
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the course data and similarity matrix
try:
    with open('pkl/courses.pkl', 'rb') as f:
        courses_list = pickle.load(f)
    with open('pkl/similarity.pkl', 'rb') as f:
        similarity = pickle.load(f)
except Exception as e:
    print(f"Error loading data: {e}")
    courses_list = None
    similarity = None

class Course(BaseModel):
    id: int
    course_name: str
    url: Optional[str]
    difficulty_level: Optional[str]
    course_rating: Optional[float]
    course_rated_by: Optional[int]
    course_duration: Optional[str]
    course_enrollment: Optional[int]

class CourseRecommendation(BaseModel):
    recommendations: List[Course]

@app.get("/")
async def read_root():
    return {"message": "Course Recommendation API"}

@app.get("/api/courses")
async def get_courses(
    search: Optional[str] = None,
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    if courses_list is None:
        raise HTTPException(status_code=500, detail="Course data not loaded")
    
    filtered_courses = courses_list
    
    # Apply filters
    if search:
        filtered_courses = filtered_courses[filtered_courses['course_name'].str.contains(search, case=False)]
    if category:
        filtered_courses = filtered_courses[filtered_courses['course_provided'].str.contains(category, case=False)]
    if difficulty:
        filtered_courses = filtered_courses[filtered_courses['difficulty_level'] == difficulty]
    
    # Pagination
    start = (page - 1) * limit
    end = start + limit
    
    total_courses = len(filtered_courses)
    paginated_courses = filtered_courses.iloc[start:end]
    
    return {
        "total": total_courses,
        "page": page,
        "limit": limit,
        "courses": paginated_courses.to_dict('records')
    }

@app.get("/api/recommendations/{course_name}")
async def get_recommendations(course_name: str, limit: int = 6):
    if courses_list is None or similarity is None:
        raise HTTPException(status_code=500, detail="Recommendation system not initialized")
    
    try:
        # Find the index of the course
        idx = courses_list[courses_list['course_name'] == course_name].index[0]
        
        # Get similarity scores
        sim_scores = list(enumerate(similarity[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # Get top similar courses (excluding the course itself)
        sim_scores = sim_scores[1:limit+1]
        course_indices = [i[0] for i in sim_scores]
        
        recommended_courses = courses_list.iloc[course_indices]
        
        return {
            "recommendations": recommended_courses.to_dict('records')
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Course not found or error generating recommendations: {str(e)}")

@app.get("/api/categories")
async def get_categories():
    if courses_list is None:
        raise HTTPException(status_code=500, detail="Course data not loaded")
    
    categories = courses_list['course_provided'].unique().tolist()
    return {"categories": categories}

@app.get("/api/difficulties")
async def get_difficulties():
    if courses_list is None:
        raise HTTPException(status_code=500, detail="Course data not loaded")
    
    difficulties = courses_list['difficulty_level'].unique().tolist()
    return {"difficulties": difficulties}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
