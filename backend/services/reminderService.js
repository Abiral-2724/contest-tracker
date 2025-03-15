// services/reminderService.js
const User = require('../models/User');
const Contest = require('../models/Contest');
const nodemailer = require('nodemailer');
// For SMS you would need a service like Twilio
// const twilio = require('twilio');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email reminder
const sendEmailReminder = async (user, contest) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Reminder: ${contest.name} starts soon!`,
      html: `
        <h2>Contest Reminder</h2>
        <p>Hello,</p>
        <p>This is a reminder that the following contest is starting soon:</p>
        <p><strong>${contest.name}</strong> on <strong>${contest.platform}</strong></p>
        <p>Start Time: ${contest.startTime.toLocaleString()}</p>
        <p>You can access the contest here: <a href="${contest.url}">${contest.url}</a></p>
        <p>Good luck!</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Email reminder sent to ${user.email} for ${contest.name}`);
    return true;
  } catch (error) {
    console.error(`Error sending email reminder to ${user.email}:`, error);
    return false;
  }
};

// Send SMS reminder (using Twilio as an example)
const sendSmsReminder = async (user, contest) => {
  try {
    if (!user.phone) {
      console.log(`No phone number for user ${user._id}`);
      return false;
    }
    
    // You would need to set up Twilio account and credentials
    /*
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    await twilioClient.messages.create({
      body: `Reminder: ${contest.name} (${contest.platform}) starts at ${contest.startTime.toLocaleString()}. Access it here: ${contest.url}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: user.phone
    });
    */
    
    console.log(`SMS reminder sent to ${user.phone} for ${contest.name}`);
    return true;
  } catch (error) {
    console.error(`Error sending SMS reminder to ${user.phone}:`, error);
    return false;
  }
};

// Check and send reminders
const checkAndSendReminders = async () => {
  try {
    const now = new Date();
    const users = await User.find({ 'reminderPreferences.platforms': { $exists: true, $not: { $size: 0 } } });
    
    if (users.length === 0) {
      console.log('No users with reminder preferences found');
      return;
    }
    
    for (const user of users) {
      const { platforms, reminderTime, reminderType } = user.reminderPreferences;
      
      // Calculate the time window for checking upcoming contests
      const reminderWindowStart = new Date(now.getTime() + (reminderTime - 5) * 60 * 1000);
      const reminderWindowEnd = new Date(now.getTime() + (reminderTime + 5) * 60 * 1000);
      
      // Find contests that are starting within the reminder window
      const contests = await Contest.find({
        platform: { $in: platforms },
        startTime: { $gt: reminderWindowStart, $lt: reminderWindowEnd }
      });
      
      if (contests.length === 0) {
        continue;
      }
      
      for (const contest of contests) {
        if (reminderType === 'email' || reminderType === 'both') {
          await sendEmailReminder(user, contest);
        }
        
        if (reminderType === 'sms' || reminderType === 'both') {
          await sendSmsReminder(user, contest);
        }
      }
    }
  } catch (error) {
    console.error('Error checking and sending reminders:', error);
  }
};

module.exports = {
  checkAndSendReminders
};