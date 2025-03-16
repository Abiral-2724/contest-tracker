// src/services/api.js
import axios from 'axios';

const API_URL = 'https://contest-tracker-l9vc.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Contest APIs
export const getUpcomingContests = () => api.get('/contests/upcoming');
export const getPastContests = () => api.get('/contests/past');
export const getFilteredContests = (platforms) => api.get(`/contests/filter?platforms=${platforms.join(',')}`);
export const addSolutionToContest = (contestId, solutionUrl) => api.patch(`/contests/${contestId}/solution`, { solutionUrl });

// User APIs
export const createUser = (userData) => api.post('/users', userData);
export const bookmarkContest = (userId, contestId) => api.post(`/users/${userId}/bookmark`, { contestId });
export const removeBookmark = (userId, contestId) => api.delete(`/users/${userId}/bookmark/${contestId}`);

export const getUserBookmarks = (userId) => api.get(`/users/${userId}/bookmarks`);

export const updateReminderPreferences = async (userId, reminderPreferences) => {
    const response = await fetch(`https://contest-tracker-l9vc.onrender.com/api/users/${userId}/reminders`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminderPreferences),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update reminder preferences');
    }
    
    return response.json();
  };

export default api;