import React, { useState, useEffect } from 'react';
import { getPastContests, addSolutionToContest } from '../services/api';
import SolutionForm from '../components/SolutionForm';

const AdminPage = () => {
  const [pastContests, setPastContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const fetchPastContests = async () => {
      setIsLoading(true);
      try {
        const response = await getPastContests();
        setPastContests(response.data);
      } catch (error) {
        console.error('Error fetching past contests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPastContests();
  }, []);
  
  const handleSubmit = async (contestId, solutionUrl) => {
    try {
      await addSolutionToContest(contestId, solutionUrl);
      
      // Update the local state
      setPastContests(pastContests.map(contest => {
        if (contest._id === contestId) {
          return { ...contest, solutionUrl };
        }
        return contest;
      }));
      
      setSuccessMessage('Solution link added successfully!');
      
      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error adding solution link:', error);
      setSuccessMessage('Failed to add solution link. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading contests...</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}
          
          <SolutionForm
            contests={pastContests.filter(contest => !contest.solutionUrl)}
            onSubmit={handleSubmit}
          />
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Contests with Solutions</h3>
            
            {pastContests.filter(contest => contest.solutionUrl).length > 0 ? (
              <ul className="divide-y">
                {pastContests
                  .filter(contest => contest.solutionUrl)
                  .map(contest => (
                    <li key={contest._id} className="py-3">
                      <div className="font-medium">{contest.name}</div>
                      <div className="text-sm text-gray-500">{contest.platform}</div>
                      <a 
                        href={contest.solutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        YouTube Solution
                      </a>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No contests with solutions yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;