import React from 'react';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button"


function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
   
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span>Back to Contest Tracker</span>
          </a>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About Contest Tracker</h1>
            <p className="text-xl text-muted-foreground dark:text-gray-300">
              Contest Tracker helps competitive programmers stay organized and never miss a coding contest.
            </p>
          </div>

          <div className="grid gap-8 mt-12">
            {/* Key Features Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Features</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Contest Calendar */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Contest Calendar</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      View upcoming and past contests from multiple platforms in list or calendar view.
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Notifications</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      Get browser notifications for upcoming contests and never miss a competition.
                    </div>
                  </div>
                </div>

                {/* Bookmarking */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Bookmarking</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      Bookmark important contests to keep track of the ones you're interested in.
                    </div>
                  </div>
                </div>

                {/* Solution Links */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Solution Links</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      Add YouTube solution links to past contests for future reference.
                    </div>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Search & Filter</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      Quickly find contests by name or platform with instant search.
                    </div>
                  </div>
                </div>

                {/* Command Menu */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary dark:text-blue-400"
                      >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                      </svg>
                      <div className="font-semibold tracking-tight text-lg dark:text-white">Command Menu</div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground dark:text-gray-300">
                      Use Cmd+K to quickly navigate and find contests from anywhere.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How to Use</h2>
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    01
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M12 2L9.1 8.6l-7.1.6 5.3 4.8L5.3 21 12 17.3 18.7 21l-1.9-7.1 5.3-4.8-7.1-.6L12 2Z" />
                      </svg>
                      Bookmark Important Contests
                    </h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-300">
                      Click the star icon on any contest card to bookmark it for quick access later.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    02
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      Set Up Notifications
                    </h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-300">
                      Click the 'Notifications' button and enable browser notifications to get reminders before contests start.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    03
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      Add to Calendar
                    </h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-300">
                      Use the 'Add to Calendar' button on any contest to add it to Google Calendar or download an .ics file.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    04
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                      Find Solutions
                    </h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-300">
                      For past contests, use the 'Find Solution on YouTube' button to search for editorial videos.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    05
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                      Add Your Own Solutions
                    </h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-300">
                      Click 'Add YouTube Solution' to add your own solution links to past contests.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Supported Platforms Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Supported Platforms</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Codeforces", color: "#1890ff" },
                  { name: "LeetCode", color: "#ffa116" },
                  { name: "CodeChef", color: "#5cb85c" },
                ].map((platform, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-lg border flex items-center justify-center h-24 font-medium text-lg transition-transform duration-200 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
                    style={{ borderColor: platform.color, color: platform.color }}
                  >
                    {platform.name}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to track your contests?</h2>
            <a href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                Go to Contest Tracker
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;