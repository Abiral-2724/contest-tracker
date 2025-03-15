const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname : {
        type: String,
    required: true,
    } ,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true,
    unique: true
  } ,
  phoneNumber: {
    type: String,
    default: null
  },
  bookmarkedContests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest'
  }],
  reminderPreferences: {
    platforms: [{
      type: String,
      enum: ['Codeforces', 'CodeChef', 'LeetCode']
    }],
    reminderType: {
      type: String,
      enum: ['email', 'sms', 'both'],
      default: 'email'
    },
    reminderTime: {
      type: Number, // minutes before contest
      default: 60
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);