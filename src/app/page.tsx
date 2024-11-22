'use client';

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight, Star, Sparkles, Search, BookOpen, Users, GraduationCap, Code, BarChart, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    scale: 0.98 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  },
  hover: {
    scale: 1.03,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

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
    title: "UI/UX Design Masterclass",
    description: "Create beautiful and intuitive user interfaces",
    image: "/placeholder.png",
    category: "Design",
    rating: 4.7,
  },
  {
    title: "Cloud Computing Essentials",
    description: "Master cloud platforms and deployment",
    image: "/placeholder.png",
    category: "Cloud",
    rating: 4.8,
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    image: "/placeholder.png",
    content: "This platform transformed my career. The AI recommendations were spot-on!",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    image: "/placeholder.png",
    content: "The course quality and learning experience is unmatched. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "/placeholder.png",
    content: "Found exactly what I needed to upgrade my design skills. Amazing platform!",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const coursesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const coursesInView = useInView(coursesRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900/20 to-black/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div 
              variants={fadeInUp} 
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-300 to-indigo-200">
                Discover Your Next Learning Adventure
              </h1>
              <p className="text-xl text-gray-300">
                AI-powered course recommendations tailored to your goals and interests
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-lg font-medium text-white transition-all hover:from-violet-700 hover:to-indigo-700"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/20"
              >
                Browse All Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Courses Section */}
      <motion.section
        id="courses"
        ref={coursesRef}
        initial="initial"
        animate={coursesInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black/30 via-purple-900/10 to-black/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={fadeInUp}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Courses</h2>
            <p className="text-gray-300">Start your learning journey with our top-rated courses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-lg border bg-background/80 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors"
              >
                <div className="aspect-video relative rounded-md overflow-hidden mb-4 ring-1 ring-white/10">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-violet-300">{course.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-violet-400 text-violet-400" />
                      <span className="text-sm font-medium text-violet-300">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{course.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="cta"
        ref={ctaRef}
        initial="initial"
        animate={ctaInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/50 via-purple-900/20 to-black"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-indigo-200">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-gray-300">
              Join thousands of learners who are already achieving their goals through our platform.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
