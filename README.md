Website Video : https://res.cloudinary.com/dci6nuwrm/video/upload/v1742111003/Screen_Recording_2025-03-16_at_12.52.42_PM_spf7r1.mov
# Coding Contest Tracker

A web application that helps competitive programmers track upcoming and past coding contests across multiple platforms like Codeforces, CodeChef, and LeetCode.

## Features

- **Contest Tracking**: View upcoming and past coding contests from popular platforms
- **Platform Filtering**: Filter contests by platform to focus on your preferred coding sites
- **Bookmarking System**: Save your favorite contests for easy access
- **User Authentication**: Login system to persist your bookmarks across devices
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express API (implied from API services)


## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/coding-contest-tracker.git
cd coding-contest-tracker
```

2. For Backend
```bash
cd backend
npm install
npm run dev
```

3. Set up environment variables in Backend
```bash
MONGO_URL=
PORT = 8000 
MONGO_PASSWORD =
EMAIL_USER=
EMAIL_PASSWORD=
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=
SECRET_KEY=
```

4. For frontend
```bash
cd frontend
npm install
npm run dev
```
4. For login as admin
```bash
Email = admin@gmail.com
Password = 123456
```


## Component: HomePage

The HomePage component is the main interface of the application. It:

1. Fetches and displays upcoming and past contests
2. Allows users to filter contests by platform
3. Enables users to bookmark contests if they're logged in
4. Shows a login prompt if users try to bookmark without being logged in
5. Provides a tabbed interface to switch between upcoming, past, and bookmarked contests

## API Services

The application uses several API endpoints:

- `getUpcomingContests()`: Fetches upcoming contests
- `getPastContests()`: Fetches past contests
- `getUserBookmarks(userId)`: Fetches a user's bookmarked contests
- `bookmarkContest(userId, contestId)`: Adds a contest to a user's bookmarks
- `removeBookmark(userId, contestId)`: Removes a contest from a user's bookmarks

## Acknowledgements

- Contest data provided by various competitive programming platforms
- Icons from [source of icons used]
- Inspired by the competitive programming community
