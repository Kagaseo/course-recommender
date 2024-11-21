import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
import joblib
from pathlib import Path

class CourseRecommender:
    def __init__(self):
        self.courses_df = None
        self.tfidf_matrix = None
        self.vectorizer = None
        self.model_path = Path("models")
        self.initialize_models()

    def initialize_models(self):
        """Initialize or load pre-trained models"""
        if not self.model_path.exists():
            self.model_path.mkdir(parents=True)

        # Load models if they exist, otherwise they'll be created when processing data
        try:
            self.vectorizer = joblib.load(self.model_path / "vectorizer.joblib")
            self.tfidf_matrix = joblib.load(self.model_path / "tfidf_matrix.joblib")
        except FileNotFoundError:
            pass

    def process_data(self, courses_df: pd.DataFrame):
        """Process course data and create TF-IDF matrix"""
        self.courses_df = courses_df

        # Combine relevant text fields for content-based filtering
        self.courses_df['content'] = self.courses_df.apply(
            lambda x: ' '.join([
                str(x['title']),
                str(x['description']),
                ' '.join(str(x['topics'])),
                ' '.join(str(x['skills'])),
                str(x['level'])
            ]).lower(),
            axis=1
        )

        # Create TF-IDF matrix
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=5000,
            ngram_range=(1, 2)
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(self.courses_df['content'])

        # Save models
        joblib.dump(self.vectorizer, self.model_path / "vectorizer.joblib")
        joblib.dump(self.tfidf_matrix, self.model_path / "tfidf_matrix.joblib")

    def get_recommendations(
        self,
        user_preferences: Dict,
        n_recommendations: int = 10
    ) -> List[Dict]:
        """Get course recommendations based on user preferences"""
        if self.tfidf_matrix is None:
            raise ValueError("Model not trained. Please process data first.")

        # Create a query vector from user preferences
        query_text = ' '.join([
            user_preferences.get('interests', ''),
            user_preferences.get('goals', ''),
            user_preferences.get('level', 'beginner'),
        ]).lower()

        # Transform query to TF-IDF vector
        query_vector = self.vectorizer.transform([query_text])

        # Calculate similarity scores
        similarity_scores = cosine_similarity(query_vector, self.tfidf_matrix)

        # Get top N similar courses
        course_indices = similarity_scores[0].argsort()[-n_recommendations:][::-1]

        # Get recommended courses
        recommendations = []
        for idx in course_indices:
            course = self.courses_df.iloc[idx]
            recommendations.append({
                'id': course.get('id'),
                'title': course.get('title'),
                'provider': course.get('provider'),
                'level': course.get('level'),
                'rating': course.get('rating'),
                'url': course.get('url'),
                'similarity_score': similarity_scores[0][idx],
            })

        return recommendations

    def update_recommendations(self, user_feedback: Dict):
        """Update recommendations based on user feedback"""
        # TODO: Implement feedback-based model updates
        pass

    def get_similar_courses(self, course_id: int, n_similar: int = 5) -> List[Dict]:
        """Get similar courses based on a specific course"""
        if self.tfidf_matrix is None:
            raise ValueError("Model not trained. Please process data first.")

        # Find the course index
        course_idx = self.courses_df[self.courses_df['id'] == course_id].index[0]

        # Calculate similarity with all courses
        course_similarities = cosine_similarity(
            self.tfidf_matrix[course_idx:course_idx+1],
            self.tfidf_matrix
        )

        # Get top N similar courses (excluding the course itself)
        similar_indices = course_similarities[0].argsort()[-n_similar-1:-1][::-1]

        # Get similar courses
        similar_courses = []
        for idx in similar_indices:
            course = self.courses_df.iloc[idx]
            similar_courses.append({
                'id': course.get('id'),
                'title': course.get('title'),
                'provider': course.get('provider'),
                'level': course.get('level'),
                'rating': course.get('rating'),
                'url': course.get('url'),
                'similarity_score': course_similarities[0][idx],
            })

        return similar_courses
