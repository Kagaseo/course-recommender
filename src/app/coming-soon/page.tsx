import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold sm:text-5xl">Coming Soon</h1>
          <p className="text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned for updates!
          </p>
        </div>
        
        <div className="flex flex-col gap-4 min-w-[300px]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Enhanced AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                More personalized course suggestions
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Learning Paths</h3>
              <p className="text-sm text-muted-foreground">
                Structured paths to achieve your goals
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Community Features</h3>
              <p className="text-sm text-muted-foreground">
                Connect with fellow learners
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Explore Available Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
