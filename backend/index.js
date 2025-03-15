// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const app = express();
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db.js');
const path = require('path')
const contestsRoutes = require('./routes/contests');
const usersRoutes = require('./routes/user');
const { fetchAllContests } = require('./services/contestFetcher');
const { searchYouTubeForSolutions } = require('./services/youtubeFetcher');
const { checkAndSendReminders } = require('./services/reminderService');

dotenv.config({});


const _dirname = path.resolve() ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Enable credentials (cookies)
};

app.use(cors(corsOptions));

app.use('/api/contests', contestsRoutes);
app.use('/api/users', usersRoutes);

// Admin route for manually adding YouTube solution
app.post('/api/admin/contests/solution', async (req, res) => {
    try {
      const { contestId, solutionUrl } = req.body;
      
      if (!contestId || !solutionUrl) {
        return res.status(400).json({ message: 'Contest ID and solution URL are required' });
      }
      
      const Contest = require('./models/Contest');
      const contest = await Contest.findByIdAndUpdate(
        contestId,
        { solutionUrl, updatedAt: Date.now() },
        { new: true }
      );
      
      if (!contest) {
        return res.status(404).json({ message: 'Contest not found' });
      }
      
      res.json(contest);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Schedule tasks
  // Fetch contests every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    console.log('Running scheduled task: Fetch contests');
    try {
      await fetchAllContests();
    } catch (error) {
      console.error('Error in scheduled contest fetch:', error);
    }
  });
  
  // Look for YouTube solutions once a day
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task: Search for YouTube solutions');
    try {
      await searchYouTubeForSolutions();
    } catch (error) {
      console.error('Error in scheduled YouTube search:', error);
    }
  });
  
  // Check for reminders every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log('Running scheduled task: Check reminders');
    try {
      await checkAndSendReminders();
    } catch (error) {
      console.error('Error in scheduled reminder check:', error);
    }
  });
  
  // Initial fetch on startup
  fetchAllContests().catch(err => console.error('Initial contest fetch error:', err));
  

// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server connected at port ${PORT}`);
});