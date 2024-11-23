'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { motion as m, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code, Palette, BarChart, Star, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } }
};

// Custom cursor component
const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <m.div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white rounded-full scale-50 opacity-40" />
        <div className="absolute inset-0 bg-white rounded-full scale-100 blur-sm opacity-20" />
      </div>
    </m.div>
  );
};

// Magnetic button component
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    setPosition({ 
      x: distanceX * 0.4,
      y: distanceY * 0.4
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <m.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  );
};

// Featured courses data
const featuredCourses = [
  {
    title: "Python Programming",
    description: "Master Python programming from basics to advanced concepts",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop",
    category: "Programming",
    rating: "4.9",
    instructor: "John Doe",
    icon: <Code className="w-4 h-4 text-white" />,
    size: "large"
  },
  {
    title: "UI/UX Design",
    description: "Learn modern UI/UX design principles and tools",
    image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=800&auto=format&fit=crop",
    category: "Design",
    rating: "4.8",
    instructor: "Jane Smith",
    icon: <Palette className="w-4 h-4 text-white" />,
    size: "medium"
  },
  {
    title: "Data Science",
    description: "Explore data science and machine learning",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    category: "Data",
    rating: "4.7",
    instructor: "Mike Johnson",
    icon: <BarChart className="w-4 h-4 text-white" />,
    size: "medium"
  },
  {
    title: "Web Development",
    description: "Build modern web applications",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
    category: "Programming",
    rating: "4.9",
    instructor: "Sarah Wilson",
    icon: <Code className="w-4 h-4 text-white" />,
    size: "small"
  },
  {
    title: "AI & Machine Learning",
    description: "Dive into artificial intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    category: "AI",
    rating: "4.8",
    instructor: "David Brown",
    icon: <Star className="w-4 h-4 text-white" />,
    size: "small"
  }
];

