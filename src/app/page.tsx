import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight, Star, Sparkles, Target, Book, Users } from "lucide-react";

const featuredCourses = [
  {
    title: "Machine Learning Fundamentals",
    description: "Learn the basics of machine learning and AI",
    image: "/placeholder.png",
    category: "AI & ML",
    rating: 4.8,
  },
  {
    title: "Web Development Bootcamp",
    description: "Master modern web development",
    image: "/placeholder.png",
    category: "Development",
    rating: 4.9,
  },
  {
    title: "Data Science Essentials",
    description: "Start your journey in data science",
    image: "/placeholder.png",
    category: "Data Science",
    rating: 4.7,
  },
];

const aiRecommendations = [
  {
    title: "Python Programming",
    description: "Based on your interest in data science",
    image: "/placeholder.png",
    match: 98,
  },
  {
    title: "UI/UX Design",
    description: "Matches your creative skills",
    image: "/placeholder.png",
    match: 95,
  },
  {
    title: "Cloud Computing",
    description: "Aligns with your tech background",
    image: "/placeholder.png",
    match: 92,
  },
];

const stats = [
  { label: "Active Learners", value: "50K+", icon: Users },
  { label: "Available Courses", value: "1000+", icon: Book },
  { label: "Success Rate", value: "95%", icon: Target },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/5 blur-3xl rounded-full" />
        </div>

        <div className="container">
          <div className="flex flex-col items-center text-center gap-8 lg:gap-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-sm font-medium">
              <Sparkles size={16} className="text-primary" />
              <span>AI-Powered Course Recommendations</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                Discover Your Perfect Learning Path
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Let our AI guide you through thousands of courses to find the perfect match for your skills, interests, and career goals.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium transition-all hover:bg-accent/70"
              >
                Explore All Courses
              </Link>
            </div>

            {/* Stats */}
            <div className="w-full mt-8 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border"
                  >
                    <Icon size={24} className="text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <Link
                key={index}
                href={`/course/${index}`}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-colors"
              >
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                  <div className="flex items-center gap-1 text-primary">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Preview */}
      <section className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recommended for You</h2>
            <Link
              href="/ai-recommendations"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendations.map((course, index) => (
              <Link
                key={index}
                href={`/course/${index}`}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-colors"
              >
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {course.match}% Match
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
