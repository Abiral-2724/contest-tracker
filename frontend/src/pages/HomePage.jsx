import React, { useState, useEffect } from 'react';
import { getUpcomingContests, getPastContests, getUserBookmarks, bookmarkContest, removeBookmark } from '../services/api';
import ContestCard from '../components/ContestCard';
import FilterBar from '../components/FilterBar';
import { Link } from 'react-router-dom'; // Import Link for navigation to login page

const HomePage = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Codeforces', 'CodeChef', 'LeetCode']);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    <div className="container mx-auto px-4 py-8 relative">
      {showLoginPrompt && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-fade-in">
          <span>Please sign in to bookmark contests</span>
          <Link to="/login" className="bg-white text-blue-500 px-3 py-1 rounded font-medium text-sm hover:bg-blue-50">
            Login
          </Link>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Coding Contest Tracker</h1>
      
      <FilterBar
        selectedPlatforms={selectedPlatforms}
        onChange={setSelectedPlatforms}
      />
      
      <div className="mb-6 border-b">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Contests
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past Contests
          </button>
          {user && (
            <button
              onClick={() => setActiveTab('bookmarked')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookmarked'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bookmarked
            </button>
          )}
        </nav>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading contests...</p>
        </div>
      ) : (
        <div>
          {activeTab === 'upcoming' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Upcoming Contests</h2>
              {filteredUpcomingContests.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-gray-500 text-center py-10">No upcoming contests found for the selected platforms.</p>
              )}
            </>
          )}
          
          {activeTab === 'past' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Past Contests (Last 7 Days)</h2>
              {filteredPastContests.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-gray-500 text-center py-10">No past contests found for the selected platforms.</p>
              )}
            </>
          )}
          
          {activeTab === 'bookmarked' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Bookmarked Contests</h2>
              {bookmarkedContests.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-gray-500 text-center py-10">No bookmarked contests yet. Click the bookmark icon on any contest to save it here.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;