'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, MessageSquare, User, Settings, LogOut, UserCircle } from 'lucide-react';

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close profile menu when clicking outside
  const handleClickOutside = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-8 w-8">
              <motion.div 
                className="absolute inset-0 rotate-6 rounded bg-primary/20"
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="absolute inset-0 -rotate-6 rounded bg-primary/20"
                whileHover={{ rotate: -12 }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute inset-0 rounded bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">CC</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 group-hover:to-primary/80 transition-colors">
              CourseCompass
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary group',
                  'text-muted-foreground'
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-full relative group">
              <Bell size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full relative group">
              <MessageSquare size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={cn(
                  "p-2 rounded-full group transition-colors",
                  isProfileOpen ? "bg-accent" : "hover:bg-accent"
                )}
              >
                <User size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    {/* Invisible overlay to handle clicking outside */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={handleClickOutside}
                    />
                    
                    {/* Dropdown menu */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl border bg-background/80 backdrop-blur-sm shadow-lg z-50"
                    >
                      <div className="p-2">
                        <div className="p-2 mb-2">
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-muted-foreground">john@example.com</div>
                        </div>
                        <div className="h-px bg-border" />
                        {profileMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => setIsProfileOpen(false)}
                              className={cn(
                                "flex items-center gap-2 w-full p-2 rounded-md text-sm",
                                "hover:bg-accent transition-colors",
                                item.label === 'Sign Out' && "text-red-500 hover:text-red-500"
                              )}
                            >
                              <Icon size={16} />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-full"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Icons */}
              <div className="mt-2 px-4 py-2 flex flex-col gap-2 border-t">
                <button className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-lg transition-colors">
                  <Bell size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
                </button>
                <button className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-lg transition-colors">
                  <MessageSquare size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Messages</span>
                  <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
                </button>
                {profileMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-2 p-2 hover:bg-accent/50 rounded-lg transition-colors",
                        item.label === 'Sign Out' && "text-red-500"
                      )}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
