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
- **Authentication**: Local storage-based user session management

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/coding-contest-tracker.git
cd coding-contest-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
contest-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── ContestCard.js      # Card component for displaying contest info
│   │   ├── FilterBar.js        # Component for filtering contests by platform
│   │   └── ...
│   ├── services/
│   │   ├── api.js              # API service for fetching contest data
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.js         # Main page displaying contests
│   │   ├── LoginPage.js        # Login page
│   │   └── ...
│   ├── App.js
│   └── index.js
└── ...
```

## Component: HomePage

The HomePage component is the main interface of the application. It:

1. Fetches and displays upcoming and past contests
2. Allows users to filter contests by platform
3. Enables users to bookmark contests if they're logged in
4. Shows a login prompt if users try to bookmark without being logged in
5. Provides a tabbed interface to switch between upcoming, past, and bookmarked contests

## User Authentication

The application uses local storage to maintain user sessions:

- User data is stored in local storage after successful login
- Bookmark functionality checks for a user in local storage before proceeding
- If no user is found when trying to bookmark, a login prompt is displayed
- The Bookmarked tab is only visible to logged-in users

## API Services

The application uses several API endpoints:

- `getUpcomingContests()`: Fetches upcoming contests
- `getPastContests()`: Fetches past contests
- `getUserBookmarks(userId)`: Fetches a user's bookmarked contests
- `bookmarkContest(userId, contestId)`: Adds a contest to a user's bookmarks
- `removeBookmark(userId, contestId)`: Removes a contest from a user's bookmarks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Contest data provided by various competitive programming platforms
- Icons from [source of icons used]
- Inspired by the competitive programming community