const testimonials = [
  {
    name: "Sujan Shrestha",
    role: "Computer Engineering Student",
    content: "The course recommendations helped me find exactly what I needed to advance my programming skills.",
  },
  {
    name: "Saujan Thokar",
    role: "IT Student",
    content: "An amazing platform that understands exactly what you need to learn. The AI recommendations are spot on!",
  },
  {
    name: "Sujal Shrestha",
    role: "Computer Science Student",
    content: "The personalized learning path made it easy to progress from basics to advanced concepts.",
  },
  {
    name: "Dhundup Lama",
    role: "Software Engineering Student",
    content: "Great platform for continuous learning. The course quality and recommendations are excellent.",
  },
  {
    name: "Ronik Maharjan",
    role: "Computer Engineering Student",
    content: "The AI-powered recommendations helped me find the perfect courses for my skill level.",
  },
];

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // Refs for sections
  const footerRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const aiRecommendationsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [heroRef, coursesRef, testimonialRef, aiRecommendationsRef, footerRef];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(currentSectionIndex + direction, sectionRefs.length - 1));
      
      if (nextIndex !== currentSectionIndex) {
        setIsScrolling(true);
        setCurrentSectionIndex(nextIndex);
        
        sectionRefs[nextIndex].current?.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSectionIndex, isScrolling]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  return (
    <div className="relative bg-black min-h-screen text-white">
      <CustomCursor />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main cursor light */}
        <div 
          className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            background: "radial-gradient(circle, rgba(29, 78, 216, 0.05) 0%, transparent 70%)",
            transform: `translate(-50%, -50%)`,
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-40" />
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <main className="relative w-full overflow-hidden snap-y snap-mandatory">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-[100vh] w-full flex flex-col justify-center items-center relative snap-start">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Digital Rain Animation */}
          <m.div className="absolute inset-0 overflow-hidden">
            {/* Orbital Layer */}
            <m.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 5.5rem,
                  rgba(56, 189, 248, 0.08) 6rem
                )`,
                backgroundSize: '8rem 8rem',
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Wave Pattern Layer */}
            <m.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 5.5rem,
                  rgba(139, 92, 246, 0.08) 6rem
                )`,
                backgroundSize: '8rem 8rem',
              }}
              animate={{
                scaleY: [1, 1.2, 1],
                y: ['-2%', '2%', '-2%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Flowing Lines */}
            <m.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 7.5rem,
                  rgba(168, 85, 247, 0.06) 8rem
                )`,
                backgroundSize: '8rem 100%',
              }}
              animate={{
                x: ['-20%', '20%'],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                x: {
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            />

            {/* Pulsing Grid */}
            <m.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 7.5rem,
                  rgba(56, 189, 248, 0.06) 8rem
                )`,
                backgroundSize: '100% 8rem',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating Elements */}
            {[...Array(4)].map((_, i) => (
              <m.div
                key={i}
                className="absolute w-32 h-32 rounded-full"
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${20 + i * 15}%`,
                  background: `radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                  y: ['-10%', '10%', '-10%']
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </m.div>

          <div className="container mx-auto max-w-7xl relative z-10 px-4">
            <div className="text-center">
              <m.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="mb-8"
              >
                <m.span 
                  className="text-6xl md:text-8xl font-bold inline-block cursor-pointer"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-300 hover:via-violet-300 hover:to-purple-300 transition-colors">
                    Discover
                  </span>
                </m.span>{" "}
                <m.span 
                  className="text-6xl md:text-8xl font-bold inline-block cursor-pointer"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        delay: 0.2,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 hover:from-violet-300 hover:via-purple-300 hover:to-blue-300 transition-colors">
                    Your
                  </span>
                </m.span>{" "}
                <m.span 
                  className="text-6xl md:text-8xl font-bold inline-block cursor-pointer relative"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <m.span
                    className="absolute -inset-1 rounded-lg bg-gradient-to-b from-transparent via-blue-500/20 to-transparent blur-xl"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 hover:from-purple-300 hover:via-blue-300 hover:to-violet-300 transition-colors">
                    Learning
                  </span>
                </m.span>{" "}
                <m.span 
                  className="text-6xl md:text-8xl font-bold inline-block cursor-pointer"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        delay: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateZ: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 hover:from-blue-300 hover:via-purple-300 hover:to-violet-300 transition-colors">
                    Path
                  </span>
                </m.span>
              </m.div>

              <m.p
                className="text-xl md:text-2xl text-gray-300/90 mb-12 max-w-2xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                AI-powered course recommendations tailored to your goals and interests
              </m.p>

              <m.div
                className="flex items-center justify-center gap-4"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                  }}
                  className="mt-8 flex gap-4"
                >
                  <MagneticButton>
                    <Link
                      href="/signin"
                      className={cn(
                        buttonVariants({
                          size: "lg",
                        }),
                        "relative group"
                      )}
                    >
                      <m.span
                        className="absolute -inset-1 rounded-lg bg-gradient-to-b from-transparent via-blue-500/20 to-transparent blur-xl"
                        animate={{
                          opacity: [0.5, 0.3, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Get Started
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <Link 
                      href="/courses"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "lg",
                        }),
                        "bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 flex items-center gap-2"
                      )}
                    >
                      Explore Courses
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </MagneticButton>
                </m.div>
              </m.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-lg shadow-blue-500/50" />
            <div className="h-[15px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-[8px]" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>

          {/* Scroll Indicator */}
          <m.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full" />
            </div>
          </m.div>
        </section>

        {/* Featured Courses Section */}
        <section ref={coursesRef} className="min-h-[100vh] w-full flex flex-col justify-center items-center relative snap-start">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            
          <div className="container mx-auto max-w-7xl relative z-10 px-4">
            <m.div 
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="text-center mb-16"
            >
              <m.h2 
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-violet-300 to-purple-300 text-transparent bg-clip-text"
              >
                Featured Courses
              </m.h2>
              <m.p 
                initial="hidden"
                animate="visible"
                variants={heroTextVariants}
                className="mt-6 text-xl text-gray-300/90 max-w-2xl mx-auto"
              >
                Explore our most popular courses curated just for you
              </m.p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent blur-3xl pointer-events-none" />
                
              <AnimatePresence>
                {featuredCourses.map((course, index) => (
                  <m.div
                    key={course.title}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    className={cn(
                      "group relative rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden",
                      "hover:border-white/20 transition-colors duration-500",
                      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-black/50 before:to-black",
                      course.size === "large" && "md:col-span-2 md:row-span-2",
                      course.size === "medium" && "md:col-span-1 md:row-span-2",
                      course.size === "small" && "md:col-span-1 md:row-span-1"
                    )}
                  >
                    {/* Course Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 text-sm bg-white/10 text-blue-300 rounded-full backdrop-blur-sm border border-white/10">
                          {course.category}
                        </span>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400">{course.rating}</span>
                        </div>
                      </div>

                      <h3 className={cn(
                        "font-bold text-white group-hover:text-blue-300 transition-colors duration-300",
                        (course.size === "large" || course.size === "medium") ? "text-2xl mb-3" : "text-xl mb-2"
                      )}>
                        {course.title}
                      </h3>

                      {(course.size === "large" || course.size === "medium") && (
                        <p className="text-gray-300/90 text-base mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-800 p-[1px]">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                {course.icon}
                              </div>
                            </div>
                            <span className="text-sm text-gray-300">{course.instructor}</span>
                          </div>
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 text-sm"
                          >
                            Learn more <ArrowRight className="w-4 h-4" />
                          </m.button>
                        </div>
                      </div>
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-lg shadow-violet-500/50" />
            <div className="h-[15px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-[8px]" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialRef} className="min-h-[100vh] w-full flex flex-col justify-center items-center relative snap-start overflow-hidden">
          <div className="container mx-auto max-w-7xl relative z-10 px-4">
            <div className="text-center space-y-4">
              <m.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ 
                  once: false,
                  amount: 0.3,
                  margin: "0px 0px -200px 0px"
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.21, 1.02, 0.73, 0.99]
                }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                  <m.span
                    className="inline-block bg-gradient-to-r from-blue-300 via-violet-300 to-purple-300 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ 
                      once: false,
                      amount: 0.3,
                      margin: "0px 0px -200px 0px"
                    }}
                    transition={{ 
                      duration: 0.7,
                      delay: 0.1,
                      ease: [0.21, 1.02, 0.73, 0.99]
                    }}
                  >
                    What Our Learners Say
                  </m.span>
                  <m.div
                    className="h-[2px] mt-4 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ 
                      once: false,
                      amount: 0.3,
                      margin: "0px 0px -200px 0px"
                    }}
                    transition={{ 
                      duration: 0.7,
                      delay: 0.3,
                      ease: [0.21, 1.02, 0.73, 0.99]
                    }}
                  />
                </h1>
              </m.div>

              <m.p
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ 
                  once: false,
                  amount: 0.3,
                  margin: "0px 0px -200px 0px"
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: [0.21, 1.02, 0.73, 0.99]
                }}
              >
                Hear from our learners who have achieved their goals with our courses
              </m.p>
            </div>

            {/* Infinite Scrolling Testimonials */}
            <div className="relative w-full overflow-hidden border-y border-white/5">
              {/* Sharp edge masks */}
              <div className="absolute left-0 top-0 h-full w-32 bg-black z-10" />
              <div className="absolute right-0 top-0 h-full w-32 bg-black z-10" />
              
              {/* Edge gradient lines */}
              <div className="absolute left-32 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />
              <div className="absolute right-32 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />
              
              <m.div 
                className="flex gap-6 py-6 w-max relative"
                animate={{
                  x: [-1750, -3500],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
                style={{ x: -1750 }}
              >
                {/* First set of cards */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-1`}
                    className="relative flex-shrink-0 w-[400px] h-[180px] bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-900/50 backdrop-blur-sm border-l-2 border-t border-b border-r border-white/[0.08] p-6 hover:border-l-white/30 transition-all duration-300"
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex-grow">
                        <p className="text-gray-300/90 text-lg">"{testimonial.content}"</p>
                      </div>
                      <div className="pt-4 border-t border-white/[0.08]">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-blue-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-2`}
                    className="relative flex-shrink-0 w-[400px] h-[180px] bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-900/50 backdrop-blur-sm border-l-2 border-t border-b border-r border-white/[0.08] p-6 hover:border-l-white/30 transition-all duration-300"
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex-grow">
                        <p className="text-gray-300/90 text-lg">"{testimonial.content}"</p>
                      </div>
                      <div className="pt-4 border-t border-white/[0.08]">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-blue-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </m.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-indigo-500/50" />
            <div className="h-[15px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-[8px]" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section ref={aiRecommendationsRef} className="min-h-[100vh] w-full flex flex-col justify-center items-center relative snap-start">
          <m.div 
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 text-transparent bg-clip-text">
              Personalized Learning Path
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover courses tailored to your goals and skill level, powered by our advanced AI recommendation system.
            </p>
          </m.div>

          <m.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-4"
          >
            {[
              {
                title: "Machine Learning Fundamentals",
                description: "Perfect next step based on your interest in Python and data analysis",
                difficulty: "Intermediate",
                match: "98% Match",
                icon: <Code className="w-6 h-6" />,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Advanced UI/UX Design",
                description: "Recommended based on your completion of basic design courses",
                difficulty: "Advanced",
                match: "95% Match",
                icon: <Palette className="w-6 h-6" />,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Data Visualization with D3.js",
                description: "Combines your web development and data analysis skills",
                difficulty: "Intermediate",
                match: "93% Match",
                icon: <BarChart className="w-6 h-6" />,
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((course, index) => (
              <m.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                className="relative group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-gradient-to-r rounded-lg ${course.gradient}">
                      {course.icon}
                    </div>
                    <span className="text-green-400 text-sm font-medium">
                      {course.match}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.difficulty}</span>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 text-sm">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-lg shadow-purple-500/50" />
            <div className="h-[15px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[8px]" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>
        </section>

        {/* Footer Section */}
        <section ref={footerRef} className="min-h-[100vh] w-full flex flex-col justify-center items-center relative snap-start">
          <Footer />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-lg shadow-white/50" />
            <div className="h-[15px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[8px]" />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>
        </section>

        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
          {sectionRefs.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (!isScrolling) {
                  setIsScrolling(true);
                  setCurrentSectionIndex(index);
                  sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => setIsScrolling(false), 1000);
                }
              }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSectionIndex === index ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
