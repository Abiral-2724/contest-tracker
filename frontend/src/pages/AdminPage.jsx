import React, { useState, useEffect } from 'react';
import { getPastContests, addSolutionToContest } from '../services/api';
import SolutionForm from '../components/SolutionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Youtube, CheckCircle, Loader2, Shield } from "lucide-react";

const AdminPage = () => {
  const [pastContests, setPastContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [theme, setTheme] = useState('light');
  
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
    
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
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
    }
  };
  
  // Filter contests
  const contestsWithoutSolutions = pastContests.filter(contest => !contest.solutionUrl);
  const contestsWithSolutions = pastContests.filter(contest => contest.solutionUrl);
  
  // Function to get a background color based on platform
  const getPlatformColor = (platform) => {
    const platformColors = {
      'Codeforces': theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      'LeetCode': theme === 'dark' ? 'bg-blue-800/50' : 'bg-blue-300',
      'CodeChef': theme === 'dark' ? 'bg-orange-900/50' : 'bg-orange-500',
    };
    
    return platformColors[platform] || (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50');
  };
  
  return (
    <div className="min-h-screen w-full dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 dark:text-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Shield size={28} className="text-red-600 dark:text-red-400" />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="animate-spin text-red-600 dark:text-red-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading contests...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {successMessage && (
                <Alert className="mb-4 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-300">{successMessage}</AlertDescription>
                </Alert>
              )}
              
              <SolutionForm
                contests={contestsWithoutSolutions}
                onSubmit={handleSubmit}
                theme={theme}
              />
            </div>
            
            <Card className="border-red-100 dark:border-red-900/50 dark:bg-gray-800">
              <CardHeader className="bg-red-50 dark:bg-red-900/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Youtube size={20} className="text-red-600 dark:text-red-400" />
                  Available Solutions
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Contests with YouTube solution videos
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 rounded-xl">
                {contestsWithSolutions.length > 0 ? (
                  <ul className="space-y-3">
                    {contestsWithSolutions.map(contest => (
                      <li 
                        key={contest._id} 
                        className={`border border-gray-100 dark:border-gray-700 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${getPlatformColor(contest.platform)}`}
                      >
                        <div className="font-medium">{contest.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{contest.platform}</div>
                        <Separator className="my-2 dark:bg-gray-700" />
                        <a
                          href={contest.solutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
                        >
                          <Youtube size={16} className="mr-1" />
                          Watch Solution
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    <Youtube size={40} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p>No contests with solutions yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;