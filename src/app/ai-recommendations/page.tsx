import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Recommendations - CourseCompass',
  description: 'Get personalized course recommendations based on your interests, goals, and learning style.',
}

export default function AiRecommendations() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">AI Course Recommendations</h1>
          <p className="text-lg text-muted-foreground">
            Get personalized course recommendations based on your interests, goals, and learning style.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Preferences Form */}
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Learning Profile</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Learning Goals</label>
                <select className="w-full rounded-md border bg-background px-3 py-2">
                  <option>Career Advancement</option>
                  <option>Skill Development</option>
                  <option>Personal Interest</option>
                  <option>Academic Growth</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interest Areas</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Programming', 'Design', 'Business', 'Data Science', 'Marketing', 'AI/ML'].map((interest) => (
                    <label key={interest} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <select className="w-full rounded-md border bg-background px-3 py-2">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Commitment</label>
                <select className="w-full rounded-md border bg-background px-3 py-2">
                  <option>1-2 hours/week</option>
                  <option>3-5 hours/week</option>
                  <option>5-10 hours/week</option>
                  <option>10+ hours/week</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Update Preferences
              </button>
            </form>
          </div>

          {/* AI Insights */}
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Insights</h2>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="font-medium mb-2">Learning Style Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your interactions, you seem to prefer hands-on, project-based learning with
                  visual content.
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="font-medium mb-2">Skill Gap Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  We've identified potential skill gaps in cloud computing and data visualization that
                  could help advance your career.
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="font-medium mb-2">Career Path Alignment</h3>
                <p className="text-sm text-muted-foreground">
                  Your selected courses align well with a Data Scientist career path. Consider adding
                  some statistics courses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Recommended Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-6 hover:border-primary">
                <div className="aspect-video rounded-lg bg-muted mb-4"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">98% Match</span>
                    <span className="text-sm text-muted-foreground">4 weeks</span>
                  </div>
                  <h3 className="font-semibold">Advanced Data Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect match for your data science interests and current skill level.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
