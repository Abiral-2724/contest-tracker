// import React, { useState, useEffect } from 'react';
// import { getUpcomingContests, getPastContests, getUserBookmarks, bookmarkContest, removeBookmark } from '../services/api';
// import ContestCard from '../components/ContestCard';
// import FilterBar from '../components/FilterBar';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';

// const HomePage = () => {
//   const [upcomingContests, setUpcomingContests] = useState([]);
//   const [pastContests, setPastContests] = useState([]);
//   const [bookmarkedContests, setBookmarkedContests] = useState([]);
//   const [selectedPlatforms, setSelectedPlatforms] = useState(['Codeforces', 'CodeChef', 'LeetCode']);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('upcoming');
//   const [user, setUser] = useState(null);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [theme, setTheme] = useState('light');
  
//   useEffect(() => {
//     // Check for user in local storage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
    
//     // Initialize theme from localStorage or system preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setTheme('dark');
//       document.documentElement.classList.add('dark');
//     }
    
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [upcomingRes, pastRes] = await Promise.all([
//           getUpcomingContests(),
//           getPastContests()
//         ]);
        
//         setUpcomingContests(upcomingRes.data);
//         setPastContests(pastRes.data);
        
//         // Fetch bookmarks if user exists in local storage
//         if (storedUser) {
//           const userData = JSON.parse(storedUser);
//           if (userData && userData._id) {
//             const bookmarksRes = await getUserBookmarks(userData._id);
//             setBookmarkedContests(bookmarksRes.data.map(contest => contest._id));
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching contests:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);
  
//   const handleBookmark = async (contestId) => {
//     // Check if user exists in local storage
//     const storedUser = localStorage.getItem('user');
    
//     if (!storedUser) {
//       setShowLoginPrompt(true);
//       setTimeout(() => setShowLoginPrompt(false), 3000); // Hide prompt after 3 seconds
//       return;
//     }
    
//     const userData = JSON.parse(storedUser);
    
//     try {
//       if (bookmarkedContests.includes(contestId)) {
//         await removeBookmark(userData._id, contestId);
//         setBookmarkedContests(bookmarkedContests.filter(id => id !== contestId));
//       } else {
//         await bookmarkContest(userData._id, contestId);
//         setBookmarkedContests([...bookmarkedContests, contestId]);
//       }
//     } catch (error) {
//       console.error('Error updating bookmark:', error);
//     }
//   };
  
//   const filteredUpcomingContests = upcomingContests.filter(
//     contest => selectedPlatforms.includes(contest.platform)
//   );
  
//   const filteredPastContests = pastContests.filter(
//     contest => selectedPlatforms.includes(contest.platform)
//   );
  
//   return (
//     <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//     <div className="container mx-auto px-4 py-8 relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
//       {showLoginPrompt && (
//         <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-fade-in">
//           <span>Please sign in to bookmark contests</span>
//           <Link to="/login" className="bg-white text-blue-500 px-3 py-1 rounded font-medium text-sm hover:bg-blue-50">
//             Login
//           </Link>
//         </div>
//       )}
      
//       <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Coding Contest Tracker</h1>
      
//       <FilterBar
//         selectedPlatforms={selectedPlatforms}
//         onChange={setSelectedPlatforms}
//       />
      
//       <div className="mb-6 border-b dark:border-gray-700">
//         <nav className="-mb-px flex space-x-8">
//           <button
//             onClick={() => setActiveTab('upcoming')}
//             className={`py-4 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'upcoming'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600'
//             }`}
//           >
//             Upcoming Contests
//           </button>
//           <button
//             onClick={() => setActiveTab('past')}
//             className={`py-4 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'past'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600'
//             }`}
//           >
//             Past Contests
//           </button>
//           {user && (
//             <button
//               onClick={() => setActiveTab('bookmarked')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'bookmarked'
//                   ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                   : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600'
//               }`}
//             >
//               Bookmarked
//             </button>
//           )}
//         </nav>
//       </div>
      
//       {isLoading ? (
//         <div className="text-center py-10">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-3 text-gray-600 dark:text-gray-400">Loading contests...</p>
//         </div>
//       ) : (
//         <div>
//           {activeTab === 'upcoming' && (
//             <>
//               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Upcoming Contests</h2>
//               {filteredUpcomingContests.length > 0 ? (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredUpcomingContests.map(contest => (
//                     <ContestCard
//                       key={contest._id}
//                       contest={contest}
//                       isBookmarked={bookmarkedContests.includes(contest._id)}
//                       onBookmark={handleBookmark}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-center py-10">No upcoming contests found for the selected platforms.</p>
//               )}
//             </>
//           )}
          
//           {activeTab === 'past' && (
//             <>
//               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Past Contests (Last 7 Days)</h2>
//               {filteredPastContests.length > 0 ? (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredPastContests.map(contest => (
//                     <ContestCard
//                       key={contest._id}
//                       contest={contest}
//                       isBookmarked={bookmarkedContests.includes(contest._id)}
//                       onBookmark={handleBookmark}
//                       isPast={true}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-center py-10">No past contests found for the selected platforms.</p>
//               )}
//             </>
//           )}
          
//           {activeTab === 'bookmarked' && (
//             <>
//               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Bookmarked Contests</h2>
//               {bookmarkedContests.length > 0 ? (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {[...upcomingContests, ...pastContests]
//                     .filter(contest => bookmarkedContests.includes(contest._id))
//                     .map(contest => (
//                       <ContestCard
//                         key={contest._id}
//                         contest={contest}
//                         isBookmarked={true}
//                         onBookmark={handleBookmark}
//                         isPast={new Date(contest.startTime) < new Date()}
//                       />
//                     ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-center py-10">No bookmarked contests yet. Click the bookmark icon on any contest to save it here.</p>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//     <Footer></Footer>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { getUpcomingContests, getPastContests, getUserBookmarks, bookmarkContest, removeBookmark } from '../services/api';
import ContestCard from '../components/ContestCard';
import FilterBar from '../components/FilterBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Codeforces', 'CodeChef', 'LeetCode']);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          getUpcomingContests(),
          getPastContests()
        ]);
        
        setUpcomingContests(upcomingRes.data);
        setPastContests(pastRes.data);
        
        // Fetch bookmarks if user exists in local storage
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData && userData._id) {
            const bookmarksRes = await getUserBookmarks(userData._id);
            setBookmarkedContests(bookmarksRes.data.map(contest => contest._id));
          }
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleBookmark = async (contestId) => {
    // Check if user exists in local storage
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000); // Hide prompt after 3 seconds
      return;
    }
    
    const userData = JSON.parse(storedUser);
    
    try {
      if (bookmarkedContests.includes(contestId)) {
        await removeBookmark(userData._id, contestId);
        setBookmarkedContests(bookmarkedContests.filter(id => id !== contestId));
      } else {
        await bookmarkContest(userData._id, contestId);
        setBookmarkedContests([...bookmarkedContests, contestId]);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };
  
  const filteredUpcomingContests = upcomingContests.filter(
    contest => selectedPlatforms.includes(contest.platform)
  );
  
  const filteredPastContests = pastContests.filter(
    contest => selectedPlatforms.includes(contest.platform)
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 text-gray-900 dark:text-gray-100">
      {/* Hero section with animated background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-20 left-1/3 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Coding Contest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">Tracker</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Stay updated with the latest coding competitions from your favorite platforms. Never miss a challenge again.
            </p>
            {!user && (
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="bg-white text-indigo-600 hover:text-indigo-800 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-1">
                  Sign In
                </Link>
                <Link to="/register" className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition duration-200">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Login prompt toast notification */}
        {showLoginPrompt && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg shadow-xl z-50 flex items-center space-x-3">
            <span>Please sign in to bookmark contests</span>
            <Link to="/login" className="bg-white text-indigo-600 px-3 py-1 rounded-md font-medium text-sm hover:bg-blue-50 transition duration-150 ease-in-out">
              Login
            </Link>
          </div>
        )}
        
        {/* Filter section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filter Platforms</h3>
          <FilterBar
            selectedPlatforms={selectedPlatforms}
            onChange={setSelectedPlatforms}
          />
        </div>
        
        {/* Tabs navigation */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-gray-700">
          <nav className="flex">
            {['upcoming', 'past', ...(user ? ['bookmarked'] : [])].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 px-8 font-medium text-base flex-1 transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                {tab === 'upcoming' && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-white text-indigo-600">
                    {filteredUpcomingContests.length}
                  </span>
                )}
                {tab === 'past' && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                    {filteredPastContests.length}
                  </span>
                )}
                {tab === 'bookmarked' && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100">
                    {bookmarkedContests.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-200 dark:border-indigo-900"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="mt-8 text-gray-600 dark:text-gray-400 font-medium">Loading your contests...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'upcoming' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Upcoming Contests
                  </h2>
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
                    {filteredUpcomingContests.length} contests available
                  </span>
                </div>
                
                {filteredUpcomingContests.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredUpcomingContests.map(contest => (
                      <ContestCard
                        key={contest._id}
                        contest={contest}
                        isBookmarked={bookmarkedContests.includes(contest._id)}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-gray-700">
                    <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Upcoming Contests</h3>
                    <p className="text-gray-500 dark:text-gray-400">No upcoming contests found for the selected platforms.</p>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'past' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Past Contests
                  </h2>
                  <span className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
                    Last 7 Days • {filteredPastContests.length} contests
                  </span>
                </div>
                
                {filteredPastContests.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPastContests.map(contest => (
                      <ContestCard
                        key={contest._id}
                        contest={contest}
                        isBookmarked={bookmarkedContests.includes(contest._id)}
                        onBookmark={handleBookmark}
                        isPast={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-gray-700">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Past Contests</h3>
                    <p className="text-gray-500 dark:text-gray-400">No past contests found for the selected platforms.</p>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'bookmarked' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                    Bookmarked Contests
                  </h2>
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
                    {bookmarkedContests.length} saved contests
                  </span>
                </div>
                
                {bookmarkedContests.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...upcomingContests, ...pastContests]
                      .filter(contest => bookmarkedContests.includes(contest._id))
                      .map(contest => (
                        <ContestCard
                          key={contest._id}
                          contest={contest}
                          isBookmarked={true}
                          onBookmark={handleBookmark}
                          isPast={new Date(contest.startTime) < new Date()}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-blue-50 dark:border-gray-700">
                    <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Bookmarks Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Click the bookmark icon on any contest to save it here for quick access.</p>
                    <button 
                      onClick={() => setActiveTab('upcoming')}
                      className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                    >
                      Browse Contests
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Feature highlights section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Use Contest Tracker?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ),
                title: "Never Miss a Contest",
                description: "Get updates about upcoming competitions across all major coding platforms in one place."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                ),
                title: "Personalized Bookmarks",
                description: "Save your favorite contests and create your personalized competing schedule."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                ),
                title: "Filter by Platform",
                description: "Customize your view to only show contests from platforms you're interested in."
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;