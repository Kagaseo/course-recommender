import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// Import styles
import "./globals.css";
import '@/styles/scroll.css';

const MainLayout = dynamic(() => import("@/components/layout/main-layout"), {
  ssr: true
});

const ScrollAnimationWrapper = dynamic(() => import("@/components/ScrollAnimationWrapper"), {
  ssr: false
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Course Compass',
  description: 'AI-powered course recommendations',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ScrollAnimationWrapper>
          <MainLayout>
            {children}
          </MainLayout>
        </ScrollAnimationWrapper>
      </body>
    </html>
  );
}
