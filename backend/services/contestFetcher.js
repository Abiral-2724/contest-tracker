// services/contestFetcher.js
const axios = require('axios');
const Contest = require('../models/Contest');

// Fetch contests from Codeforces
const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    
    if (response.data.status !== 'OK') {
      throw new Error('Failed to fetch Codeforces contests');
    }
    
    const contests = response.data.result
      .filter(contest => contest.phase === 'BEFORE') // Only upcoming contests
      .map(contest => {
        // Codeforces returns time in seconds since unix epoch
        const startTimeMs = contest.startTimeSeconds * 1000;
        const durationMs = contest.durationSeconds * 1000;
        
        return {
          name: contest.name,
          platform: 'Codeforces',
          startTime: new Date(startTimeMs),
          endTime: new Date(startTimeMs + durationMs),
          url: `https://codeforces.com/contest/${contest.id}`,
          description: contest.name
        };
      });
    
    return contests;
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error);
    return [];
  }
};

// Fetch contests from CodeChef
const fetchCodechefContests = async () => {
  try {
    // CodeChef doesn't have a public API, so we'll use web scraping or a third-party API
    // For this example, we'll use a mock implementation
    const response = await axios.get('https://www.codechef.com/api/contests');
    
    const upcomingContests = response.data.future_contests || [];
    
    const contests = upcomingContests.map(contest => {
      return {
        name: contest.contest_name,
        platform: 'CodeChef',
        startTime: new Date(contest.contest_start_date),
        endTime: new Date(contest.contest_end_date),
        url: `https://www.codechef.com/${contest.contest_code}`,
        description: contest.contest_name
      };
    });
    
    return contests;
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error);
    return [];
  }
};

// Fetch contests from LeetCode
const fetchLeetcodeContests = async () => {
  try {
    // Using LeetCode's GraphQL API
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query {
          allContests {
            title
            titleSlug
            startTime
            duration
            description
          }
        }
      `
    });
    
    const allContests = response.data.data.allContests || [];
    const now = Date.now();
    
    const contests = allContests
      .filter(contest => contest.startTime * 1000 > now) // Only upcoming
      .map(contest => {
        const startTimeMs = contest.startTime * 1000;
        const durationMs = contest.duration * 1000;
        
        return {
          name: contest.title,
          platform: 'LeetCode',
          startTime: new Date(startTimeMs),
          endTime: new Date(startTimeMs + durationMs),
          url: `https://leetcode.com/contest/${contest.titleSlug}`,
          description: contest.description
        };
      });
    
    return contests;
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
};

// Main function to fetch all contests
const fetchAllContests = async () => {
  try {
    const [codeforcesContests, codechefContests, leetcodeContests] = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodechefContests(),
      fetchLeetcodeContests()
    ]);
    
    const allContests = [
      ...codeforcesContests,
      ...codechefContests,
      ...leetcodeContests
    ];
    
    // Save to database, avoiding duplicates
    for (const contest of allContests) {
      await Contest.findOneAndUpdate(
        { 
          name: contest.name, 
          platform: contest.platform,
          startTime: contest.startTime
        },
        contest,
        { upsert: true, new: true }
      );
    }
    
    console.log(`Fetched ${allContests.length} contests successfully`);
    return allContests;
  } catch (error) {
    console.error('Error fetching contests:', error);
    throw error;
  }
};

module.exports = {
  fetchAllContests,
  fetchCodeforcesContests,
  fetchCodechefContests,
  fetchLeetcodeContests
};