import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollIndicator } from "@/components/ScrollIndicator";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'CourseCompass - AI-Powered Course Recommendations',
  description: 'Discover personalized educational paths with AI-powered course recommendations',
  openGraph: {
    title: 'CourseCompass - AI-Powered Course Recommendations',
    description: 'Discover personalized educational paths with AI-powered course recommendations',
    url: 'http://localhost:3000',
    siteName: 'CourseCompass',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourseCompass - AI-Powered Course Recommendations',
    description: 'Discover personalized educational paths with AI-powered course recommendations',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <ScrollIndicator />
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
