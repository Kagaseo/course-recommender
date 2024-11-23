'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Add authentication logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-black/95 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Digital Rain Animation */}
      <m.div className="absolute inset-0 overflow-hidden">
        {/* First Layer - Fast Vertical Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3.9rem,
              rgba(56, 189, 248, 0.15) 4rem
            )`,
            backgroundSize: '4rem 100%',
          }}
          animate={{
            y: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Second Layer - Medium Vertical Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3.9rem,
              rgba(139, 92, 246, 0.15) 4rem
            )`,
            backgroundSize: '4rem 100%',
          }}
          animate={{
            y: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
        />

        {/* Third Layer - Slow Vertical Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3.9rem,
              rgba(168, 85, 247, 0.15) 4rem
            )`,
            backgroundSize: '4rem 100%',
          }}
          animate={{
            y: ['-100%', '100%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />

        {/* First Layer - Fast Horizontal Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3.9rem,
              rgba(56, 189, 248, 0.15) 4rem
            )`,
            backgroundSize: '100% 4rem',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Second Layer - Medium Horizontal Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3.9rem,
              rgba(139, 92, 246, 0.15) 4rem
            )`,
            backgroundSize: '100% 4rem',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 0.7
          }}
        />

        {/* Third Layer - Slow Horizontal Lines */}
        <m.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3.9rem,
              rgba(168, 85, 247, 0.15) 4rem
            )`,
            backgroundSize: '100% 4rem',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 1.4
          }}
        />
      </m.div>

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <m.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="w-full max-w-md space-y-8 backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10"
        >
          {/* Logo and Title */}
          <m.div 
            variants={fadeInVariants}
            className="flex flex-col items-center justify-center text-center"
          >
            <m.div 
              className="relative h-12 w-12 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 rotate-6 rounded bg-blue-500/20" />
              <div className="absolute inset-0 -rotate-6 rounded bg-violet-500/20" />
              <div className="absolute inset-0 rounded bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">CC</span>
              </div>
            </m.div>
            <m.h2 
              variants={fadeInVariants}
              className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500"
            >
              Welcome back
            </m.h2>
            <m.p 
              variants={fadeInVariants}
              className="mt-2 text-sm text-white/60"
            >
              Please sign in to continue to CourseCompass
            </m.p>
          </m.div>

          {/* Social Sign In */}
          <m.div 
            variants={fadeInVariants}
            className="flex flex-col gap-3"
          >
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Github size={16} />
              Continue with GitHub
            </m.button>
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Mail size={16} />
              Continue with Google
            </m.button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black/95 px-2 text-white/60">Or continue with</span>
              </div>
            </div>
          </m.div>

          {/* Email Sign In Form */}
          <m.form 
            variants={fadeInVariants}
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/60">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
              >
                <m.span
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 blur-xl"
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
                {isLoading ? 'Signing in...' : 'Sign in'}
              </m.button>
            </div>
          </m.form>

          <m.p 
            variants={fadeInVariants}
            className="text-center text-sm text-white/60"
          >
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </m.p>
        </m.div>
      </div>
    </div>
  );
}
