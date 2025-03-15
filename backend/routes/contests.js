// routes/contests.js
const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');

// Get all contests



router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get upcoming contests
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const contests = await Contest.find({
      startTime: { $gt: now }
    }).sort({ startTime: 1 });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get past contests in the last week
router.get('/past', async (req, res) => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const contests = await Contest.find({
      endTime: { $lt: now, $gt: oneWeekAgo }
    }).sort({ startTime: -1 });
    
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter contests by platform
router.get('/filter', async (req, res) => {
  try {
    const { platforms } = req.query;
    
    if (!platforms) {
      return res.status(400).json({ message: 'Please provide platform(s)' });
    }
    
    const platformArray = platforms.split(',');
    const now = new Date();
    
    const contests = await Contest.find({
      platform: { $in: platformArray },
      startTime: { $gt: now }
    }).sort({ startTime: 1 });
    
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add solution URL to a contest
router.patch('/:id/solution', async (req, res) => {
  try {
    const { solutionUrl } = req.body;
    
    if (!solutionUrl) {
      return res.status(400).json({ message: 'Solution URL is required' });
    }
    
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
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

module.exports = router;