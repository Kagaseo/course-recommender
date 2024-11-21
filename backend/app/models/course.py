from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    provider = Column(String, index=True)
    url = Column(String)
    price = Column(Float, nullable=True)
    currency = Column(String, nullable=True)
    level = Column(String)  # beginner, intermediate, advanced
    duration = Column(String)
    topics = Column(JSON)  # Array of topics
    skills = Column(JSON)  # Array of skills
    prerequisites = Column(JSON, nullable=True)  # Array of prerequisites
    rating = Column(Float, default=0.0)
    reviews_count = Column(Integer, default=0)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
