import React, { useState } from 'react';

const ReminderForm = ({ onSubmit, initialValues, isSubmitting }) => {
  const [email, setEmail] = useState(initialValues?.email || '');
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [reminderType, setReminderType] = useState(initialValues?.reminderPreferences?.reminderType || 'email');
  const [reminderTime, setReminderTime] = useState(initialValues?.reminderPreferences?.reminderTime || 60);
  const [platforms, setPlatforms] = useState(initialValues?.reminderPreferences?.platforms || []);
  
  const handlePlatformToggle = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({
      email,
      phone: reminderType === 'sms' || reminderType === 'both' ? phone : null,
      reminderPreferences: {
        platforms,
        reminderType,
        reminderTime: parseInt(reminderTime)
      }
    });
  };
  
  return (
    <div className=''>
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl">
      <div >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      {(reminderType === 'sms' || reminderType === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder Type</label>
        <select
          value={reminderType}
          onChange={(e) => setReminderType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="both">Both</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder Time</label>
        <select
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="15">15 minutes before</option>
          <option value="30">30 minutes before</option>
          <option value="60">1 hour before</option>
          <option value="120">2 hours before</option>
          <option value="1440">1 day before</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platforms</label>
        <div className="space-y-2">
          {['Codeforces', 'CodeChef', 'LeetCode'].map(platform => (
            <label key={platform} className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={platforms.includes(platform)}
                onChange={() => handlePlatformToggle(platform)}
                className="form-checkbox h-4 w-4 mr-2 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
              />
              <span>{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Reminder Preferences'}
      </button>
    </form>
    </div>
  );
};

export default ReminderForm;