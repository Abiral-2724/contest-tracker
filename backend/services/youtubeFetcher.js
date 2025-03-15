// services/youtubeFetcher.js
const axios = require('axios');
const Contest = require('../models/Contest');

// Function to search YouTube for contest solutions
const searchYouTubeForSolutions = async () => {
  try {
    // Get past contests with no solution URLs
    const pastContests = await Contest.find({
      endTime: { $lt: new Date() },
      solutionUrl: null
    });
    
    if (pastContests.length === 0) {
      console.log('No past contests without solutions found');
      return [];
    }
    
    // You would need a YouTube API key for this
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      console.log('YouTube API key or Channel ID not set');
      return [];
    }
    
    const updatedContests = [];
    
    for (const contest of pastContests) {
      // Construct search query
      const searchQuery = `${contest.name} solution`;
      
      // Search YouTube for videos from your channel
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API_KEY,
          channelId: CHANNEL_ID,
          part: 'snippet',
          q: searchQuery,
          maxResults: 1,
          type: 'video',
          order: 'date'
        }
      });
      
      const items = response.data.items || [];
      
      if (items.length > 0) {
        const videoId = items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Update contest with solution URL
        const updatedContest = await Contest.findByIdAndUpdate(
          contest._id,
          { solutionUrl: videoUrl, updatedAt: Date.now() },
          { new: true }
        );
        
        updatedContests.push(updatedContest);
        console.log(`Added solution for ${contest.name}: ${videoUrl}`);
      }
    }
    
    return updatedContests;
  } catch (error) {
    console.error('Error searching YouTube for solutions:', error);
    return [];
  }
};

module.exports = {
  searchYouTubeForSolutions
};