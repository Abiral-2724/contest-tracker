import React, { useState, useEffect } from 'react';
import { updateReminderPreferences } from '../services/api';
import ReminderForm from '../components/ReminderForm';
import { Navigate } from 'react-router-dom';

const ReminderPage = () => {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  
  // Check for user in localStorage and initialize theme on component mount
  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    setIsLoading(false);
  }, []);

  // If no user in localStorage, redirect to login page
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // Since we already checked for user existence, we only handle update case
      const response = await updateReminderPreferences(
        user._id,
        userData.reminderPreferences
      );
      
      // Update user in localStorage with new preferences
      const updatedUser = {
        ...user,
        reminderPreferences: userData.reminderPreferences
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setSuccessMessage('Reminder preferences updated successfully!');
    } catch (error) {
      console.error('Error saving reminder preferences:', error);
      setSuccessMessage('Failed to save reminder preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 text-center text-gray-900 dark:text-gray-100">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Contest Reminders</h1>
        
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Update Reminder Preferences</h2>
          
          {successMessage && (
            <div className={`mb-4 p-3 rounded-md ${
              successMessage.includes('Failed')
                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            }`}>
              {successMessage}
            </div>
          )}
          
          <ReminderForm
            onSubmit={handleSubmit}
            initialValues={user}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ReminderPage;