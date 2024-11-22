'use client';

import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-dark">
      <div className="grid-background absolute inset-0 opacity-40" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        <ScrollIndicator />
        <Header className="fixed top-0 left-0 right-0 z-50" />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer className="relative z-10 mt-auto" />
      </motion.div>
    </div>
  );
}
