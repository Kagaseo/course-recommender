'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, BookOpen, DollarSign } from 'lucide-react';

interface Course {
  id: number;
  course_name: string;
  url?: string;
  difficulty_level?: string;
  course_rating?: number;
  course_rated_by?: number;
  course_duration?: string;
  course_enrollment?: number;
}

interface CourseResponse {
  total: number;
  page: number;
  limit: number;
  courses: Course[];
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('Any Duration');
  const [selectedPrice, setSelectedPrice] = useState('Any Price');
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [recommendations, setRecommendations] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch categories and difficulties when component mounts
    const fetchMetadata = async () => {
      try {
        const [categoriesRes, difficultiesRes] = await Promise.all([
          fetch('http://localhost:8000/api/categories'),
          fetch('http://localhost:8000/api/difficulties')
        ]);
        
        const categoriesData = await categoriesRes.json();
        const difficultiesData = await difficultiesRes.json();
        
        setCategories(['All Categories', ...categoriesData.categories]);
        setDifficulties(['All Levels', ...difficultiesData.difficulties]);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '12'
        });

        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
        if (selectedLevel !== 'All Levels') params.append('difficulty', selectedLevel);

        const response = await fetch(`http://localhost:8000/api/courses?${params}`);
        const data: CourseResponse = await response.json();
        
        setCourses(data.courses);
        setTotalCourses(data.total);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery, selectedCategory, selectedLevel, page]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!selectedCourse) {
        setRecommendations([]);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:8000/api/recommendations/${encodeURIComponent(selectedCourse.course_name)}?limit=4`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl font-bold">Explore Courses</h1>
          <p className="text-muted-foreground">
            Discover courses that match your interests and goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium md:hidden"
          >
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {/* Duration Filter */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {['Any Duration', '0-2 weeks', '2-4 weeks', '4-8 weeks', '8+ weeks'].map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {['Any Price', 'Free', 'Under $50', '$50-$100', '$100+'].map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No courses found</p>
            </div>
          ) : (
            courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${
                  selectedCourse?.id === course.id ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedCourse(course)}
              >
                <h3 className="font-semibold mb-2 line-clamp-2">{course.course_name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {course.difficulty_level && (
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {course.difficulty_level}
                    </span>
                  )}
                  {course.course_duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {course.course_duration}
                    </span>
                  )}
                </div>
                {course.course_rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="fill-yellow-400 text-yellow-400" size={14} />
                    <span>{course.course_rating.toFixed(1)}</span>
                    {course.course_rated_by && (
                      <span className="text-muted-foreground">({course.course_rated_by})</span>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Recommendations Section */}
        {selectedCourse && recommendations && recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Recommended Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent"
                  onClick={() => setSelectedCourse(course)}
                >
                  <h3 className="font-semibold mb-2 line-clamp-2">{course.course_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    {course.difficulty_level && (
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {course.difficulty_level}
                      </span>
                    )}
                    {course.course_duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {course.course_duration}
                      </span>
                    )}
                  </div>
                  {course.course_rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="fill-yellow-400 text-yellow-400" size={14} />
                      <span>{course.course_rating.toFixed(1)}</span>
                      {course.course_rated_by && (
                        <span className="text-muted-foreground">({course.course_rated_by})</span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalCourses > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border bg-background disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {Math.ceil(totalCourses / 12)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(totalCourses / 12)}
              className="px-4 py-2 rounded-lg border bg-background disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
