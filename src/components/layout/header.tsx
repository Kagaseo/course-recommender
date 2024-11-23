'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion as m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Bell, MessageSquare, User, Settings, LogOut, UserCircle } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
];

const profileMenuItems = [
  {
    label: 'My Profile',
    href: '/profile',
    icon: UserCircle,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    label: 'Sign Out',
    href: '/logout',
    icon: LogOut,
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll-based animations
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.8]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <m.div 
        className="absolute inset-0 bg-black/20 backdrop-blur-xl"
        style={{ opacity: navBgOpacity }}
      />
      
      <div className="container relative flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <m.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="relative h-10 w-10">
              {/* Logo background effects */}
              <m.div 
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-violet-500/20"
                animate={{ 
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <m.div 
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20"
                animate={{ 
                  rotate: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">CC</span>
              </div>
            </div>
            
            {/* Logo text with lamp effect */}
            <div className="relative">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 group-hover:opacity-80 transition-all duration-300">
                Course Compass
              </span>
              <div className="absolute -inset-x-6 -inset-y-4 -z-10 hidden group-hover:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 blur-2xl rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-transparent rounded-2xl" />
              </div>
            </div>
          </Link>
        </m.div>

        {/* Centered Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <m.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href={item.href}
                  className="relative text-base font-medium text-white/70 hover:text-white transition-all duration-200 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 to-violet-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </m.div>
            ))}
          </div>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Icon */}
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 hover:from-blue-500/20 hover:via-violet-500/20 hover:to-purple-500/20 transition-all duration-200"
          >
            <Bell className="w-5 h-5 text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </m.button>

          {/* Chat Icon */}
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 hover:from-blue-500/20 hover:via-violet-500/20 hover:to-purple-500/20 transition-all duration-200"
          >
            <MessageSquare className="w-5 h-5 text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </m.button>

          {/* Profile Menu */}
          <div className="relative">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative p-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 hover:from-blue-500/20 hover:via-violet-500/20 hover:to-purple-500/20 transition-all duration-200"
            >
              <User className="w-5 h-5 text-white/70" />
            </m.button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-1 shadow-xl"
                  >
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Link>
                    ))}
                  </m.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 hover:from-blue-500/20 hover:via-violet-500/20 hover:to-purple-500/20 transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white/70" />
              ) : (
                <Menu className="w-5 h-5 text-white/70" />
              )}
            </m.button>
          </div>
        </div>
      </div>

      {/* Navigation Light Beam */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-sm shadow-white/20" />
        <div className="h-[6px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[3px]" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-md"
          >
            <div className="container py-4">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
