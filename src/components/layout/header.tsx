'use client';

import { useState, useEffect } from 'react';
import { motion as m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, Bell, MessageSquare, User, Settings, LogOut, UserCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
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

export default function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const activeIndicatorVariants = {
    initial: { width: 0 },
    hover: { 
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' }
  };

  return (
    <m.header
      style={{ backgroundColor }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300',
        className
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <MagneticButton className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
                CourseCompass
              </span>
            </Link>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <MagneticButton key={item.name}>
                <m.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative",
                      activeItem === item.name
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    )}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Hover background effect */}
                    <m.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-white/5 rounded-md -z-0"
                      style={{ originX: 0.5, originY: 0.5 }}
                    />
                    
                    {/* Active indicator */}
                    {activeItem === item.name && (
                      <m.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    <m.div
                      variants={activeIndicatorVariants}
                      initial="initial"
                      whileHover="hover"
                      className="absolute bottom-0 left-0 h-0.5 bg-white/20"
                    />
                  </Link>
                </m.div>
              </MagneticButton>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </m.button>

            {/* Messages */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
            </m.button>

            {/* Profile Menu */}
            <div className="relative">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <User className="w-5 h-5 text-gray-300" />
              </m.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl"
                  >
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </m.button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-y-0 right-0 w-64 bg-black/50 backdrop-blur-xl border-l border-white/10"
          >
            <div className="px-4 py-8">
              <div className="space-y-6">
                {navigation.map((item) => (
                  <m.div
                    key={item.name}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-base font-medium rounded-lg transition-colors",
                        activeItem === item.name
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                      onClick={() => {
                        setActiveItem(item.name);
                        setIsOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Separation Light */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-md" />
      </div>
    </m.header>
  );
}
